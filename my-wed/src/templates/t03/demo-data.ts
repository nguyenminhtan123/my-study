import album1 from "@/static/t03/demo/album1.webp";
import album2 from "@/static/t03/demo/album2.webp";
import album3 from "@/static/t03/demo/album3.webp";
import album4 from "@/static/t03/demo/album4.webp";
import album5 from "@/static/t03/demo/album5.webp";
import cover from "@/static/t03/demo/cover.webp";
import { PhotoSlot, WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Trọng Trí",
  bride: "Việt Hoa",
  eventTitle: "Lễ thành hôn Trọng Trí & Việt Hoa",
  venueName: "Tư gia nhà gái",
  venueAddress: "Số 12 Ngõ 34 Phố Hàng Bạc, Hoàn Kiếm, Hà Nội",
  venueQuery: "Hàng Bạc Hoàn Kiếm Hà Nội",
  dressColors: ["#8e1b22", "#3f6b2a", "#d9a441", "#f8f1e3"],
  // AI photos (Gemini, made by the owner) in Vietnamese ancient wedding costume: navy áo tấc, red giao lĩnh,
  // nón quai thao, a deep red studio with white lotus
  photos: {
    ...base.photos,
    cover: { key: "cover", label: "Ảnh bìa", ratio: "2/3", src: cover },
  } as Record<string, PhotoSlot>,
  album: [
    { key: "album1", label: "Ảnh album 1", ratio: "4/3", src: album1 },
    { key: "album2", label: "Ảnh album 2", ratio: "3/4", src: album2 },
    { key: "album3", label: "Ảnh album 3", ratio: "3/4", src: album3 },
    { key: "album4", label: "Ảnh album 4", ratio: "4/3", src: album4 },
    { key: "album5", label: "Ảnh album 5", ratio: "4/3", src: album5 },
  ] as PhotoSlot[],
  gifts: {
    groom: { ...base.gifts.groom, owner: "NGUYEN TRONG TRI" },
    bride: { ...base.gifts.bride, owner: "LE VIET HOA" },
  },
};
