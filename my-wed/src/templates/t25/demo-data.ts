import album1 from "@/static/album1.jpeg";
import album2 from "@/static/album2.jpeg";
import album3 from "@/static/album3.jpeg";
import album4 from "@/static/album4.jpeg";
import couple from "@/static/couple.jpeg";
import cover from "@/static/cover.jpg";
import destinyTall from "@/static/destiny.jpeg";
import studio from "@/static/destiny.jpg";
import { PhotoSlot, WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Minh Khôi",
  bride: "Bảo Ngọc",
  weddingISO: "2026-12-20T11:00:00+07:00",
  calendarDates: "20261220T040000Z/20261220T080000Z",
  eventTitle: "Lễ thành hôn Minh Khôi & Bảo Ngọc",
  venueName: "Tư gia nhà trai",
  venueAddress: "Số ___ đường ___, phường ___, Hà Nội",
  venueQuery: "Hà Nội",
  rsvpDeadline: "10.12",
  timeline: [
    { time: "10:30", label: "ĐÓN KHÁCH" },
    { time: "11:00", label: "KHAI TIỆC" },
  ],
  photos: {
    cover: { key: "cover", label: "Ảnh bìa", ratio: "2/3", src: studio },
    bride: { key: "bride", label: "Ảnh cô dâu", ratio: "2/3", src: album2 },
    groom: { key: "groom", label: "Ảnh chú rể", ratio: "2/3", src: album3 },
    night: { key: "night", label: "Ảnh lịch cưới", ratio: "2/3", src: album4 },
    thanks: {
      key: "thanks",
      label: "Ảnh cuối thiệp",
      ratio: "2/3",
      src: studio,
    },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "a1", label: "Ảnh album 1", ratio: "2/3", src: album1 },
    { key: "a2", label: "Ảnh album 2", ratio: "2/3", src: destinyTall },
    { key: "a3", label: "Ảnh album 3", ratio: "2/3", src: cover },
    { key: "a4", label: "Ảnh album 4", ratio: "2/3", src: album2 },
    { key: "a5", label: "Ảnh album 5", ratio: "2/3", src: album3 },
    { key: "a6", label: "Ảnh album 6", ratio: "3/2", src: couple },
  ] as PhotoSlot[],
};
