import album1 from "@/static/t11/demo/album1.webp";
import album2 from "@/static/t11/demo/album2.webp";
import album3 from "@/static/t11/demo/album3.webp";
import couple from "@/static/t11/demo/couple.webp";
import { PhotoSlot, WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "ALEXANDER",
  bride: "ISABELLA",
  eventTitle: "Lễ thành hôn Alexander & Isabella",
  venueName: "The Rose Garden",
  venueAddress: "12 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
  venueQuery: "12 Nguyễn Huệ Quận 1 Hồ Chí Minh",
  dressColors: ["#5a1420", "#c9a7a0", "#f1e6da", "#2b1a1a"],
  // AI photos (Gemini, made by the owner): an old manor, a burgundy velvet suit, a cream lace gown
  photos: {
    ...base.photos,
    couple: { key: "couple", label: "Ảnh cặp đôi", ratio: "16/9", src: couple },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "album1", label: "Ảnh album 1", ratio: "1/1", src: album1 },
    { key: "album2", label: "Ảnh album 2", ratio: "6/7", src: album2 },
    { key: "album3", label: "Ảnh album 3", ratio: "2/3", src: album3 },
  ] as PhotoSlot[],
};
