import album1 from "@/static/t27/demo/album1.webp";
import album2 from "@/static/t27/demo/album2.webp";
import album3 from "@/static/t27/demo/album3.webp";
import album4 from "@/static/t27/demo/album4.webp";
import couple from "@/static/t27/demo/couple.webp";
import cover from "@/static/t27/demo/cover.webp";
import destiny from "@/static/t27/demo/destiny.webp";
import { PhotoSlot, WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Hoàng Phúc",
  bride: "Ngọc Trâm",
  weddingISO: "2026-11-21T10:30:00+07:00",
  calendarDates: "20261121T033000Z/20261121T070000Z",
  eventTitle: "Lễ thành hôn Hoàng Phúc & Ngọc Trâm",
  venueName: "Nhà hàng Vườn Mộc",
  venueAddress: "25 Thảo Điền, phường An Khánh, TP. Hồ Chí Minh",
  venueQuery: "25 Thảo Điền An Khánh TP Hồ Chí Minh",
  rsvpDeadline: "10.11",
  families: {
    groom: ["Ông Võ Thanh Sơn", "Bà Đỗ Thị Hạnh"],
    bride: ["Ông Trần Quốc Bảo", "Bà Ngô Thị Lan"],
  },
  gifts: {
    groom: {
      ...base.gifts.groom,
      account: "0451 0002 1121",
      owner: "VO HOANG PHUC",
    },
    bride: {
      ...base.gifts.bride,
      account: "1903 2211 2026",
      owner: "TRAN NGOC TRAM",
    },
  },
  timeline: [
    { time: "10:00", label: "ĐÓN KHÁCH" },
    { time: "10:30", label: "LỄ CƯỚI" },
    { time: "11:00", label: "KHAI TIỆC" },
    { time: "12:30", label: "CHỤP ẢNH CÙNG CÔ DÂU CHÚ RỂ" },
  ],
  dressColors: ["#7e9276", "#e9e4d6", "#c8b79a", "#3f4a3a"],
  // outdoor photos in green fields and woods, chosen by the owner
  photos: {
    ...base.photos,
    cover: { key: "cover", label: "Ảnh bìa", ratio: "3/4", src: cover },
    destiny: { key: "destiny", label: "Ảnh dọc", ratio: "4/5", src: destiny },
    couple: { key: "couple", label: "Ảnh cặp đôi", ratio: "4/5", src: couple },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "album1", label: "Ảnh album 1", ratio: "4/5", src: album1 },
    { key: "album2", label: "Ảnh album 2", ratio: "3/4", src: album2 },
    { key: "album3", label: "Ảnh album 3", ratio: "3/4", src: album3 },
    { key: "album4", label: "Ảnh album 4", ratio: "3/4", src: album4 },
  ] as PhotoSlot[],
};
