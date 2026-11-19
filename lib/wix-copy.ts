// Bản sao nội dung từ bộ dữ liệu Wix gốc trong D:\XOAI\Documents\KEOZ.
// Chỉ dùng để trình bày; mọi dữ liệu sản phẩm/giá vẫn đến từ lib/products.ts.

export const homeCopy = {
  hero: "Frame Your Vibe.",
  bestSeller: "BEST SELLER",
  bestSellerNote: "Định hình ánh nhìn, khẳng định chất riêng",
  studioHeading: "Thiết kế cho hàng ngày",
  studio: [
    {
      text: "Chế tác từ titan siêu nhẹ, thoải mái suốt cả ngày dài.",
      left: "/images/editorial/studio-model.jpg",
      right: "/images/editorial/studio-eyewear.jpg",
      dark: false,
    },
    {
      text: "Chất liệu siêu nhẹ, bền bỉ có nguồn gốc bền vững",
      left: "/images/wix/panel2-left.jpg",
      right: "/images/wix/panel2-right.jpg",
      dark: true,
    },
    {
      text: "Chống tia cực tím (UV) toàn diện kết hợp lớp phủ chống phản quang tiên tiến.",
      left: "/images/wix/panel3-left.jpg",
      right: "/images/wix/panel3-right.jpg",
      dark: true,
    },
  ],
  specs: [
    "Chất liệu gọng: Hợp kim Titan",
    "Độ rộng thấu kính: 50 mm",
    "Trọng lượng: 12g",
    "Loại tròng kính: Tròng trong suốt chống phản quang",
  ],
  collectionsHeading: "Lựa chọn phong cách của bạn",
  collectionLabels: {
    eyeglasses: "Kính mắt",
    sunglasses: "Kính mát thời trang",
    "special-design": "Thiết kế đặc biệt",
  } as Record<string, string>,
  collectionCta: "Khám phá",
};

export const footerCopy = {
  tagline: "Tin vào những gì bạn nhìn thấy",
  newsletterTitle: "Trở thành thành viên đặc quyền",
  newsletterText:
    "Đăng ký để nhận quyền truy cập sớm vào các bộ sưu tập phiên bản giới hạn và những thông tin chuyên sâu về thiết kế",
};

type Story = {
  title?: string;
  intro: string;
  bullets?: Array<{ heading: string; body: string }>;
  sizes?: string[];
};

