// Templates of the mini app (my-wed/src/templates/index.ts), in gallery order, with the named photo
// slots each one shows besides the album. Update this list when a template is added.
export interface TemplateInfo {
  id: string;
  name: string;
  photos: string[];
}

export const TEMPLATES: TemplateInfo[] = [
  { id: "t01", name: "Mẫu 1", photos: ["cover", "couple", "destiny"] },
  { id: "t03", name: "Mẫu 3 · Trầu cau", photos: ["cover"] },
  { id: "t10", name: "Mẫu 10 · Nhẫn cưới", photos: ["destiny"] },
  { id: "t11", name: "Mẫu 11 · Đỏ rượu & kem", photos: ["couple"] },
  { id: "t15", name: "Mẫu 15 · Hỷ đỏ", photos: ["couple"] },
  { id: "t19", name: "Mẫu 19 · Tiệc cưới lung linh", photos: ["couple"] },
  { id: "t22", name: "Mẫu 22 · Champagne", photos: ["destiny"] },
  { id: "t23", name: "Mẫu 23 · Váy cưới ren", photos: ["cover"] },
  { id: "t24", name: "Mẫu 24 · Mưa cánh hoa", photos: ["couple"] },
  { id: "t02", name: "Mẫu 2 · Tối giản", photos: [] },
  { id: "t04", name: "Mẫu 4 · Đỏ rượu vang", photos: ["destiny"] },
  { id: "t05", name: "Mẫu 5 · Biển xanh", photos: ["couple"] },
  { id: "t06", name: "Mẫu 6 · Tú cầu lục bảo", photos: ["couple"] },
  { id: "t07", name: "Mẫu 7 · Lụa vàng", photos: ["destiny"] },
  { id: "t08", name: "Mẫu 8 · Uyên ương", photos: ["couple"] },
  { id: "t09", name: "Mẫu 9 · Cẩm tú cầu", photos: ["cover"] },
  { id: "t12", name: "Mẫu 12 · Xanh rêu & kem", photos: ["cover", "couple"] },
  { id: "t13", name: "Mẫu 13 · Xanh cổ điển", photos: ["cover", "destiny"] },
  { id: "t14", name: "Mẫu 14 · Lối vào lễ đường", photos: ["cover"] },
  { id: "t16", name: "Mẫu 16 · Oải hương", photos: ["destiny"] },
  { id: "t17", name: "Mẫu 17 · Bó hoa cô dâu", photos: ["cover"] },
  { id: "t18", name: "Mẫu 18 · Hoa đào cổ họa", photos: [] },
  { id: "t20", name: "Mẫu 20 · Bánh cưới", photos: ["destiny"] },
  { id: "t21", name: "Mẫu 21 · Tạp chí mẫu đơn", photos: ["cover"] },
  {
    id: "t25",
    name: "Mẫu 25 · Lụa Be",
    photos: ["cover", "bride", "groom", "night", "thanks"],
  },
];

export const PHOTO_LABELS: Record<string, string> = {
  cover: "Ảnh bìa (dọc)",
  couple: "Ảnh cặp đôi (ngang)",
  destiny: "Ảnh dọc thứ hai",
  bride: "Ảnh cô dâu",
  groom: "Ảnh chú rể",
  night: "Ảnh nền lịch cưới",
  thanks: "Ảnh cuối thiệp",
};

/** Songs bundled in the mini app (my-wed/src/static/music). */
export const SONGS: { id: string; name: string }[] = [
  { id: "ngay-dau-tien", name: "Ngày Đầu Tiên" },
  { id: "yeu-em-hon-moi-ngay", name: "Yêu Em Hơn Mỗi Ngày" },
];

/** Zalo Mini App id; invitation links are https://zalo.me/s/<APP_ID>/?thiep=<code> */
export const APP_ID = "3058407821344008306";

export const MIN_ALBUM = 4;
