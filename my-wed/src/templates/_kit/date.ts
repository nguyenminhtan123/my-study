const WEEKDAYS = [
  "CHỦ NHẬT",
  "THỨ HAI",
  "THỨ BA",
  "THỨ TƯ",
  "THỨ NĂM",
  "THỨ SÁU",
  "THỨ BẢY",
];

export const dateParts = (iso: string) => {
  const d = new Date(iso);
  const pad = (v: number) => String(v).padStart(2, "0");
  return {
    day: pad(d.getDate()),
    month: pad(d.getMonth() + 1),
    year: String(d.getFullYear()),
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
    weekday: WEEKDAYS[d.getDay()],
  };
};
