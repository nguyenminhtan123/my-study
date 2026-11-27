import album1 from "@/static/t29/demo/album1.webp";
import album2 from "@/static/t29/demo/album2.webp";
import album3 from "@/static/t29/demo/album3.webp";
import album4 from "@/static/t29/demo/album4.webp";
import cover from "@/static/t29/demo/cover.webp";
import destiny from "@/static/t29/demo/destiny.webp";
import { PhotoSlot, WeddingData } from "@/core/types";
import { sharedDemo as base } from "@/templates/t28/demo-data";

// same couple as t28; its own photos (Gemini, made by the owner): a misty pink lotus pond, a blush áo dài
// painted with lotus and a cream áo dài
export const demoData: WeddingData = {
  ...base,
  dressColors: ["#c2566c", "#f3d9df", "#5f8f7b", "#c9a35b"],
  photos: {
    ...base.photos,
    cover: { key: "cover", label: "Ảnh bìa", ratio: "3/4", src: cover },
    destiny: { key: "destiny", label: "Ảnh cuối thiệp", ratio: "3/4", src: destiny },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "album1", label: "Ảnh album 1", ratio: "3/4", src: album1 },
    { key: "album2", label: "Ảnh album 2", ratio: "3/4", src: album2 },
    { key: "album3", label: "Ảnh album 3", ratio: "3/4", src: album3 },
    { key: "album4", label: "Ảnh album 4", ratio: "3/4", src: album4 },
  ] as PhotoSlot[],
};
