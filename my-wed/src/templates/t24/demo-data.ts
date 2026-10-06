import { TimelineStep, WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Văn Khoa",
  bride: "Thanh Hà",
  eventTitle: "Lễ thành hôn Văn Khoa & Thanh Hà",
  venueName: "Nhà vườn Cỏ Thơm",
  venueAddress: "Số 4 Ngõ 31 Đường Xuân Diệu, Tây Hồ, Hà Nội",
  venueQuery: "Xuân Diệu Tây Hồ Hà Nội",
  dressColors: ["#6b4f3a", "#b98b6e", "#e7d7c0", "#55613f"],
  timeline: [
    { time: "17:00", label: "Đón khách" },
    { time: "18:00", label: "Lễ cưới" },
    { time: "18:30", label: "Khai tiệc" },
    { time: "19:00", label: "Tiệc nhạc" },
  ] as TimelineStep[],
};
