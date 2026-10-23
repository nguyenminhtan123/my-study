import { demoData as base } from "@/templates/t28/demo-data";
import { WeddingData } from "@/core/types";

// same couple and photos as t28
export const demoData: WeddingData = {
  ...base,
  dressColors: ["#d4607a", "#f7c6d0", "#fff5ef", "#b8935a"],
};
