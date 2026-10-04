import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "THẮNG",
  bride: "LINH",
  eventTitle: "Lễ thành hôn Thắng & Linh",
  venueName: "Làng Hòa Phú",
  venueAddress: "Xóm 2, Hòa Phú, Phú Cát, Hà Nội (Bản Bóng Thanh Anh)",
  venueQuery: "Hòa Phú Phú Cát Hà Nội",
  dressColors: ["#9a9a95", "#1e4a3a", "#111111"],
};
