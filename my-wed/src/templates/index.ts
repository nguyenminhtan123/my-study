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
import Template06 from "@/templates/t06";
import cover06 from "@/static/album1.jpeg";
import { demoData as demoData06 } from "@/templates/t06/demo-data";
import Template07 from "@/templates/t07";
import cover07 from "@/static/couple.jpeg";
import { demoData as demoData07 } from "@/templates/t07/demo-data";
import Template08 from "@/templates/t08";
import cover08 from "@/static/album4.jpeg";
import { demoData as demoData08 } from "@/templates/t08/demo-data";
import Template09 from "@/templates/t09";
import cover09 from "@/static/album3.jpeg";
import { demoData as demoData09 } from "@/templates/t09/demo-data";
import Template10 from "@/templates/t10";
import cover10 from "@/static/destiny.jpeg";
import { demoData as demoData10 } from "@/templates/t10/demo-data";

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
  {
    id: "t06",
    name: "Mẫu 6 · Hoa giấy xanh",
    thumbnail: cover06,
    Component: Template06,
    demoData: demoData06,
  },
  {
    id: "t07",
    name: "Mẫu 7 · Satin tối giản",
    thumbnail: cover07,
    Component: Template07,
    demoData: demoData07,
  },
  {
    id: "t08",
    name: "Mẫu 8 · Hoàng hôn vàng",
    thumbnail: cover08,
    Component: Template08,
    demoData: demoData08,
  },
  {
    id: "t09",
    name: "Mẫu 9 · Tím hoa cẩm cầu",
    thumbnail: cover09,
    Component: Template09,
    demoData: demoData09,
  },
  {
    id: "t10",
    name: "Mẫu 10 · Rừng tối",
    thumbnail: cover10,
    Component: Template10,
    demoData: demoData10,
  },
];

export const getTemplate = (id: string) =>
  templates.find((template) => template.id === id);