export const productStories: Record<string, Story> = {
  aura: {
    title: "Kính thiết kế đặc biệt Keoz — Khi phụ kiện trở thành tuyên ngôn cá tính",
    intro:
      "Phá vỡ mọi khuôn mẫu thông thường, dòng sản phẩm thiết kế độc quyền từ Keoz sinh ra dành riêng cho những tín đồ thời trang hệ “tuyên ngôn cá tính”, không ngại thể hiện chất riêng khác biệt.",
    bullets: [
      {
        heading: "Chi tiết chạm trổ độc bản:",
        body: "Điểm nhấn ấn tượng với các họa tiết gai/đai kim loại tinh xảo được đính kết dọc theo viền gọng và phần càng kính, tạo hiệu ứng thị giác mạnh mẽ và vẻ đẹp sắc lạnh, cuốn hút.",
      },
      {
        heading: "Form dáng Oval thanh thoát:",
        body: "Kết hợp giữa đường nét hình học sắc sảo của chi tiết trang trí và sự mềm mại của khung gọng oval, giúp cân bằng gương mặt và dễ dàng tạo điểm nhấn cho mọi outfit high-fashion.",
      },
      {
        heading: "Chất liệu cao cấp & Chắc chắn:",
        body: "Khung kim loại định hình cao cấp với lớp mạ sáng bóng, vừa đảm bảo độ bền nhẹ, vừa giữ trọn sự tinh tế trong từng đường nét gia công thủ công.",
      },
    ],
  },
  mirage: {
    title: "Gọng kính kim loại Keoz — Nền tảng của sự thanh lịch và bền bỉ",
    intro:
      "Mỗi chiếc gọng kính kim loại từ Keoz không chỉ là một công cụ hỗ trợ thị lực, mà còn là một tuyên ngôn phong cách dành riêng cho những ai đề cao sự tinh tế tối giản.",
    sizes: [
      "Độ rộng thấu kính: 54 mm",
      "Cầu kính: 18 mm",
      "Chiều rộng mặt trước khung: 142 mm",
      "Chiều dài càng kính: 145 mm",
      "Chiều cao thấu kính: 34 mm",
    ],
  },
  noir: {
    title: "Gọng kính nhựa Keoz — Cá tính hiện đại, nhẹ nhàng suốt ngày dài",
    intro:
      "Nếu gọng kim loại mang lại vẻ đẹp sắc sảo, tối giản thì dòng gọng kính nhựa Keoz chính là tuyên ngôn của sự trẻ trung, năng động và đậm chất thời trang.",
    bullets: [
      {
        heading: "Chất liệu cao cấp (Acetate / TR90):",
        body: "Được chế tác từ nhựa nguyên sinh cao cấp, gọng kính Keoz sở hữu độ đàn hồi ấn tượng, chịu lực tốt, hạn chế tối đa tình trạng nứt gãy hay biến dạng do nhiệt độ.",
      },
      {
        heading: "Siêu nhẹ & Êm ái:",
        body: "Trọng lượng tối ưu kết hợp cùng thiết kế đệm mũi liền khối ôm sát sống mũi người Việt, giúp giảm áp lực tối đa và không để lại vết hằn dù đeo liên tục nhiều giờ.",
      },
      {
        heading: "Bảng màu thời thượng:",
        body: "Từ đen huyền bí, nâu đồi mồi cổ điển đến các tông nhựa trong suốt (Crystal) hiện đại — bề mặt được đánh bóng thủ công cho độ bền màu cao, không bong tróc hay kích ứng da.",
      },
    ],
  },
  eclipse: {
    title: "Khẳng định bản sắc, dẫn đầu xu hướng",
    intro:
      "Không chỉ đơn thuần là phụ kiện bảo vệ đôi mắt dưới ánh nắng, dòng kính mát thời trang Keoz mang đến ngôn ngữ thiết kế sắc sảo, đậm hơi thở Avant-Garde (tiên phong) giúp nâng tầm mọi bản phối trang phục.",
    bullets: [
      {
        heading: "Thiết kế dáng Oval thuôn thời thượng:",
        body: "Kiểu dáng mắt hẹp bầu dục (Narrow Oval) kết hợp các đường bo vát mềm mại ở phần viền ngoài, tạo hiệu ứng thon gọn gương mặt và mang lại thần thái cuốn hút, sang chảnh chuẩn High-Fashion.",
      },
      {
        heading: "Bảo vệ thị lực toàn diện:",
        body: "Trang bị tròng kính râm màu đen khói cao cấp với khả năng chống chói vượt trội và ngăn chặn đến 99,9% tia cực tím (UV400), giữ cho tầm nhìn luôn dịu mát và rõ nét dưới trời nắng gắt.",
      },
      {
        heading: "Chất liệu Acetate nguyên khối:",
        body: "Khung gọng nhựa Acetate đen bóng được gia công tỉ mỉ cho độ đầm chắc vừa vặn, bề mặt sáng mịn sang trọng cùng chi tiết điểm nhấn tinh tế ở hai góc viền, bền bỉ và êm ái suốt ngày dài di chuyển.",
      },
    ],
  },
  etoile: {
    intro:
      "Không chỉ gây ấn tượng bởi vẻ ngoài độc đáo, dòng gọng kính Titanium KEOZ còn là sự kết hợp giữa chất liệu cao cấp và ngôn ngữ thiết kế Avant-Garde đầy cá tính. Cấu trúc thanh mảnh cùng những chi tiết kim loại được tạo hình nghệ thuật mang đến diện mạo hiện đại, phá cách và khác biệt.",
    bullets: [
      {
        heading: "Chất liệu Titanium cao cấp:",
        body: "Sử dụng chất liệu Titanium với ưu điểm trọng lượng nhẹ, độ bền cao và khả năng chống ăn mòn tốt. Mang lại cảm giác thoải mái khi đeo trong thời gian dài mà vẫn đảm bảo sự chắc chắn trong quá trình sử dụng.",
      },
      {
        heading: "Thiết kế không viền thanh thoát:",
        body: "Kiểu dáng mắt kính chữ nhật bo cong nhẹ (Rimless Rectangle) tạo cảm giác tối giản, tinh tế. Cấu trúc không viền giúp tôn lên đường nét gương mặt, đồng thời mang đến vẻ ngoài hiện đại và thời thượng.",
      },
      {
        heading: "Chi tiết kim loại điêu khắc độc đáo:",
        body: "Điểm nhấn nằm ở những họa tiết kim loại màu bạc được tạo hình nghệ thuật tại cầu kính và hai bên tròng kính. Sự kết hợp giữa đường nét thanh mảnh và chi tiết trang trí táo bạo tạo nên dấu ấn riêng, thể hiện tinh thần sáng tạo đặc trưng của KEOZ.",
      },
    ],
  },
  lumen: {
    title: "Bứt phá giới hạn, chinh phục mọi chuyển động",
    intro:
      "Không chỉ là phụ kiện hỗ trợ tầm nhìn, dòng kính thể thao KEOZ mang đến sự kết hợp giữa thiết kế hiện đại, đường nét mạnh mẽ và tinh thần vận động năng động. Kiểu dáng không viền độc đáo cùng cấu trúc kim loại bạc tinh tế tạo nên diện mạo khỏe khoắn, cá tính, phù hợp với những người yêu thích phong cách thể thao hiện đại.",
    bullets: [
      {
        heading: "Thiết kế thể thao hiện đại:",
        body: "Kiểu dáng mắt kính ôm nhẹ với phần viền trên và càng kính được tạo hình góc cạnh. Những đường cong mềm mại kết hợp chi tiết kim loại khỏe khoắn tạo nên tổng thể năng động, khác biệt và thời thượng.",
      },
      {
        heading: "Chất liệu Titanium cao cấp:",
        body: "Cấu trúc kim loại thanh mảnh mang đến cảm giác nhẹ nhàng, chắc chắn và thoải mái khi sử dụng. Thiết kế hướng đến sự linh hoạt, phù hợp với nhịp sống năng động và các hoạt động thường ngày.",
      },
      {
        heading: "Tối ưu trải nghiệm sử dụng:",
        body: "Tròng kính không viền kết hợp cầu kính được tạo hình độc đáo, mang lại tầm nhìn thoáng và diện mạo hiện đại. Phần càng kính được thiết kế hướng đến sự ôm vừa vặn, góp phần tăng cảm giác ổn định khi vận động.",
      },
    ],
  },
};

