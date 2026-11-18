export type Category = {
  slug: string;
  name: string;
  description: string;
};

export type Product = {
  slug: string;
  model: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  category: string;
  images: string[];
  material: string;
  lensWidth: number;
  weight: number;
  features: string[];
  stock: number;
  featured: boolean;
};

export type CartItem = {
  slug: string;
  model: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};
