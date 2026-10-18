import { WeddingData } from "@/core/types";

// Supabase project for real invitations. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in
// my-wed/.env.local (gitignored). The anon key is public by design: the database only lets it read
// one invitation by code and add RSVPs (see supabase/schema.sql).
const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export interface Invitation {
  templateId: string;
  data: Partial<WeddingData>;
  status: "draft" | "active" | "memory";
}

const rpc = async <T>(
  fn: string,
  body: Record<string, unknown>,
): Promise<T> => {
  if (!URL || !KEY) throw new Error("Supabase is not configured");
  const res = await fetch(`${URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${fn} failed: ${res.status}`);
  return res.json() as Promise<T>;
};

/** The invitation for a link code, or null when the code is unknown or expired. */
export const fetchInvitation = async (code: string) => {
  const row = await rpc<{
    template_id: string;
    data: Partial<WeddingData>;
    status: Invitation["status"];
  } | null>("get_invitation", { p_code: code });
  return row
    ? ({
        templateId: row.template_id,
        data: row.data,
        status: row.status,
      } as Invitation)
    : null;
};

/**
 * Template demo data with the invitation's own data on top. Nested parts are merged too, so a
 * missing photo slot falls back to the template's sample instead of breaking the page.
 */
export const mergeInvitationData = (
  base: WeddingData,
  own: Partial<WeddingData>,
): WeddingData => ({
  ...base,
  ...own,
  families: { ...base.families, ...own.families },
  gifts: { ...base.gifts, ...own.gifts },
  photos: { ...base.photos, ...own.photos },
  // some templates place album[0..3] at fixed spots: repeat the couple's own photos rather than
  // show sample photos (or break) when fewer were uploaded
  album: fillAlbum(own.album, base.album),
});

const fillAlbum = (
  own: WeddingData["album"] | undefined,
  base: WeddingData["album"],
) => {
  if (!own?.length) return base;
  if (own.length >= 4) return own;
  return Array.from({ length: 4 }, (_, i) => ({
    ...own[i % own.length],
    key: `${own[i % own.length].key}-${i}`,
  }));
};

export interface RsvpInput {
  guestName: string;
  attending: boolean;
  partySize: number;
  side: "groom" | "bride" | "";
  message: string;
  consent: boolean;
}

/** Sends a guest's RSVP + wish for the invitation `code`. False when the invitation is closed. */
export const submitRsvp = (code: string, r: RsvpInput) =>
  rpc<boolean>("submit_rsvp", {
    p_code: code,
    p_guest_name: r.guestName.trim().slice(0, 80),
    p_attending: r.attending,
    p_party_size: r.partySize,
    p_side: r.side,
    p_message: r.message.trim().slice(0, 1000),
    p_consent: r.consent,
  });
