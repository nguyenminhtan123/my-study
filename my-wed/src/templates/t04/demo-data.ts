import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Bá Kiên",
  bride: "Quỳnh Anh",
  eventTitle: "Tiệc cưới Bá Kiên & Quỳnh Anh",
  venueName: "WHITE PLACE",
  venueAddress:
    "Địa chỉ: 588 Phạm Văn Đồng, Hiệp Bình Chánh, Thủ Đức, TP. Hồ Chí Minh",
  venueQuery: "White Place 588 Phạm Văn Đồng Thủ Đức",
  dressColors: ["#7a1020", "#e9a9a8", "#f5ece4", "#a8704f"],
};
