import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Tuấn Anh",
  bride: "Khánh Huyền",
  eventTitle: "Lễ thành hôn Tuấn Anh & Khánh Huyền",
  venueName: "KHÁCH SẠN NGÂN HÀ",
  venueAddress: "Số 158 Trần Phú, Phường Thành Sen, Hà Tĩnh",
  venueQuery: "Khách sạn Ngân Hà 158 Trần Phú Hà Tĩnh",
  dressColors: ["#f5f4f0", "#4e6a47", "#9a9a92"],
};
