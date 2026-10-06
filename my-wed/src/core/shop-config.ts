// Shop-level settings for the gallery (not part of any template). Prices are not shown in the
// app: the shop agrees the price with each customer in Zalo chat.
export const shopConfig = {
  // Số Zalo của chủ shop, dạng 84xxxxxxxxx hoặc 0xxxxxxxxx. Chưa có: để trống.
  ownerZaloPhone: "",
};

export const buildOrderMessage = (templateName: string, templateId: string) =>
  `Chào shop, mình muốn đặt thiệp cưới online ${templateName} (mã ${templateId}).`;
