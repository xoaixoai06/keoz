"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "keoz.cart.v1";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter((item) => {
              if (!item || typeof item !== "object") return false;
              return (
                typeof item.slug === "string" &&
                item.slug.length > 0 &&
                typeof item.name === "string" &&
                typeof item.model === "string" &&
                typeof item.image === "string" &&
                Number.isFinite(item.price) &&
                Number.isInteger(item.quantity) &&
                item.quantity >= 1 &&
                item.quantity <= 20
              );
            }),
          );
        }
      }
    } catch {
      // Ignore malformed storage and start with an empty cart.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((candidate) => candidate.slug === item.slug);
      if (existing) {
        return current.map((candidate) =>
          candidate.slug === item.slug
            ? {
                ...candidate,
                quantity: Math.min(20, candidate.quantity + quantity),
              }
            : candidate,
        );
      }
      return [...current, { ...item, quantity: Math.min(20, Math.max(1, quantity)) }];
    });
  };

  const removeItem = (slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  };

  const setQuantity = (slug: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(slug);
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.slug === slug
          ? { ...item, quantity: Math.min(20, Math.max(1, quantity)) }
          : item,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    return {
      items,
      count,
      subtotal,
      hydrated,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    };
  }, [items, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
