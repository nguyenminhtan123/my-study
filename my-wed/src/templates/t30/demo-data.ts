import { demoData as base } from "@/templates/t28/demo-data";
import { WeddingData } from "@/core/types";

// same couple and photos as t28: their sunset beach shoot suits the morning sea
export const demoData: WeddingData = {
  ...base,
  dressColors: ["#d9952b", "#f3dcb2", "#234a5a", "#e08a6d"],
};
