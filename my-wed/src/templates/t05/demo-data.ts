import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "PHẠM QUÂN",
  bride: "HOÀI THU",
  eventTitle: "Tiệc cưới Phạm Quân & Hoài Thu",
  venueName: "CHAMPA ISLAND",
  venueAddress: "Sảnh Lakshmi, 304 Đường 2/4, P. Bắc Nha Trang, Khánh Hòa",
  venueQuery: "Champa Island Nha Trang",
  dressColors: ["#1d5b78", "#4f8fa8", "#bfe3ee", "#f0d9a0", "#ffffff"],
};
