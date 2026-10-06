import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Quốc Bảo",
  bride: "Ngọc Hân",
  eventTitle: "Lễ thành hôn Quốc Bảo & Ngọc Hân",
  venueName: "Trung tâm Tiệc cưới Kim Ngân",
  venueAddress: "Số 18 Đường Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh",
  venueQuery: "Trần Hưng Đạo Quận 1",
  dressColors: ["#a3172b", "#d9a441", "#f6ead6", "#3a0d12"],
};
