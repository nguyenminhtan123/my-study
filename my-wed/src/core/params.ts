/**
 * A query parameter from the link that opened the mini app, e.g. `thiep` or `khach`. Read from the
 * normal query and from the hash part (where the mini app router keeps its own query).
 */
export const readParam = (name: string) => {
  if (typeof window === "undefined") return "";
  const read = (q: string) => new URLSearchParams(q).get(name) ?? "";
  const hash = window.location.hash;
  const fromHash = hash.includes("?")
    ? read(hash.slice(hash.indexOf("?")))
    : "";
  return (read(window.location.search) || fromHash).trim();
};
