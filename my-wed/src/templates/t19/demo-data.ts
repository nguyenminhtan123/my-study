import album1 from "@/static/t19/demo/album1.webp";
import album2 from "@/static/t19/demo/album2.webp";
import album3 from "@/static/t19/demo/album3.webp";
import couple from "@/static/t19/demo/couple.webp";
import { PhotoSlot, WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Minh Quân",
  bride: "Khánh Vy",
  eventTitle: "Lễ thành hôn Minh Quân & Khánh Vy",
  venueName: "Garden Ballroom",
  venueAddress: "Số 9 Đường Lê Duẩn, Quận 1, TP. Hồ Chí Minh",
  venueQuery: "Lê Duẩn Quận 1",
  dressColors: ["#d9a0a6", "#7f8f6a", "#f6ead7", "#3a2a24"],
  // AI photos (Gemini, made by the owner): an evening garden reception under fairy lights
  photos: {
    ...base.photos,
    couple: { key: "couple", label: "Ảnh cặp đôi", ratio: "1/2", src: couple },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "album1", label: "Ảnh album 1", ratio: "1/2", src: album1 },
    { key: "album2", label: "Ảnh album 2", ratio: "1/2", src: album2 },
    { key: "album3", label: "Ảnh album 3", ratio: "1/2", src: album3 },
  ] as PhotoSlot[],
};
