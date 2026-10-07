import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Quốc Huy",
  bride: "Minh Trang",
  eventTitle: "Lễ thành hôn Quốc Huy & Minh Trang",
  venueName: "Nhà hàng Hoa Sen",
  venueAddress: "Số 5 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
  venueQuery: "Nguyễn Huệ Quận 1",
  dressColors: ["#1f3d2b", "#f4f1ea", "#111111", "#c9c2b2"],
};
