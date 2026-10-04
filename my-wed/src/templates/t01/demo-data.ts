import album1 from "@/static/album1.jpeg";
import album2 from "@/static/album2.jpeg";
import album3 from "@/static/album3.jpeg";
import album4 from "@/static/album4.jpeg";
import couple from "@/static/couple.jpeg";
import cover from "@/static/cover.jpg";
import destiny from "@/static/destiny.jpeg";
import {
  GiftSide,
  GiftAccount,
  PhotoSlot,
  TimelineStep,
  WeddingData,
} from "@/core/types";

export const demoData: WeddingData = {
  groom: "TÂN",
  bride: "TRANG",
  weddingISO: "2026-10-30T17:00:00+07:00",
  calendarDates: "20261030T100000Z/20261030T140000Z",
  eventTitle: "Tiệc cưới Tân & Trang",
  venueName: "Nhà hàng ABC",
  venueAddress: "Sảnh ___, số ___ đường ___, phường ___",
  venueQuery: "Nhà hàng ABC",
  rsvpDeadline: "20.10",
  introImage: "",
  families: {
    groom: ["Ông ___", "Bà ___"],
    bride: ["Ông ___", "Bà ___"],
  },
  dressColors: ["#1E2440", "#5A3A32", "#A82B34", "#1A1A1A"],
  gifts: {
    groom: {
      bank: "Ngân hàng Techcombank",
      account: "0000 0000 0000",
      owner: "NGUYEN VAN TAN",
      qr: "",
    },
    bride: {
      bank: "Ngân hàng Techcombank",
      account: "1111 1111 1111",
      owner: "NGUYEN THI TRANG",
      qr: "",
    },
  } as Record<GiftSide, GiftAccount>,
  photos: {
    cover: { key: "cover", label: "Ảnh bìa", ratio: "3/4", src: cover },
    couple: { key: "couple", label: "Ảnh cặp đôi", ratio: "3/2", src: couple },
    destiny: { key: "destiny", label: "Ảnh dọc", ratio: "3/4", src: destiny },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "album1", label: "Ảnh album 1", ratio: "4/3", src: album1 },
    { key: "album2", label: "Ảnh album 2", ratio: "3/4", src: album2 },
    { key: "album3", label: "Ảnh album 3", ratio: "3/4", src: album3 },
    { key: "album4", label: "Ảnh album 4", ratio: "3/2", src: album4 },
  ] as PhotoSlot[],
  timeline: [
    { time: "17:00", label: "ĐÓN KHÁCH" },
    { time: "18:00", label: "LỄ CƯỚI" },
    { time: "18:30", label: "KHAI TIỆC" },
    { time: "19:00", label: "TIỆC NHẠC" },
  ] as TimelineStep[],
};
