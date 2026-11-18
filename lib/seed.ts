import type { Category, Product } from "./types";

export const seedCategories: Category[] = [
  {
    slug: "eyeglasses",
    name: "Gọng Kính",
    description: "Những đường nét tối giản, nhẹ như không đeo.",
  },
  {
    slug: "sunglasses",
    name: "Kính Mát",
    description: "Bảo vệ đôi mắt với chuẩn UV400, phom dáng thời trang.",
  },
  {
    slug: "special-design",
    name: "Thiết Kế Đặc Biệt",
    description: "Phiên bản giới hạn, chế tác thủ công cho ánh nhìn khác biệt.",
  },
];

export const seedProducts: Product[] = [
  {
    slug: "aura",
    model: "001",
    name: "Aura",
    description:
      "Một đường nét tròn mềm mại, cân bằng giữa cổ điển và hiện đại. Aura được chế tác từ titan siêu nhẹ, ôm trọn khuôn mặt và gần như biến mất khi đeo.",
    price: 1599000,
    compareAtPrice: null,
    category: "eyeglasses",
    images: [
      "/images/products/001-1.jpg",
      "/images/products/001-2.jpg",
      "/images/products/001-3.avif",
    ],
    material: "Titan siêu nhẹ",
    lensWidth: 50,
    weight: 12,
    features: [
      "Chất liệu titan bền bỉ, không gỉ",
      "Trọng lượng chỉ 12g",
      "Tròng chống UV400 và chống phản quang",
      "Phù hợp khuôn mặt oval, trái tim",
    ],
    stock: 24,
    featured: true,
  },
  {
    slug: "mirage",
    model: "002",
    name: "Mirage",
    description:
      "Sự tối giản tuyệt đối. Mirage là phiên bản gọng không viền với đường nét hình học thanh thoát, dành cho những người tin rằng chi tiết nhỏ nhất tạo nên khác biệt lớn nhất.",
    price: 1499000,
    compareAtPrice: null,
    category: "eyeglasses",
    images: [
      "/images/products/002-1.jpg",
      "/images/products/002-2.jpg",
      "/images/products/002-3.jpg",
    ],
    material: "Titan không viền",
    lensWidth: 52,
    weight: 10,
    features: [
      "Gọng không viền siêu mảnh",
      "Chất liệu titan cao cấp",
      "Tròng chống UV400",
      "Phù hợp khuôn mặt vuông, chữ nhật",
    ],
    stock: 18,
    featured: true,
  },
  {
    slug: "noir",
    model: "003",
    name: "Noir",
    description:
      "Phom vuông đậm cá tính, lấy cảm hứng từ những năm 90. Noir được làm từ acetate Ý đánh bóng thủ công, tạo điểm nhấn mạnh mẽ cho mọi gương mặt.",
    price: 1299000,
    compareAtPrice: null,
    category: "eyeglasses",
    images: [
      "/images/products/003-1.jpg",
      "/images/products/003-2.jpg",
      "/images/products/003-3.jpg",
    ],
    material: "Acetate Ý",
    lensWidth: 49,
    weight: 24,
    features: [
      "Acetate Ý đánh bóng thủ công",
      "Phom vuông unisex",
      "Tròng chống UV400",
      "Phù hợp khuôn mặt oval, tròn",
    ],
    stock: 32,
    featured: true,
  },
  {
    slug: "eclipse",
    model: "004",
    name: "Eclipse",
    description:
      "Dáng oval thập niên 90 trở lại với tinh thần đương đại. Eclipse ôm trọn gương mặt, tròng kính tối màu chống UV400 và lớp phủ chống xước bền bỉ.",
    price: 1399000,
    compareAtPrice: null,
    category: "sunglasses",
    images: [
      "/images/products/004-1.jpg",
      "/images/products/004-2.jpg",
      "/images/products/004-3.jpg",
    ],
    material: "Acetate Ý",
    lensWidth: 53,
    weight: 28,
    features: [
      "Tròng kính chống UV400",
      "Lớp phủ chống xước",
      "Phom oval thời thượng",
      "Phù hợp khuôn mặt tròn, trái tim",
    ],
    stock: 21,
    featured: true,
  },
  {
    slug: "etoile",
    model: "005",
    name: "Étoile",
    description:
      "Phiên bản giới hạn với những điểm nhấn pha lê gắn thủ công trên gọng titan. Étoile dành cho người muốn ánh nhìn của mình không giống bất kỳ ai.",
    price: 1399000,
    compareAtPrice: 1599000,
    category: "special-design",
    images: [
      "/images/products/005-1.jpg",
      "/images/products/005-2.jpg",
      "/images/products/005-3.jpg",
    ],
    material: "Titan & pha lê",
    lensWidth: 51,
    weight: 11,
    features: [
      "Chi tiết pha lê gắn thủ công",
      "Phiên bản giới hạn",
      "Tròng chống UV400",
      "Phù hợp khuôn mặt oval, trái tim",
    ],
    stock: 8,
    featured: true,
  },
  {
    slug: "lumen",
    model: "006",
    name: "Lumen",
    description:
      "Thanh thoát đến mức khó nhận ra. Lumen là chiếc gọng không viền mảnh nhất trong bộ sưu tập, dành cho những ai yêu sự nhẹ nhàng và tinh tế.",
    price: 1499000,
    compareAtPrice: null,
    category: "eyeglasses",
    images: [
      "/images/products/006-1.jpg",
      "/images/products/006-2.jpg",
      "/images/products/006-3.jpg",
    ],
    material: "Thép không gỉ",
    lensWidth: 54,
    weight: 9,
    features: [
      "Gọng không viền siêu nhẹ",
      "Thép không gỉ bền bỉ",
      "Tròng chống UV400",
      "Phù hợp khuôn mặt vuông, dài",
    ],
    stock: 15,
    featured: false,
  },
];

export const categoryForProduct = (product: Product): Category =>
  seedCategories.find((category) => category.slug === product.category) ??
  seedCategories[0];
