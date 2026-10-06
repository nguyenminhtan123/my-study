import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Thành Đạt",
  bride: "Mai Anh",
  eventTitle: "Lễ thành hôn Thành Đạt & Mai Anh",
  venueName: "Nhà hàng Hoa Đào",
  venueAddress: "Số 6 Đường Lạc Long Quân, Tây Hồ, Hà Nội",
  venueQuery: "Lạc Long Quân Tây Hồ Hà Nội",
  dressColors: ["#b8323a", "#e9b9b4", "#efe6d3", "#3b3a34"],
};
