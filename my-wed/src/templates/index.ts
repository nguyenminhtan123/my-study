import { ComponentType } from "react";

import { WeddingData } from "@/core/types";
import Template01 from "@/templates/t01";
import cover01 from "@/static/cover.jpg";
import { demoData as demoData01 } from "@/templates/t01/demo-data";

export interface TemplateEntry {
  id: string;
  name: string;
  thumbnail: string;
  Component: ComponentType<{ data: WeddingData }>;
  demoData: WeddingData;
}

export const templates: TemplateEntry[] = [
  {
    id: "t01",
    name: "Mẫu 1",
    thumbnail: cover01,
    Component: Template01,
    demoData: demoData01,
  },
];

export const getTemplate = (id: string) =>
  templates.find((template) => template.id === id);
