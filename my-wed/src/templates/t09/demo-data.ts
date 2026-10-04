import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "TRUNG KIÊN",
  bride: "PHỤNG ANH",
  eventTitle: "Lễ thành hôn Trung Kiên & Phụng Anh",
  venueName: "MAPLE HOTEL & APARTMENT",
  venueAddress: "16 Tôn Đản, Lộc Thọ, Nha Trang, Khánh Hòa",
  venueQuery: "Maple Hotel Apartment 16 Tôn Đản Nha Trang",
  dressColors: ["#ffffff", "#8a8fc7", "#2b2f6b"],
};
