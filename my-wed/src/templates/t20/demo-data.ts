import album1 from "@/static/t20/demo/album1.webp";
import album2 from "@/static/t20/demo/album2.webp";
import album3 from "@/static/t20/demo/album3.webp";
import album4 from "@/static/t20/demo/album4.webp";
import destiny from "@/static/t20/demo/destiny.webp";
import { PhotoSlot, WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Gia Huy",
  bride: "Bảo Ngọc",
  eventTitle: "Lễ thành hôn Gia Huy & Bảo Ngọc",
  venueName: "Nhà hàng Ngọc Trai",
  venueAddress: "Số 88 Đường Trần Phú, Nha Trang, Khánh Hòa",
  venueQuery: "Trần Phú Nha Trang",
  dressColors: ["#cfe3d3", "#f2c4c4", "#fffaf2", "#8a6b52"],
  music: "yeu-em-hon-moi-ngay",
  // evening garden-party photos chosen by the owner (cutting the cake, sparklers, fairy lights)
  photos: {
    ...base.photos,
    destiny: { key: "destiny", label: "Ảnh dọc", ratio: "2/3", src: destiny },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "album1", label: "Ảnh album 1", ratio: "2/3", src: album1 },
    { key: "album2", label: "Ảnh album 2", ratio: "2/3", src: album2 },
    { key: "album3", label: "Ảnh album 3", ratio: "2/3", src: album3 },
    { key: "album4", label: "Ảnh album 4", ratio: "2/3", src: album4 },
  ] as PhotoSlot[],
};
