import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Do-yoon",
  bride: "Cẩm Anh",
  eventTitle: "Lễ thành hôn Do-Yoon & Cẩm Anh",
  venueName: "MAPLE HOTEL & APARTMENT",
  venueAddress: "16 Tôn Đản, Lộc Thọ, Nha Trang, Khánh Hòa",
  venueQuery: "Maple Hotel Apartment 16 Tôn Đản Nha Trang",
  dressColors: ["#ffffff", "#2f6b3a", "#a9b8a0"],
};
