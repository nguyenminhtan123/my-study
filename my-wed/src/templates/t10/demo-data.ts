import album1 from "@/static/t10/demo/album1.webp";
import album2 from "@/static/t10/demo/album2.webp";
import album3 from "@/static/t10/demo/album3.webp";
import album4 from "@/static/t10/demo/album4.webp";
import album5 from "@/static/t10/demo/album5.webp";
import destiny from "@/static/t10/demo/destiny.webp";
import { PhotoSlot, WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Đức Thắng",
  bride: "Thùy Linh",
  eventTitle: "Lễ thành hôn Đức Thắng & Thùy Linh",
  venueName: "Khách sạn Diamond",
  venueAddress: "Số 8 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
  venueQuery: "Lê Lợi Quận 1",
  dressColors: ["#f5f1ea", "#c8a96a", "#2b2a28", "#d9d4cb"],
  // AI photos (Gemini, made by the owner): an ivory studio, satin gown and black tuxedo, the rings
  photos: {
    ...base.photos,
    destiny: { key: "destiny", label: "Ảnh dọc", ratio: "9/16", src: destiny },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "album1", label: "Ảnh album 1", ratio: "9/16", src: album1 },
    { key: "album2", label: "Ảnh album 2", ratio: "2/3", src: album2 },
    { key: "album3", label: "Ảnh album 3", ratio: "2/3", src: album3 },
    { key: "album4", label: "Ảnh album 4", ratio: "2/3", src: album4 },
    { key: "album5", label: "Ảnh album 5", ratio: "2/3", src: album5 },
  ] as PhotoSlot[],
};
