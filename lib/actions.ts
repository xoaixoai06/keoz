"use server";

import { z } from "zod";
import { getProducts } from "./products";
import { getSupabaseServer } from "./supabase";

export type ActionState = {
  status: "idle" | "error" | "success";
  message?: string;
  code?: string;
  demo?: boolean;
};

const orderSchema = z.object({
  fullName: z.string().trim().min(2, "Vui lòng nhập họ tên.").max(80),
  email: z.string().trim().email("Email chưa hợp lệ."),
  phone: z
    .string()
    .trim()
    .min(8, "Số điện thoại chưa hợp lệ.")
    .max(20, "Số điện thoại chưa hợp lệ."),
  address: z.string().trim().min(6, "Vui lòng nhập địa chỉ.").max(200),
  city: z.string().trim().min(2, "Vui lòng nhập thành phố.").max(80),
  note: z.string().trim().max(500).optional().default(""),
});

const itemSchema = z.object({
  slug: z.string().trim().min(1),
  quantity: z.number().int().min(1).max(20),
});

const itemsSchema = z.array(itemSchema).min(1, "Giỏ hàng đang trống.").max(20);

export async function subscribe(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = formData.get("email");

  if (typeof email !== "string" || !z.string().email().safeParse(email.trim()).success) {
    return { status: "error", message: "Email chưa hợp lệ." };
  }

  const supabase = getSupabaseServer();
  if (!supabase) {
    return {
      status: "success",
      message: "Đã ghi nhận email. Cấu hình Supabase để lưu thật vào database.",
    };
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: email.trim().toLowerCase() });

  // 23505 = email đã tồn tại: coi như thành công, không tiết lộ trạng thái.
  if (error && error.code !== "23505") {
    return {
      status: "error",
      message: "Chưa thể đăng ký lúc này. Vui lòng thử lại sau.",
    };
  }

  return {
    status: "success",
    message: "Cảm ơn bạn đã trở thành thành viên của KEOZ.",
  };
}

export async function placeOrder(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = orderSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
    note: formData.get("note") ?? "",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Thông tin đơn hàng chưa hợp lệ.",
    };
  }

  let rawItems: unknown;
  try {
    rawItems = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    return { status: "error", message: "Giỏ hàng không hợp lệ." };
  }

  const itemsResult = itemsSchema.safeParse(rawItems);
  if (!itemsResult.success) {
    return { status: "error", message: "Giỏ hàng đang trống." };
  }

  const products = await getProducts();
  const items = itemsResult.data.map((item) => {
    const product = products.find((candidate) => candidate.slug === item.slug);
    if (!product) {
      return null;
    }
    return {
      product_slug: product.slug,
      product_name: `${product.model} — ${product.name}`,
      unit_price: product.price,
      quantity: item.quantity,
    };
  });

  if (items.some((item) => item === null)) {
    return { status: "error", message: "Có sản phẩm không còn tồn tại trong giỏ." };
  }

  const validItems = items.filter((item): item is NonNullable<typeof item> => item !== null);
  const subtotal = validItems.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0,
  );
  const shipping = 0;
  const total = subtotal + shipping;
  const code = `KEOZ-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const supabase = getSupabaseServer();

  if (!supabase) {
    return {
      status: "success",
      code,
      demo: true,
      message: "Đơn hàng demo đã được ghi nhận. Cấu hình Supabase để lưu thật.",
    };
  }

  const orderId = crypto.randomUUID();
  const { error: orderError } = await supabase.from("orders").insert({
    id: orderId,
    code,
    customer_name: parsed.data.fullName,
    email: parsed.data.email.toLowerCase(),
    phone: parsed.data.phone,
    address: parsed.data.address,
    city: parsed.data.city,
    note: parsed.data.note || null,
    subtotal,
    shipping,
    total,
    status: "pending",
  });

  if (orderError) {
    return {
      status: "error",
      message: "Chưa thể tạo đơn hàng. Vui lòng thử lại hoặc liên hệ KEOZ.",
    };
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    validItems.map((item) => ({
      order_id: orderId,
      ...item,
    })),
  );

  if (itemsError) {
    return {
      status: "error",
      message: "Đơn hàng đã tạo nhưng chưa lưu được sản phẩm. Vui lòng liên hệ KEOZ.",
    };
  }

  return {
    status: "success",
    code,
    message: "Đơn hàng của bạn đã được ghi nhận.",
  };
}