export const aboutCopy = {
  title: "Câu chuyện của chúng tôi",
  text: "Keoz Studio kiến tạo những thiết kế kính mắt mang ngôn ngữ tối giản nhưng đầy phá cách, xóa nhòa ranh giới giữa công năng bảo vệ thị lực và tuyên ngôn thời trang cá nhân. Mỗi khung kính là sự giao thoa giữa đường nét tinh xảo, trọng lượng siêu nhẹ và thẩm mỹ đương đại dành riêng cho những tâm hồn tự do.",
  designedTitle: "Thiết kế có chủ đích",
  designedText:
    "Mùa lễ hội đang đến gần, và Keoz đang chuẩn bị một món quà đặc biệt dành riêng cho ánh nhìn của bạn. Hãy cùng đếm ngược để chào đón Bộ sưu tập giới hạn Giáng sinh 2026 — nơi những thiết kế tinh xảo, lấp lánh chất riêng sắp chính thức lộ diện.",
};

export const specialDesignCopy = {
  title: "Thiết kế Đặc biệt",
  text: "Đồ gia dụng tiện ích giúp việc nhà trở nên dễ dàng.",
};

export const privacySections = [
  {
    id: "collection",
    title: "1. Thu thập thông tin cần thiết",
    body: [
      "KEOZ sẽ thu thập các thông tin mang tính cá nhân của khách hàng bao gồm: Số điện thoại, Email, Địa chỉ, Ngày / tháng / năm sinh.",
      "Ngoài ra, một số thông tin khác như thời gian truy cập website, số lần truy cập, các hoạt động của khách hàng trên website cũng được chúng tôi thu thập, phân tích để đưa ra những nâng cấp kịp thời, mang lại trải nghiệm tốt nhất cho người dùng.",
    ],
  },
  {
    id: "usage",
    title: "2. Sử dụng thông tin cá nhân",
    body: [
      "KEOZ thu thập thông tin cá nhân của khách hàng và sử dụng vào những mục đích phù hợp, đảm bảo tuân thủ hoàn toàn theo nội dung của Chính sách bảo mật này.",
      "Trong các trường hợp cần thiết như giao nhận hàng, xử lý các vấn đề đơn hàng, thông báo tin tức khuyến mại, tri ân khách hàng,… Chúng tôi sẽ sử dụng những thông tin này để liên hệ trực tiếp tới người dùng dưới nhiều hình thức: Đơn đặt hàng, thư điện tử, thư cảm ơn, cập nhật tin tức sản phẩm,…",
    ],
  },
  {
    id: "sharing",
    title: "3. Chia sẻ thông tin cá nhân",
    body: [
      "Ngoài những trường hợp về việc sử dụng thông tin cá nhân đã nêu trong chính bảo mật sách này, chúng tôi cam kết sẽ không tiết lộ thông tin cá nhân của bạn ra bên ngoài.",
      "Trong một số trường hợp đặc biệt, chúng tôi có thể thuê một đơn vị độc lập bên ngoài để tiến hành nghiên cứu thị trường, khảo sát hành vi khách hàng. Khi này thông tin của bạn có thể sẽ được cung cấp cho đơn vị tiến hành dự án. Chúng tôi khẳng định bên thứ ba này sẽ bị ràng buộc bởi một điều khoản về bảo mật mà theo đó họ chỉ được giới hạn sử dụng những thông tin được cung cấp với mục đích hoàn thiện, nâng cao chất lượng dự án.",
    ],
  },
];
