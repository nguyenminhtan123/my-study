import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "Minh Khang",
  bride: "Lan Anh",
  eventTitle: "Tiệc cưới Minh Khang & Lan Anh",
  venueName: "Trung tâm tiệc cưới XYZ",
  venueAddress: "Sảnh ___, số ___ đường ___, phường ___",
  venueQuery: "Trung tâm tiệc cưới XYZ",
};
