import album1 from "@/static/t13/demo/album1.webp";
import album2 from "@/static/t13/demo/album2.webp";
import album3 from "@/static/t13/demo/album3.webp";
import album4 from "@/static/t13/demo/album4.webp";
import cover from "@/static/t13/demo/cover.webp";
import { PhotoSlot, WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "RALPH",
  bride: "ROSE",
  eventTitle: "Lễ thành hôn Ralph & Rose",
  venueName: "Saint Mary Chapel",
  venueAddress: "Số 1 Nhà thờ Lớn, Hoàn Kiếm, Hà Nội",
  venueQuery: "Nhà thờ Lớn Hà Nội",
  dressColors: ["#1f3a73", "#7d97c9", "#f2efe6", "#c7b58a"],
  // beach photos chosen by the owner; the template has six photo slots, the set has five
  photos: {
    ...base.photos,
    cover: { key: "cover", label: "Ảnh bìa", ratio: "4/5", src: cover },
    destiny: { key: "destiny", label: "Ảnh cuối thiệp", ratio: "4/5", src: cover },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "album1", label: "Ảnh album 1", ratio: "3/4", src: album1 },
    { key: "album2", label: "Ảnh album 2", ratio: "3/4", src: album2 },
    { key: "album3", label: "Ảnh album 3", ratio: "3/4", src: album3 },
    { key: "album4", label: "Ảnh album 4", ratio: "3/4", src: album4 },
  ] as PhotoSlot[],
};
