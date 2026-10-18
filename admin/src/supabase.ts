import { createClient } from "@supabase/supabase-js";

// Same Supabase project as the mini app. Set these in admin/.env.local and in Vercel → Settings →
// Environment Variables. The anon key is public; what an account may do is decided by the
// database rules (only users listed in public.admins can read or change invitations).
const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, key);
