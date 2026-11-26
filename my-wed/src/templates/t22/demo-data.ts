import album1 from "@/static/t22/demo/album1.webp";
import album2 from "@/static/t22/demo/album2.webp";
import album3 from "@/static/t22/demo/album3.webp";
import album4 from "@/static/t22/demo/album4.webp";
import destiny from "@/static/t22/demo/destiny.webp";
import { PhotoSlot, WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Hoàng Long",
  bride: "Thanh Thảo",
  eventTitle: "Lễ thành hôn Hoàng Long & Thanh Thảo",
  venueName: "Grand Palace Ballroom",
  venueAddress: "Số 142/18 Đường Cộng Hòa, Tân Bình, TP. Hồ Chí Minh",
  venueQuery: "Cộng Hòa Tân Bình",
  dressColors: ["#14100b", "#d9b77a", "#f3e6cc", "#6b5434"],
  music: "yeu-em-hon-moi-ngay",
  // AI photos (Gemini, made by the owner): an art-deco lounge at night, black velvet tuxedo, gold sequin gown
  photos: {
    ...base.photos,
    destiny: { key: "destiny", label: "Ảnh dọc", ratio: "3/4", src: destiny },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "album1", label: "Ảnh album 1", ratio: "3/4", src: album1 },
    { key: "album2", label: "Ảnh album 2", ratio: "3/4", src: album2 },
    { key: "album3", label: "Ảnh album 3", ratio: "3/4", src: album3 },
    { key: "album4", label: "Ảnh album 4", ratio: "3/4", src: album4 },
  ] as PhotoSlot[],
};
