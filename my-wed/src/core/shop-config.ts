// Shop-level settings shown in the gallery (not part of any template).
export const shopConfig = {
  // Giá niêm yết (gạch) và giá bán. Giá cứng ở MVP.
  originalPrice: 199000,
  salePrice: 99000,
  // Số Zalo của chủ shop, dạng 84xxxxxxxxx hoặc 0xxxxxxxxx. Chưa có: để trống.
  ownerZaloPhone: "",
};

export const formatPrice = (value: number) =>
  `${value.toLocaleString("vi-VN")}đ`;

export const buildOrderMessage = (templateName: string, templateId: string) =>
  `Chào shop, mình muốn đặt thiệp cưới online ${templateName} (mã ${templateId}).`;
