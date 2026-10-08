import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Gia Huy",
  bride: "Bảo Ngọc",
  eventTitle: "Lễ thành hôn Gia Huy & Bảo Ngọc",
  venueName: "Nhà hàng Ngọc Trai",
  venueAddress: "Số 88 Đường Trần Phú, Nha Trang, Khánh Hòa",
  venueQuery: "Trần Phú Nha Trang",
  dressColors: ["#cfe3d3", "#f2c4c4", "#fffaf2", "#8a6b52"],
  music: "yeu-em-hon-moi-ngay",
};
