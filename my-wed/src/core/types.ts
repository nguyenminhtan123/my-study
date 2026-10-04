export type GiftSide = "groom" | "bride";

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

export interface PhotoSlot {
  key: string;
  label: string;
  ratio: string;
  src: string;
}

/**
 * Data contract shared by every template. A template renders this data in its
 * own UI; it never reads data from anywhere else.
 */
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
  families: Record<GiftSide, string[]>;
  dressColors: string[];
  gifts: Record<GiftSide, GiftAccount>;
  photos: Record<string, PhotoSlot>;
  album: PhotoSlot[];
  timeline: TimelineStep[];
}
