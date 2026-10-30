import { WeddingData } from "@/core/types";
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
  gifts: {
    groom: { ...base.gifts.groom, owner: "NGUYEN TRONG TRI" },
    bride: { ...base.gifts.bride, owner: "LE VIET HOA" },
  },
};
