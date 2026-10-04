import { WeddingData } from "@/core/types";
import { demoData as base } from "@/templates/t01/demo-data";

export const demoData: WeddingData = {
  ...base,
  groom: "MINH",
  bride: "ANH",
  eventTitle: "Tiệc cưới Minh & Anh",
  venueName: "Trung tâm tiệc cưới XYZ",
  venueAddress: "Sảnh ___, số ___ đường ___, phường ___",
  venueQuery: "Trung tâm tiệc cưới XYZ",
};
