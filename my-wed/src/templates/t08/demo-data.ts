import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Hoàng Nam",
  bride: "Vân Anh",
  eventTitle: "Lễ thành hôn Hoàng Nam & Vân Anh",
  venueName: "Nhà hàng Uyên Ương",
  venueAddress: "Số 25 Đường Ven Hồ Tây, Tây Hồ, Hà Nội",
  venueQuery: "Hồ Tây Hà Nội",
  dressColors: ["#2f6f6a", "#c96a2e", "#f2e8d5", "#3b3326"],
};
