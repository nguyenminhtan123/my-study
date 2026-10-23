import { ComponentType } from "react";

import { WeddingData } from "@/core/types";
import Template01 from "@/templates/t01";
import thumb01 from "@/static/thumbs/t01.jpg";
import { demoData as demoData01 } from "@/templates/t01/demo-data";
import Template03 from "@/templates/t03";
import thumb03 from "@/static/thumbs/t03.jpg";
import { demoData as demoData03 } from "@/templates/t03/demo-data";
import Template10 from "@/templates/t10";
import thumb10 from "@/static/thumbs/t10.jpg";
import { demoData as demoData10 } from "@/templates/t10/demo-data";
import Template11 from "@/templates/t11";
import thumb11 from "@/static/thumbs/t11.jpg";
import { demoData as demoData11 } from "@/templates/t11/demo-data";
import Template13 from "@/templates/t13";
import thumb13 from "@/static/thumbs/t13.jpg";
import { demoData as demoData13 } from "@/templates/t13/demo-data";
import Template14 from "@/templates/t14";
import thumb14 from "@/static/thumbs/t14.jpg";
import { demoData as demoData14 } from "@/templates/t14/demo-data";
import Template15 from "@/templates/t15";
import thumb15 from "@/static/thumbs/t15.jpg";
import { demoData as demoData15 } from "@/templates/t15/demo-data";
import Template16 from "@/templates/t16";
import thumb16 from "@/static/thumbs/t16.jpg";
import { demoData as demoData16 } from "@/templates/t16/demo-data";
import Template17 from "@/templates/t17";
import thumb17 from "@/static/thumbs/t17.jpg";
import { demoData as demoData17 } from "@/templates/t17/demo-data";
import Template19 from "@/templates/t19";
import thumb19 from "@/static/thumbs/t19.jpg";
import { demoData as demoData19 } from "@/templates/t19/demo-data";
import Template20 from "@/templates/t20";
import thumb20 from "@/static/thumbs/t20.jpg";
import { demoData as demoData20 } from "@/templates/t20/demo-data";
import Template22 from "@/templates/t22";
import thumb22 from "@/static/thumbs/t22.jpg";
import { demoData as demoData22 } from "@/templates/t22/demo-data";
import Template25 from "@/templates/t25";
import thumb25 from "@/static/thumbs/t25.jpg";
import { demoData as demoData25 } from "@/templates/t25/demo-data";
import Template26 from "@/templates/t26";
import thumb26 from "@/static/thumbs/t26.jpg";
import { demoData as demoData26 } from "@/templates/t26/demo-data";
import Template27 from "@/templates/t27";
import thumb27 from "@/static/thumbs/t27.jpg";
import { demoData as demoData27 } from "@/templates/t27/demo-data";
import Template28 from "@/templates/t28";
import thumb28 from "@/static/thumbs/t28.jpg";
import { demoData as demoData28 } from "@/templates/t28/demo-data";
import Template29 from "@/templates/t29";
import thumb29 from "@/static/thumbs/t29.jpg";
import { demoData as demoData29 } from "@/templates/t29/demo-data";
import Template30 from "@/templates/t30";
import thumb30 from "@/static/thumbs/t30.jpg";
import { demoData as demoData30 } from "@/templates/t30/demo-data";
import Template31 from "@/templates/t31";
import thumb31 from "@/static/thumbs/t31.jpg";
import { demoData as demoData31 } from "@/templates/t31/demo-data";
import Template32 from "@/templates/t32";
import thumb32 from "@/static/thumbs/t32.jpg";
import { demoData as demoData32 } from "@/templates/t32/demo-data";

export interface TemplateEntry {
  id: string;
  name: string;
  thumbnail: string;
  Component: ComponentType<{ data: WeddingData }>;
  demoData: WeddingData;
}

export const templates: TemplateEntry[] = [
  // shown first in the gallery (owner's picks), then the rest in number order
  {
    id: "t01",
    name: "Mẫu 1",
    thumbnail: thumb01,
    Component: Template01,
    demoData: demoData01,
  },
  {
    id: "t03",
    name: "Mẫu 3 · Trầu cau",
    thumbnail: thumb03,
    Component: Template03,
    demoData: demoData03,
  },
  {
    id: "t10",
    name: "Mẫu 10 · Nhẫn cưới",
    thumbnail: thumb10,
    Component: Template10,
    demoData: demoData10,
  },
  {
    id: "t11",
    name: "Mẫu 11 · Đỏ rượu & kem",
    thumbnail: thumb11,
    Component: Template11,
    demoData: demoData11,
  },
  {
    id: "t15",
    name: "Mẫu 15 · Hỷ đỏ",
    thumbnail: thumb15,
    Component: Template15,
    demoData: demoData15,
  },
  {
    id: "t19",
    name: "Mẫu 19 · Tiệc cưới lung linh",
    thumbnail: thumb19,
    Component: Template19,
    demoData: demoData19,
  },
  {
    id: "t22",
    name: "Mẫu 22 · Champagne",
    thumbnail: thumb22,
    Component: Template22,
    demoData: demoData22,
  },
  {
    id: "t13",
    name: "Mẫu 13 · Xanh cổ điển",
    thumbnail: thumb13,
    Component: Template13,
    demoData: demoData13,
  },
  {
    id: "t14",
    name: "Mẫu 14 · Lối vào lễ đường",
    thumbnail: thumb14,
    Component: Template14,
    demoData: demoData14,
  },
  {
    id: "t16",
    name: "Mẫu 16 · Oải hương",
    thumbnail: thumb16,
    Component: Template16,
    demoData: demoData16,
  },
  {
    id: "t17",
    name: "Mẫu 17 · Bó hoa cô dâu",
    thumbnail: thumb17,
    Component: Template17,
    demoData: demoData17,
  },
  {
    id: "t20",
    name: "Mẫu 20 · Bánh cưới",
    thumbnail: thumb20,
    Component: Template20,
    demoData: demoData20,
  },
  {
    id: "t25",
    name: "Mẫu 25 · Lụa Be",
    thumbnail: thumb25,
    Component: Template25,
    demoData: demoData25,
  },
  {
    id: "t26",
    name: "Mẫu 26 · Song Hỷ đỏ",
    thumbnail: thumb26,
    Component: Template26,
    demoData: demoData26,
  },
  {
    id: "t27",
    name: "Mẫu 27 · Vườn Xanh",
    thumbnail: thumb27,
    Component: Template27,
    demoData: demoData27,
  },
  {
    id: "t28",
    name: "Mẫu 28 · Đèn lồng Hội An",
    thumbnail: thumb28,
    Component: Template28,
    demoData: demoData28,
  },
  {
    id: "t29",
    name: "Mẫu 29 · Sen hồng",
    thumbnail: thumb29,
    Component: Template29,
    demoData: demoData29,
  },
  {
    id: "t30",
    name: "Mẫu 30 · Bình minh biển",
    thumbnail: thumb30,
    Component: Template30,
    demoData: demoData30,
  },
  {
    id: "t31",
    name: "Mẫu 31 · Lễ đường",
    thumbnail: thumb31,
    Component: Template31,
    demoData: demoData31,
  },
  {
    id: "t32",
    name: "Mẫu 32 · Hoa hồng pastel",
    thumbnail: thumb32,
    Component: Template32,
    demoData: demoData32,
  },
];

export const getTemplate = (id: string) =>
  templates.find((template) => template.id === id);
