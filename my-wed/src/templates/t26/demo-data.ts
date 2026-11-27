import album1 from "@/static/t26/demo/album1.webp";
import album2 from "@/static/t26/demo/album2.webp";
import album3 from "@/static/t26/demo/album3.webp";
import album4 from "@/static/t26/demo/album4.webp";
import couple from "@/static/t26/demo/couple.webp";
import cover from "@/static/t26/demo/cover.webp";
import destiny from "@/static/t26/demo/destiny.webp";
import { PhotoSlot, WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Đức Minh",
  bride: "Khánh Linh",
  weddingISO: "2026-12-26T17:30:00+07:00",
  calendarDates: "20261226T103000Z/20261226T143000Z",
  eventTitle: "Lễ thành hôn Đức Minh & Khánh Linh",
  venueName: "Trung tâm tiệc cưới An Phúc",
  venueAddress: "Sảnh Hoàng Kim, 68 Lê Lợi, phường Bến Thành, TP. Hồ Chí Minh",
  venueQuery: "68 Lê Lợi Bến Thành TP Hồ Chí Minh",
  rsvpDeadline: "15.12",
  families: {
    groom: ["Ông Nguyễn Văn Hùng", "Bà Trần Thị Mai"],
    bride: ["Ông Lê Minh Đức", "Bà Phạm Thị Hoa"],
  },
  gifts: {
    groom: {
      ...base.gifts.groom,
      account: "1903 6688 2026",
      owner: "NGUYEN DUC MINH",
    },
    bride: {
      ...base.gifts.bride,
      account: "0711 0022 5566",
      owner: "LE KHANH LINH",
    },
  },
  timeline: [
    { time: "17:00", label: "ĐÓN KHÁCH" },
    { time: "17:30", label: "LỄ THÀNH HÔN" },
    { time: "18:00", label: "KHAI TIỆC" },
  ],
  dressColors: ["#9e1b24", "#c9a35b", "#f3e3c3", "#2b1a17"],
  // red-studio photos with a double-happiness wall, chosen by the owner
  photos: {
    ...base.photos,
    cover: { key: "cover", label: "Ảnh bìa", ratio: "3/4", src: cover },
    couple: { key: "couple", label: "Ảnh cặp đôi", ratio: "3/4", src: couple },
    destiny: { key: "destiny", label: "Ảnh cuối thiệp", ratio: "1/1", src: destiny },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "album1", label: "Ảnh album 1", ratio: "3/4", src: album1 },
    { key: "album2", label: "Ảnh album 2", ratio: "3/4", src: album2 },
    { key: "album3", label: "Ảnh album 3", ratio: "3/4", src: album3 },
    { key: "album4", label: "Ảnh album 4", ratio: "3/4", src: album4 },
  ] as PhotoSlot[],
};
