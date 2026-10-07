import { TimelineStep, WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Quốc Huy",
  bride: "Mai Anh",
  eventTitle: "Lễ thành hôn Quốc Huy & Mai Anh",
  venueName: "Trống Đồng Palace",
  venueAddress: "Số 18A Đường Láng, Đống Đa, Hà Nội",
  venueQuery: "Đường Láng Đống Đa Hà Nội",
  dressColors: ["#c98a8f", "#f3d9d7", "#fbf7f5", "#8e2f36"],
  timeline: [
    { time: "08:00", label: "Lễ rước dâu" },
    { time: "09:30", label: "Chụp ảnh lưu niệm" },
    { time: "10:30", label: "Khai tiệc" },
    { time: "12:00", label: "Tiệc nhạc" },
  ] as TimelineStep[],
};
