import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Minh Quân",
  bride: "Khánh Vy",
  eventTitle: "Lễ thành hôn Minh Quân & Khánh Vy",
  venueName: "Garden Ballroom",
  venueAddress: "Số 9 Đường Lê Duẩn, Quận 1, TP. Hồ Chí Minh",
  venueQuery: "Lê Duẩn Quận 1",
  dressColors: ["#d9a0a6", "#7f8f6a", "#f6ead7", "#3a2a24"],
};
