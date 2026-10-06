import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Đức Thắng",
  bride: "Thùy Linh",
  eventTitle: "Lễ thành hôn Đức Thắng & Thùy Linh",
  venueName: "Khách sạn Diamond",
  venueAddress: "Số 8 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
  venueQuery: "Lê Lợi Quận 1",
  dressColors: ["#f5f1ea", "#c8a96a", "#2b2a28", "#d9d4cb"],
};
