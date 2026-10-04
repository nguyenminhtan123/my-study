import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "RALPH",
  bride: "ROSE",
  eventTitle: "Lễ thành hôn Ralph & Rose",
  venueName: "Saint Mary Chapel",
  venueAddress: "Số 1 Nhà thờ Lớn, Hoàn Kiếm, Hà Nội",
  venueQuery: "Nhà thờ Lớn Hà Nội",
  dressColors: ["#1f3a73", "#7d97c9", "#f2efe6", "#c7b58a"],
};
