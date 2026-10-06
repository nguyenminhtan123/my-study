import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Đức Huy",
  bride: "Phương Linh",
  eventTitle: "Lễ thành hôn Đức Huy & Phương Linh",
  venueName: "Trung tâm Tiệc cưới Hoa Hồng",
  venueAddress: "Số 27 Đường Thanh Niên, Ba Đình, Hà Nội",
  venueQuery: "Thanh Niên Ba Đình Hà Nội",
  dressColors: ["#f3c9b8", "#e8a6a0", "#fff7f2", "#7d8a6a"],
};
