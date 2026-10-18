// Background songs live in src/static/music/ (gitignored, filled by `npm run music`). The glob
// finds whatever is there at build time; with no songs the player simply doesn't show.
const files = import.meta.glob("../static/music/*.mp3", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const tracks = Object.entries(files)
  .map(([path, url]) => ({ id: path.replace(/^.*\/|\.mp3$/g, ""), url }))
  .sort((a, b) => a.id.localeCompare(b.id));

/**
 * URL of the song: a full https link (a customer's own song in Supabase Storage) is used as is;
 * otherwise the bundled song named `id` (file name without .mp3), else the first song, else "".
 */
export const musicUrl = (id?: string) =>
  id && /^https:\/\//.test(id)
    ? id
    : ((tracks.find((t) => t.id === id) ?? tracks[0])?.url ?? "");
