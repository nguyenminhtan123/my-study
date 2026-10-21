import { useEffect, useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t27/styles.scss";
import { WeddingData } from "@/core/types";
import { Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Countdown,
  GiftCard,
  GuestName,
  LunarNote,
  RsvpForm,
  VenueActions,
  photoShape,
  photoSrc,
} from "@/templates/_kit/sections";

// "CHỦ NHẬT" -> "Chủ Nhật"
const titleCase = (s: string) =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

// eucalyptus sprig: round leaves set alternately along a curved stem, shrinking toward the tip
const STEM = { a: [8, 112], c: [92, 104], b: [194, 18] };
const at = (t: number) => {
  const u = 1 - t;
  const x = u * u * STEM.a[0] + 2 * u * t * STEM.c[0] + t * t * STEM.b[0];
  const y = u * u * STEM.a[1] + 2 * u * t * STEM.c[1] + t * t * STEM.b[1];
  const dx = 2 * u * (STEM.c[0] - STEM.a[0]) + 2 * t * (STEM.b[0] - STEM.c[0]);
  const dy = 2 * u * (STEM.c[1] - STEM.a[1]) + 2 * t * (STEM.b[1] - STEM.c[1]);
  const len = Math.hypot(dx, dy);
  return { x, y, nx: -dy / len, ny: dx / len, deg: (Math.atan2(dy, dx) * 180) / Math.PI };
};
const LEAVES = Array.from({ length: 11 }, (_, i) => {
  const t = 0.08 + i * 0.083;
  const p = at(t);
  const side = i % 2 ? 1 : -1;
  const r = 15 * (1 - 0.5 * t);
  return {
    cx: p.x + p.nx * side * r * 0.95,
    cy: p.y + p.ny * side * r * 0.95,
    sx: p.x,
    sy: p.y,
    r,
    deg: p.deg + side * 25,
    tone: i % 3,
  };
});

const Sprig = ({ className = "" }: { className?: string }) => (
  <svg className={`t27-sprig ${className}`} viewBox="0 0 200 124" aria-hidden="true">
    <path
      className="t27-stem"
      d={`M${STEM.a} Q${STEM.c} ${STEM.b}`}
      fill="none"
    />
    {LEAVES.map((l, i) => (
      <g key={i} className={`t27-leaf t27-tone${l.tone}`} style={{ animationDelay: `${i * 70}ms` }}>
        <line x1={l.sx} y1={l.sy} x2={l.cx} y2={l.cy} />
        <ellipse
          cx={l.cx}
          cy={l.cy}
          rx={l.r}
          ry={l.r * 0.82}
          transform={`rotate(${l.deg} ${l.cx} ${l.cy})`}
        />
      </g>
    ))}
  </svg>
);

const initials = (data: WeddingData) =>
  `${data.groom.trim().split(" ").pop()?.charAt(0) ?? ""}${data.bride.trim().split(" ").pop()?.charAt(0) ?? ""}`;

const Template27 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const [open, setOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const { photos, album } = data;

  // the envelope opens by itself if nobody taps it
  useEffect(() => {
    const id = window.setTimeout(() => setOpen(true), 4500);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <Page className="t27-root">
      {/* ---------- cover: envelope with two photos ---------- */}
      <section className={`t27-cover ${open ? "t27-opened" : ""}`}>
        <p className="t27-caps">Save the date</p>
        <div className="t27-env" onClick={() => setOpen(true)}>
          <div className="t27-env-back" />
          <figure className="t27-pola t27-pola-a">
            <img src={photoSrc(photos.cover)} alt={photos.cover.label} />
          </figure>
          <figure className="t27-pola t27-pola-b">
            <img src={photoSrc(photos.destiny)} alt={photos.destiny.label} />
          </figure>
          <div className="t27-env-front" />
          <div className="t27-env-flap" />
          <span className="t27-seal">{initials(data)}</span>
        </div>
        <p className="t27-hint">Chạm để mở thiệp</p>
        <h1 className="t27-cover-names">
          {data.groom}
          <i>&amp;</i>
          {data.bride}
        </h1>
        <p className="t27-cover-date">
          {d.day} . {d.month} . {d.year}
        </p>
        <Sprig className="t27-cover-sprig" />
      </section>

      {/* ---------- invitation ---------- */}
      <section className="t27-sec t27-invite">
        <Reveal>
          <p className="t27-caps">Trân trọng báo tin lễ thành hôn</p>
        </Reveal>
        <div className="t27-fams">
          <Reveal variant="left">
            <div className="t27-fam">
              <b>Nhà trai</b>
              {data.families.groom.map((p) => (
                <span key={p}>{p}</span>
              ))}
              <i>{data.groom}</i>
            </div>
          </Reveal>
          <span className="t27-fams-line" />
          <Reveal variant="right">
            <div className="t27-fam">
              <b>Nhà gái</b>
              {data.families.bride.map((p) => (
                <span key={p}>{p}</span>
              ))}
              <i>{data.bride}</i>
            </div>
          </Reveal>
        </div>
        <Reveal variant="fade">
          <Sprig className="t27-mid-sprig" />
        </Reveal>
        <Reveal>
          <p className="t27-caps">Trân trọng kính mời</p>
          <GuestName className="t27-guest" />
          <p className="t27-lead">
            tới dự buổi tiệc chung vui cùng gia đình chúng tôi
          </p>
        </Reveal>
      </section>

      {/* ---------- date in a sage arch ---------- */}
      <section className="t27-sec t27-when">
        <Reveal variant="zoom">
          <div className="t27-arch">
            <p className="t27-caps">{titleCase(d.weekday)}</p>
            <b className="t27-day">{d.day}</b>
            <p className="t27-month">
              Tháng {Number(d.month)} · {d.year}
            </p>
            <span className="t27-rule" />
            <p className="t27-time">{d.time.replace(":", "h")}</p>
            <LunarNote iso={data.weddingISO} className="t27-lunar" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t27-venue">
            <p className="t27-caps">Địa điểm</p>
            <h3>{data.venueName}</h3>
            <p>{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
      </section>

      {/* ---------- programme ---------- */}
      <section className="t27-sec t27-prog">
        <Reveal>
          <h2 className="t27-title">Chương trình</h2>
        </Reveal>
        <ol className="t27-steps">
          {data.timeline.map((s, i) => (
            <Reveal key={s.time} delay={i * 130}>
              <li>
                <b>{s.time}</b>
                <span>{titleCase(s.label)}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------- calendar + countdown ---------- */}
      <section className="t27-sec t27-cal">
        <Reveal variant="zoom">
          <CalendarCard iso={data.weddingISO} />
        </Reveal>
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
      </section>

      {/* ---------- album ---------- */}
      <section className="t27-sec t27-album-sec">
        <Reveal>
          <h2 className="t27-title">Our moments</h2>
        </Reveal>
        <Reveal variant="zoom">
          <img
            className="t27-wide"
            src={photoSrc(photos.couple)}
            alt={photos.couple.label}
          />
        </Reveal>
        <div className="t27-album">
          {album.map((p, i) => (
            <Reveal
              key={p.key}
              variant="up"
              delay={(i % 2) * 120}
              className={photoShape(p) === "k-land" ? "t27-span" : ""}
            >
              <img src={photoSrc(p)} alt={p.label} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- RSVP + gift ---------- */}
      <section className="t27-sec t27-rsvp">
        <Reveal>
          <div className="t27-card">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal variant="zoom">
          <button
            type="button"
            className="t27-giftbtn"
            onClick={() => setGiftOpen((v) => !v)}
          >
            {giftOpen ? "Thu gọn" : "Hộp mừng cưới"}
          </button>
        </Reveal>
        {giftOpen && (
          <div className="t27-card t27-gift">
            <GiftCard data={data} />
          </div>
        )}
      </section>

      {/* ---------- thanks ---------- */}
      <footer className="t27-thanks">
        <img src={photoSrc(photos.cover)} alt="" />
        <Reveal variant="fade" className="t27-thanks-text">
          <p className="t27-thanks-script">Thank you</p>
          <p className="t27-caps">
            {data.groom} &amp; {data.bride}
          </p>
        </Reveal>
      </footer>
    </Page>
  );
};

export default Template27;
