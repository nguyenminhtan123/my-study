import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Nhật Minh",
  bride: "Hà My",
  eventTitle: "Lễ thành hôn Nhật Minh & Hà My",
  venueName: "The Peony Ballroom",
  venueAddress: "Số 1 Đường Tôn Đức Thắng, Quận 1, TP. Hồ Chí Minh",
  venueQuery: "Tôn Đức Thắng Quận 1",
  dressColors: ["#d98a8f", "#f3d6cf", "#4f6b4a", "#2a1f1d"],
};
