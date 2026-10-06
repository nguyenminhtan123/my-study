import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Đức Huy",
  bride: "Phương Linh",
  eventTitle: "Lễ thành hôn Đức Huy & Phương Linh",
  venueName: "Nhà hàng Mùa Thu",
  venueAddress: "Số 27 Đường Thanh Niên, Ba Đình, Hà Nội",
  venueQuery: "Thanh Niên Ba Đình Hà Nội",
  dressColors: ["#8c3b1f", "#c8692f", "#e8c9a0", "#3a2418"],
};
