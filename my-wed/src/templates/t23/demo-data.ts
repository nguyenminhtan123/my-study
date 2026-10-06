import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Tuấn Kiệt",
  bride: "Diệu Linh",
  eventTitle: "Lễ thành hôn Tuấn Kiệt & Diệu Linh",
  venueName: "Vườn Họa Mi",
  venueAddress: "Số 15 Đường Nhật Chiêu, Tây Hồ, Hà Nội",
  venueQuery: "Nhật Chiêu Tây Hồ Hà Nội",
  dressColors: ["#4b6b3c", "#a9c28b", "#f2c84b", "#fbfaf3"],
};
