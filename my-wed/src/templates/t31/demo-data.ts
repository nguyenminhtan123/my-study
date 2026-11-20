import album1 from "@/static/t31/demo/album1.webp";
import album2 from "@/static/t31/demo/album2.webp";
import album3 from "@/static/t31/demo/album3.webp";
import album4 from "@/static/t31/demo/album4.webp";
import cover from "@/static/t31/demo/cover.webp";
import destiny from "@/static/t31/demo/destiny.webp";
import { PhotoSlot, WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t28/demo-data";

// same couple as t28; its own bright studio photos (the cover in the arch, four for the album, the
// couple by the window at the end), chosen by
// the owner
export const demoData: WeddingData = {
  ...base,
  dressColors: ["#f9f6f0", "#e9e1d3", "#b08d57", "#4a443d"],
  photos: {
    ...base.photos,
    cover: { key: "cover", label: "Ảnh bìa", ratio: "3/4", src: cover },
    destiny: { key: "destiny", label: "Ảnh cuối thiệp", ratio: "4/5", src: destiny },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "album1", label: "Ảnh album 1", ratio: "3/4", src: album1 },
    { key: "album2", label: "Ảnh album 2", ratio: "3/4", src: album2 },
    { key: "album3", label: "Ảnh album 3", ratio: "3/4", src: album3 },
    { key: "album4", label: "Ảnh album 4", ratio: "3/4", src: album4 },
  ] as PhotoSlot[],
};
