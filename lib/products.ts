import { cache } from "react";
import { getSupabaseServer } from "./supabase";
import { seedCategories, seedProducts } from "./seed";
import type { Category, Product } from "./types";

type ProductRow = {
  slug: string;
  model: string;
  name: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  category_slug: string;
  images: string[] | null;
  material: string | null;
  lens_width: number | null;
  weight: number | null;
  features: string[] | null;
  stock: number | null;
  is_featured: boolean | null;
};

type CategoryRow = {
  slug: string;
  name: string;
  description: string | null;
};

const mapProduct = (row: ProductRow): Product => ({
  slug: row.slug,
  model: row.model,
  name: row.name,
  description: row.description ?? "",
  price: Number(row.price),
  compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : null,
  category: row.category_slug,
  images: row.images?.length ? row.images : ["/images/products/001-1.jpg"],
  material: row.material ?? "Titan",
  lensWidth: row.lens_width ?? 50,
  weight: row.weight ?? 12,
  features: row.features?.length ? row.features : [],
  stock: row.stock ?? 0,
  featured: Boolean(row.is_featured),
});

export const getProducts = cache(async (): Promise<Product[]> => {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return seedProducts;
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("model", { ascending: true });

    if (error || !data?.length) {
      return seedProducts;
    }

    return (data as ProductRow[]).map(mapProduct);
  } catch {
    return seedProducts;
  }
});

export const getProduct = cache(async (slug: string): Promise<Product | null> => {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
});

export const getCategories = cache(async (): Promise<Category[]> => {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return seedCategories;
  }

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("slug, name, description")
      .order("sort_order", { ascending: true });

    if (error || !data?.length) {
      return seedCategories;
    }

    return (data as CategoryRow[]).map((row) => ({
      slug: row.slug,
      name: row.name,
      description: row.description ?? "",
    }));
  } catch {
    return seedCategories;
  }
});

export const getCategory = cache(async (slug: string): Promise<Category | null> => {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) ?? null;
});

export const getProductsByCategory = cache(async (category: string): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter((product) => product.category === category);
});

export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter((product) => product.featured);
});
