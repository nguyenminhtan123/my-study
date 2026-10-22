import { demoData as base } from "@/templates/t28/demo-data";
import { WeddingData } from "@/core/types";

// same couple and photos as t28
export const demoData: WeddingData = {
  ...base,
  dressColors: ["#f9f6f0", "#e9e1d3", "#b08d57", "#4a443d"],
};
