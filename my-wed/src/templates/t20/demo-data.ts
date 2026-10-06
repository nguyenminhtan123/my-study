import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Gia Huy",
  bride: "Bảo Ngọc",
  eventTitle: "Lễ thành hôn Gia Huy & Bảo Ngọc",
  venueName: "Sunflower Farm Resort",
  venueAddress: "Thôn Lạc Nghiệp, Ka Đô, Đơn Dương, Lâm Đồng",
  venueQuery: "Ka Đô Đơn Dương Lâm Đồng",
  dressColors: ["#d98c1f", "#f2c14e", "#fff6e5", "#5a5a2a"],
};
