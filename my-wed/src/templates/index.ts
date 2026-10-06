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
import Template11 from "@/templates/t11";
import cover11 from "@/static/album1.jpeg";
import { demoData as demoData11 } from "@/templates/t11/demo-data";
import Template12 from "@/templates/t12";
import cover12 from "@/static/album2.jpeg";
import { demoData as demoData12 } from "@/templates/t12/demo-data";
import Template13 from "@/templates/t13";
import cover13 from "@/static/album3.jpeg";
import { demoData as demoData13 } from "@/templates/t13/demo-data";
import Template14 from "@/templates/t14";
import cover14 from "@/static/couple.jpeg";
import { demoData as demoData14 } from "@/templates/t14/demo-data";
import Template15 from "@/templates/t15";
import cover15 from "@/static/album2.jpeg";
import { demoData as demoData15 } from "@/templates/t15/demo-data";
import Template16 from "@/templates/t16";
import cover16 from "@/static/destiny.jpeg";
import { demoData as demoData16 } from "@/templates/t16/demo-data";
import Template17 from "@/templates/t17";
import cover17 from "@/static/cover.jpg";
import { demoData as demoData17 } from "@/templates/t17/demo-data";
import Template18 from "@/templates/t18";
import cover18 from "@/static/album1.jpeg";
import { demoData as demoData18 } from "@/templates/t18/demo-data";
import Template19 from "@/templates/t19";
import cover19 from "@/static/album4.jpeg";
import { demoData as demoData19 } from "@/templates/t19/demo-data";
import Template20 from "@/templates/t20";
import cover20 from "@/static/album3.jpeg";
import { demoData as demoData20 } from "@/templates/t20/demo-data";
import Template21 from "@/templates/t21";
import cover21 from "@/static/couple.jpeg";
import { demoData as demoData21 } from "@/templates/t21/demo-data";
import Template22 from "@/templates/t22";
import cover22 from "@/static/destiny.jpeg";
import { demoData as demoData22 } from "@/templates/t22/demo-data";
import Template23 from "@/templates/t23";
import cover23 from "@/static/album2.jpeg";
import { demoData as demoData23 } from "@/templates/t23/demo-data";
import Template24 from "@/templates/t24";
import cover24 from "@/static/album1.jpeg";
import { demoData as demoData24 } from "@/templates/t24/demo-data";

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
  {
    id: "t11",
    name: "Mẫu 11 · Đỏ rượu & kem",
    thumbnail: cover11,
    Component: Template11,
    demoData: demoData11,
  },
  {
    id: "t12",
    name: "Mẫu 12 · Xanh rêu & kem",
    thumbnail: cover12,
    Component: Template12,
    demoData: demoData12,
  },
  {
    id: "t13",
    name: "Mẫu 13 · Xanh cổ điển",
    thumbnail: cover13,
    Component: Template13,
    demoData: demoData13,
  },
  {
    id: "t14",
    name: "Mẫu 14 · Lối vào lễ đường",
    thumbnail: cover14,
    Component: Template14,
    demoData: demoData14,
  },
  {
    id: "t15",
    name: "Mẫu 15 · Hỷ đỏ",
    thumbnail: cover15,
    Component: Template15,
    demoData: demoData15,
  },
  {
    id: "t16",
    name: "Mẫu 16 · Oải hương",
    thumbnail: cover16,
    Component: Template16,
    demoData: demoData16,
  },
  {
    id: "t17",
    name: "Mẫu 17 · Lá phong mùa thu",
    thumbnail: cover17,
    Component: Template17,
    demoData: demoData17,
  },
  {
    id: "t18",
    name: "Mẫu 18 · Hoa đào cổ họa",
    thumbnail: cover18,
    Component: Template18,
    demoData: demoData18,
  },
  {
    id: "t19",
    name: "Mẫu 19 · Đêm đầy sao",
    thumbnail: cover19,
    Component: Template19,
    demoData: demoData19,
  },
  {
    id: "t20",
    name: "Mẫu 20 · Hướng dương",
    thumbnail: cover20,
    Component: Template20,
    demoData: demoData20,
  },
  {
    id: "t21",
    name: "Mẫu 21 · Tạp chí mẫu đơn",
    thumbnail: cover21,
    Component: Template21,
    demoData: demoData21,
  },
  {
    id: "t22",
    name: "Mẫu 22 · Champagne",
    thumbnail: cover22,
    Component: Template22,
    demoData: demoData22,
  },
  {
    id: "t23",
    name: "Mẫu 23 · Cúc họa mi",
    thumbnail: cover23,
    Component: Template23,
    demoData: demoData23,
  },
  {
    id: "t24",
    name: "Mẫu 24 · Thư tay thảo mộc",
    thumbnail: cover24,
    Component: Template24,
    demoData: demoData24,
  },
];

export const getTemplate = (id: string) =>
  templates.find((template) => template.id === id);
