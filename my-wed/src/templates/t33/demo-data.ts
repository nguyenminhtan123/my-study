import { demoData as base } from "@/templates/t28/demo-data";
import { WeddingData } from "@/core/types";

// same couple and photos as t28
export const demoData: WeddingData = {
  ...base,
  dressColors: ["#d0708c", "#6b80c0", "#fffdf9", "#2f4637"],
};
