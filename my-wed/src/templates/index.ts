import { ComponentType } from "react";

import { WeddingData } from "@/core/types";
import Template01 from "@/templates/t01";
import cover01 from "@/static/cover.jpg";
import { demoData as demoData01 } from "@/templates/t01/demo-data";
import Template02 from "@/templates/t02";
import couple02 from "@/static/couple.jpeg";
import { demoData as demoData02 } from "@/templates/t02/demo-data";
import Template03 from "@/templates/t03";
import destiny03 from "@/static/destiny.jpeg";
import { demoData as demoData03 } from "@/templates/t03/demo-data";
import Template04 from "@/templates/t04";
import album04 from "@/static/album2.jpeg";
import { demoData as demoData04 } from "@/templates/t04/demo-data";
import Template05 from "@/templates/t05";
import album05 from "@/static/album3.jpeg";
import { demoData as demoData05 } from "@/templates/t05/demo-data";

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
  {
    id: "t02",
    name: "Mẫu 2 · Tối giản",
    thumbnail: couple02,
    Component: Template02,
    demoData: demoData02,
  },
  {
    id: "t03",
    name: "Mẫu 3 · Sen trắng",
    thumbnail: destiny03,
    Component: Template03,
    demoData: demoData03,
  },
  {
    id: "t04",
    name: "Mẫu 4 · Đỏ rượu vang",
    thumbnail: album04,
    Component: Template04,
    demoData: demoData04,
  },
  {
    id: "t05",
    name: "Mẫu 5 · Biển xanh",
    thumbnail: album05,
    Component: Template05,
    demoData: demoData05,
  },
];

export const getTemplate = (id: string) =>
  templates.find((template) => template.id === id);
