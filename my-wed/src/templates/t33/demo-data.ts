import album1 from "@/static/t33/demo/album1.webp";
import album2 from "@/static/t33/demo/album2.webp";
import album3 from "@/static/t33/demo/album3.webp";
import album4 from "@/static/t33/demo/album4.webp";
import cover from "@/static/t33/demo/cover.webp";
import destiny from "@/static/t33/demo/destiny.webp";
import { PhotoSlot, WeddingData } from "@/core/types";
import { sharedDemo as base } from "@/templates/t28/demo-data";

// same couple as t28; its own outdoor photos (forest veil for the opening, flower fields for the album,
// the couple bowing on the lawn at the end), chosen by the owner
export const demoData: WeddingData = {
  ...base,
  dressColors: ["#d0708c", "#6b80c0", "#fffdf9", "#2f4637"],
  photos: {
    ...base.photos,
    cover: { key: "cover", label: "Ảnh bìa", ratio: "4/5", src: cover },
    destiny: { key: "destiny", label: "Ảnh cuối thiệp", ratio: "1/1", src: destiny },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "album1", label: "Ảnh album 1", ratio: "4/5", src: album1 },
    { key: "album2", label: "Ảnh album 2", ratio: "4/5", src: album2 },
    { key: "album3", label: "Ảnh album 3", ratio: "1/1", src: album3 },
    { key: "album4", label: "Ảnh album 4", ratio: "4/5", src: album4 },
  ] as PhotoSlot[],
};
