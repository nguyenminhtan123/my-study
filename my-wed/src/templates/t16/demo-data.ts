import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Hoàng Nam",
  bride: "Thu Trang",
  eventTitle: "Lễ thành hôn Hoàng Nam & Thu Trang",
  venueName: "Lavender Garden Đà Lạt",
  venueAddress: "Số 2 Đường Hoa Hồng, Phường 4, Đà Lạt, Lâm Đồng",
  venueQuery: "Hoa Hồng Phường 4 Đà Lạt",
  dressColors: ["#7b5ea7", "#b9a3dd", "#efe8f7", "#5f6f52"],
};
