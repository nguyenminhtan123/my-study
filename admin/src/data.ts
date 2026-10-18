import { APP_ID, MIN_ALBUM, PHOTO_LABELS, TEMPLATES } from "./catalog";
import { supabase } from "./supabase";

// Mirrors WeddingData in my-wed/src/core/types.ts (what the templates render).
export interface PhotoSlot {
  key: string;
  label: string;
  ratio: string;
  src: string;
}
export interface GiftAccount {
  bank: string;
  account: string;
  owner: string;
  qr: string;
}
export interface TimelineStep {
  time: string;
  label: string;
}
export interface WeddingData {
  groom: string;
  bride: string;
  weddingISO: string;
  calendarDates: string;
  eventTitle: string;
  venueName: string;
  venueAddress: string;
  venueQuery: string;
  rsvpDeadline: string;
  introImage: string;
  families: { groom: string[]; bride: string[] };
  dressColors: string[];
  gifts: { groom: GiftAccount; bride: GiftAccount };
  photos: Record<string, PhotoSlot>;
  album: PhotoSlot[];
  timeline: TimelineStep[];
  music?: string;
}

export type Status = "draft" | "active" | "memory" | "expired";
export const STATUS_LABEL: Record<Status, string> = {
  draft: "Nháp",
  active: "Đang dùng",
  memory: "Lưu niệm",
  expired: "Hết hạn",
};

export interface Invitation {
  code: string;
  template_id: string;
  status: Status;
  customer: string | null;
  wedding_date: string | null;
  expires_at: string | null;
  data: WeddingData;
  updated_at?: string;
  rsvps?: { count: number }[];
}

const emptyGift = (): GiftAccount => ({
  bank: "",
  account: "",
  owner: "",
  qr: "",
});

export const newInvitationData = (): WeddingData => ({
  groom: "",
  bride: "",
  weddingISO: "",
  calendarDates: "",
  eventTitle: "",
  venueName: "",
  venueAddress: "",
  venueQuery: "",
  rsvpDeadline: "",
  introImage: "",
  families: { groom: ["", ""], bride: ["", ""] },
  dressColors: ["#1E2440", "#5A3A32", "#A82B34", "#1A1A1A"],
  gifts: { groom: emptyGift(), bride: emptyGift() },
  photos: {},
  album: [],
  timeline: [
    { time: "10:00", label: "ĐÓN KHÁCH" },
    { time: "10:30", label: "LỄ CƯỚI" },
    { time: "11:00", label: "KHAI TIỆC" },
    { time: "12:00", label: "TIỆC NHẠC" },
  ],
  music: "ngay-dau-tien",
});

// "Nguyễn Minh Khôi" -> "khoi"
const slugWord = (name: string) =>
  (name.trim().split(/\s+/).pop() ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

/** "khoi-ngoc-7k2p": readable, with a random tail so nobody can guess other couples' links. */
export const makeCode = (groom: string, bride: string) => {
  const tail = Array.from(crypto.getRandomValues(new Uint8Array(4)))
    .map((b) => "abcdefghjkmnpqrstuvwxyz23456789"[b % 31])
    .join("");
  const head =
    [slugWord(groom), slugWord(bride)].filter(Boolean).join("-") || "thiep";
  return `${head}-${tail}`;
};

export const invitationLink = (code: string, guest?: string) =>
  `https://zalo.me/s/${APP_ID}/?thiep=${code}${
    guest ? `&khach=${encodeURIComponent(guest)}` : ""
  }`;

/** "2027-01-16T10:30:00+07:00" <-> date "2027-01-16" + time "10:30" (Vietnam time). */
export const splitISO = (iso: string) => {
  const m = iso.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/);
  return m ? { date: m[1], time: m[2] } : { date: "", time: "" };
};
export const joinISO = (date: string, time: string) =>
  date && time ? `${date}T${time}:00+07:00` : "";

/** Fields the mini app also needs that follow from the ones the admin types in. */
export const finalizeData = (d: WeddingData): WeddingData => {
  const start = d.weddingISO ? new Date(d.weddingISO) : null;
  const fmt = (t: Date) =>
    t
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  return {
    ...d,
    eventTitle: `Lễ thành hôn ${d.groom} & ${d.bride}`,
    venueQuery: d.venueQuery || `${d.venueName} ${d.venueAddress}`.trim(),
    calendarDates: start
      ? `${fmt(start)}/${fmt(new Date(start.getTime() + 4 * 3600 * 1000))}`
      : "",
  };
};

/** What still has to be filled in before the invitation can go live. Empty = ready. */
export const missingFor = (templateId: string, d: WeddingData) => {
  const out: string[] = [];
  if (!d.groom.trim()) out.push("tên chú rể");
  if (!d.bride.trim()) out.push("tên cô dâu");
  if (!d.weddingISO) out.push("ngày giờ cưới");
  if (!d.venueName.trim()) out.push("tên địa điểm");
  if (!d.venueAddress.trim()) out.push("địa chỉ");
  const t = TEMPLATES.find((x) => x.id === templateId);
  for (const slot of t?.photos ?? [])
    if (!d.photos[slot]?.src) out.push(PHOTO_LABELS[slot] ?? slot);
  if (d.album.length < MIN_ALBUM) out.push(`album (ít nhất ${MIN_ALBUM} ảnh)`);
  if (d.timeline.some((s) => !s.time || !s.label))
    out.push("lịch trình (đủ 4 mục)");
  return out;
};

/** Shrinks a photo in the browser (max 1600 px, JPEG ~82%) before it is uploaded. */
export const compressImage = (file: File, max = 1600, quality = 0.82) =>
  new Promise<{ blob: Blob; width: number; height: number }>(
    (resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
        canvas.toBlob(
          (blob) =>
            blob
              ? resolve({ blob, width: w, height: h })
              : reject(new Error("encode")),
          "image/jpeg",
          quality,
        );
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => reject(new Error("Không đọc được ảnh"));
      img.src = URL.createObjectURL(file);
    },
  );

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

/** Uploads a photo for an invitation and returns the slot the templates expect. */
export const uploadPhoto = async (
  code: string,
  key: string,
  label: string,
  file: File,
) => {
  const { blob, width, height } = await compressImage(file);
  const path = `${code}/${key}-${Date.now()}.jpg`;
  const { error } = await supabase.storage.from("media").upload(path, blob, {
    contentType: "image/jpeg",
    cacheControl: "31536000",
  });
  if (error) throw error;
  const src = supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
  const g = gcd(width, height) || 1;
  return { key, label, ratio: `${width / g}/${height / g}`, src } as PhotoSlot;
};

/** Uploads a customer's own song (mp3) and returns its public link. */
export const uploadSong = async (code: string, file: File) => {
  const path = `${code}/song-${Date.now()}.mp3`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    contentType: "audio/mpeg",
    cacheControl: "31536000",
  });
  if (error) throw error;
  return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
};
