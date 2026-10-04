import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "JAMES",
  bride: "SOPHIE",
  eventTitle: "Lễ thành hôn James & Sophie",
  venueName: "Eden Garden Venue",
  venueAddress: "Số 5 Đường Hoa Lan, Đà Lạt, Lâm Đồng",
  venueQuery: "Eden Garden Đà Lạt",
  dressColors: ["#5c6b4a", "#a5ae92", "#efe6d2", "#3d3a31"],
};
