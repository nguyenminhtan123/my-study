import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Trọng Trí",
  bride: "Việt Hoa",
  eventTitle: "Tiệc cưới Trọng Trí & Việt Hoa",
  venueName: "WHITE PLACE",
  venueAddress:
    "Địa chỉ: 588 Phạm Văn Đồng, Hiệp Bình Chánh, Thủ Đức, TP. Hồ Chí Minh",
  venueQuery: "White Place 588 Phạm Văn Đồng Thủ Đức",
  dressColors: ["#ffffff", "#4a6b3a", "#b9c2ad"],
};
