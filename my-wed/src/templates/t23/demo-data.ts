import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Tuấn Kiệt",
  bride: "Diệu Linh",
  eventTitle: "Lễ thành hôn Tuấn Kiệt & Diệu Linh",
  venueName: "White Palace",
  venueAddress: "Số 194 Đường Hoàng Văn Thụ, Phú Nhuận, TP. Hồ Chí Minh",
  venueQuery: "Hoàng Văn Thụ Phú Nhuận",
  dressColors: ["#ffffff", "#ede7df", "#c9b79c", "#6f6a64"],
};
