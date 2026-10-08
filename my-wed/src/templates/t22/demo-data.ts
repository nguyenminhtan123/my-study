import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Hoàng Long",
  bride: "Thanh Thảo",
  eventTitle: "Lễ thành hôn Hoàng Long & Thanh Thảo",
  venueName: "Grand Palace Ballroom",
  venueAddress: "Số 142/18 Đường Cộng Hòa, Tân Bình, TP. Hồ Chí Minh",
  venueQuery: "Cộng Hòa Tân Bình",
  dressColors: ["#14100b", "#d9b77a", "#f3e6cc", "#6b5434"],
  music: "yeu-em-hon-moi-ngay",
};
