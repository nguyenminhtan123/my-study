import { demoData as base } from "@/templates/t28/demo-data";
import { WeddingData } from "@/core/types";

// same couple and photos as t28
export const demoData: WeddingData = {
  ...base,
  dressColors: ["#c2566c", "#f3d9df", "#5f8f7b", "#c9a35b"],
};
