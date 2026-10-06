import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Tae Hyun",
  bride: "Vân Anh",
  eventTitle: "Tiệc cưới Tae Hyun & Vân Anh",
  venueName: "Champa Island",
  venueAddress: "Sảnh Lakshmi, 304 Đường 2/4, P. Bắc Nha Trang, Khánh Hòa",
  venueQuery: "Champa Island Nha Trang",
  dressColors: ["#f5e9d3", "#c9a35a", "#8a6a3a"],
};
