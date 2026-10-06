import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Văn Khoa",
  bride: "Thanh Hà",
  eventTitle: "Lễ thành hôn Văn Khoa & Thanh Hà",
  venueName: "Vườn Hoa Hồng",
  venueAddress: "Số 4 Đường Xuân Diệu, Tây Hồ, Hà Nội",
  venueQuery: "Xuân Diệu Tây Hồ Hà Nội",
  dressColors: ["#d6455d", "#f7c6cf", "#ffffff", "#5b2a33"],
};
