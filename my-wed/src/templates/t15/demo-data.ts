import album1 from "@/static/t15/demo/album1.webp";
import album2 from "@/static/t15/demo/album2.webp";
import album4 from "@/static/t15/demo/album4.webp";
import album5 from "@/static/t15/demo/album5.webp";
import couple from "@/static/t15/demo/couple.webp";
import { PhotoSlot, WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Quốc Bảo",
  bride: "Ngọc Hân",
  eventTitle: "Lễ thành hôn Quốc Bảo & Ngọc Hân",
  venueName: "Trung tâm Tiệc cưới Kim Ngân",
  venueAddress: "Số 18 Đường Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh",
  venueQuery: "Trần Hưng Đạo Quận 1",
  dressColors: ["#a3172b", "#d9a441", "#f6ead6", "#3a0d12"],
  // AI photos (Gemini, made by the owner): navy brocade áo dài and khăn xếp, red áo nhật bình and blue khăn vấn
  photos: {
    ...base.photos,
    couple: { key: "couple", label: "Ảnh cặp đôi", ratio: "3/4", src: couple },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "album1", label: "Ảnh album 1", ratio: "3/4", src: album1 },
    { key: "album2", label: "Ảnh album 2", ratio: "3/4", src: album2 },
    { key: "album4", label: "Ảnh album 4", ratio: "3/4", src: album4 },
    { key: "album5", label: "Ảnh album 5", ratio: "3/4", src: album5 },
  ] as PhotoSlot[],
};
