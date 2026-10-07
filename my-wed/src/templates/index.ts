import { ComponentType } from "react";

import { WeddingData } from "@/core/types";
import Template01 from "@/templates/t01";
import thumb01 from "@/static/thumbs/t01.jpg";
import { demoData as demoData01 } from "@/templates/t01/demo-data";
import Template02 from "@/templates/t02";
import thumb02 from "@/static/thumbs/t02.jpg";
import { demoData as demoData02 } from "@/templates/t02/demo-data";
import Template03 from "@/templates/t03";
import thumb03 from "@/static/thumbs/t03.jpg";
import { demoData as demoData03 } from "@/templates/t03/demo-data";
import Template04 from "@/templates/t04";
import thumb04 from "@/static/thumbs/t04.jpg";
import { demoData as demoData04 } from "@/templates/t04/demo-data";
import Template05 from "@/templates/t05";
import thumb05 from "@/static/thumbs/t05.jpg";
import { demoData as demoData05 } from "@/templates/t05/demo-data";
import Template06 from "@/templates/t06";
import thumb06 from "@/static/thumbs/t06.jpg";
import { demoData as demoData06 } from "@/templates/t06/demo-data";
import Template07 from "@/templates/t07";
import thumb07 from "@/static/thumbs/t07.jpg";
import { demoData as demoData07 } from "@/templates/t07/demo-data";
import Template08 from "@/templates/t08";
import thumb08 from "@/static/thumbs/t08.jpg";
import { demoData as demoData08 } from "@/templates/t08/demo-data";
import Template09 from "@/templates/t09";
import thumb09 from "@/static/thumbs/t09.jpg";
import { demoData as demoData09 } from "@/templates/t09/demo-data";
import Template10 from "@/templates/t10";
import thumb10 from "@/static/thumbs/t10.jpg";
import { demoData as demoData10 } from "@/templates/t10/demo-data";
import Template11 from "@/templates/t11";
import thumb11 from "@/static/thumbs/t11.jpg";
import { demoData as demoData11 } from "@/templates/t11/demo-data";
import Template12 from "@/templates/t12";
import thumb12 from "@/static/thumbs/t12.jpg";
import { demoData as demoData12 } from "@/templates/t12/demo-data";
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
import Template18 from "@/templates/t18";
import thumb18 from "@/static/thumbs/t18.jpg";
import { demoData as demoData18 } from "@/templates/t18/demo-data";
import Template19 from "@/templates/t19";
import thumb19 from "@/static/thumbs/t19.jpg";
import { demoData as demoData19 } from "@/templates/t19/demo-data";
import Template20 from "@/templates/t20";
import thumb20 from "@/static/thumbs/t20.jpg";
import { demoData as demoData20 } from "@/templates/t20/demo-data";
import Template21 from "@/templates/t21";
import thumb21 from "@/static/thumbs/t21.jpg";
import { demoData as demoData21 } from "@/templates/t21/demo-data";
import Template22 from "@/templates/t22";
import thumb22 from "@/static/thumbs/t22.jpg";
import { demoData as demoData22 } from "@/templates/t22/demo-data";
import Template23 from "@/templates/t23";
import thumb23 from "@/static/thumbs/t23.jpg";
import { demoData as demoData23 } from "@/templates/t23/demo-data";
import Template24 from "@/templates/t24";
import thumb24 from "@/static/thumbs/t24.jpg";
import { demoData as demoData24 } from "@/templates/t24/demo-data";
import Template25 from "@/templates/t25";
import thumb25 from "@/static/thumbs/t25.jpg";
import { demoData as demoData25 } from "@/templates/t25/demo-data";
import Template26 from "@/templates/t26";
import thumb26 from "@/static/thumbs/t26.jpg";
import { demoData as demoData26 } from "@/templates/t26/demo-data";

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
    id: "t23",
    name: "Mẫu 23 · Váy cưới ren",
    thumbnail: thumb23,
    Component: Template23,
    demoData: demoData23,
  },
  {
    id: "t24",
    name: "Mẫu 24 · Mưa cánh hoa",
    thumbnail: thumb24,
    Component: Template24,
    demoData: demoData24,
  },
  {
    id: "t02",
    name: "Mẫu 2 · Tối giản",
    thumbnail: thumb02,
    Component: Template02,
    demoData: demoData02,
  },
  {
    id: "t04",
    name: "Mẫu 4 · Đỏ rượu vang",
    thumbnail: thumb04,
    Component: Template04,
    demoData: demoData04,
  },
  {
    id: "t05",
    name: "Mẫu 5 · Biển xanh",
    thumbnail: thumb05,
    Component: Template05,
    demoData: demoData05,
  },
  {
    id: "t06",
    name: "Mẫu 6 · Tú cầu lục bảo",
    thumbnail: thumb06,
    Component: Template06,
    demoData: demoData06,
  },
  {
    id: "t07",
    name: "Mẫu 7 · Lụa vàng",
    thumbnail: thumb07,
    Component: Template07,
    demoData: demoData07,
  },
  {
    id: "t08",
    name: "Mẫu 8 · Uyên ương",
    thumbnail: thumb08,
    Component: Template08,
    demoData: demoData08,
  },
  {
    id: "t09",
    name: "Mẫu 9 · Cẩm tú cầu",
    thumbnail: thumb09,
    Component: Template09,
    demoData: demoData09,
  },
  {
    id: "t12",
    name: "Mẫu 12 · Xanh rêu & kem",
    thumbnail: thumb12,
    Component: Template12,
    demoData: demoData12,
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
    id: "t18",
    name: "Mẫu 18 · Hoa đào cổ họa",
    thumbnail: thumb18,
    Component: Template18,
    demoData: demoData18,
  },
  {
    id: "t20",
    name: "Mẫu 20 · Bánh cưới",
    thumbnail: thumb20,
    Component: Template20,
    demoData: demoData20,
  },
  {
    id: "t21",
    name: "Mẫu 21 · Tạp chí mẫu đơn",
    thumbnail: thumb21,
    Component: Template21,
    demoData: demoData21,
  },
  {
    id: "t25",
    name: "Mẫu 25 · Forever",
    thumbnail: thumb25,
    Component: Template25,
    demoData: demoData25,
  },
  {
    id: "t26",
    name: "Mẫu 26 · Phong bì hồng",
    thumbnail: thumb26,
    Component: Template26,
    demoData: demoData26,
  },
];

export const getTemplate = (id: string) =>
  templates.find((template) => template.id === id);
