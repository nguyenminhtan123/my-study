import album1 from "@/static/t16/demo/album1.webp";
import album2 from "@/static/t16/demo/album2.webp";
import album3 from "@/static/t16/demo/album3.webp";
import album4 from "@/static/t16/demo/album4.webp";
import destiny from "@/static/t16/demo/destiny.webp";
import { PhotoSlot, WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Hoàng Nam",
  bride: "Thu Trang",
  eventTitle: "Lễ thành hôn Hoàng Nam & Thu Trang",
  venueName: "Lavender Garden Đà Lạt",
  venueAddress: "Số 2 Đường Hoa Hồng, Phường 4, Đà Lạt, Lâm Đồng",
  venueQuery: "Hoa Hồng Phường 4 Đà Lạt",
  dressColors: ["#7b5ea7", "#b9a3dd", "#efe8f7", "#5f6f52"],
  music: "yeu-em-hon-moi-ngay",
  // lavender-field photos chosen by the owner
  photos: {
    ...base.photos,
    destiny: { key: "destiny", label: "Ảnh dọc", ratio: "4/5", src: destiny },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "album1", label: "Ảnh album 1", ratio: "2/3", src: album1 },
    { key: "album2", label: "Ảnh album 2", ratio: "2/3", src: album2 },
    { key: "album3", label: "Ảnh album 3", ratio: "2/3", src: album3 },
    { key: "album4", label: "Ảnh album 4", ratio: "2/3", src: album4 },
  ] as PhotoSlot[],
};
