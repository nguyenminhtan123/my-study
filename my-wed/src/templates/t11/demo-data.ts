import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "ALEXANDER",
  bride: "ISABELLA",
  eventTitle: "Lễ thành hôn Alexander & Isabella",
  venueName: "The Rose Garden",
  venueAddress: "12 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
  venueQuery: "12 Nguyễn Huệ Quận 1 Hồ Chí Minh",
  dressColors: ["#5a1420", "#c9a7a0", "#f1e6da", "#2b1a1a"],
};
