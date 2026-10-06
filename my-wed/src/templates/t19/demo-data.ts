import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Minh Quân",
  bride: "Khánh Vy",
  eventTitle: "Lễ thành hôn Minh Quân & Khánh Vy",
  venueName: "Sky Garden Rooftop",
  venueAddress: "Tầng 25, Số 9 Đường Lê Duẩn, Quận 1, TP. Hồ Chí Minh",
  venueQuery: "Lê Duẩn Quận 1",
  dressColors: ["#0f1a3a", "#3b4f8a", "#e3c58c", "#f2efe8"],
};
