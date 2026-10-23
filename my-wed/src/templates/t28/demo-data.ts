import album2 from "@/static/album2.jpeg";
import album3 from "@/static/album3.jpeg";
import album4 from "@/static/album4.jpeg";
import couple from "@/static/couple.jpeg";
import cover from "@/static/cover.webp";
import destiny from "@/static/destiny.jpeg";
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
  dressColors: ["#9a3b3b", "#c39a52", "#f3e3c3", "#6e2b2b"],
  photos: {
    cover: { key: "cover", label: "Ảnh bìa", ratio: "3/4", src: cover },
    destiny: { key: "destiny", label: "Ảnh cuối thiệp", ratio: "1/1", src: destiny },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "album1", label: "Ảnh album 1", ratio: "3/2", src: couple },
    { key: "album2", label: "Ảnh album 2", ratio: "3/4", src: album2 },
    { key: "album3", label: "Ảnh album 3", ratio: "3/4", src: album3 },
    { key: "album4", label: "Ảnh album 4", ratio: "3/4", src: destiny },
    { key: "album5", label: "Ảnh album 5", ratio: "3/2", src: album4 },
  ] as PhotoSlot[],
};
