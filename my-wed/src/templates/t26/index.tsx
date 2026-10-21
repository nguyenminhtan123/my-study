import { useId, useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t26/styles.scss";
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
  photoSrc,
} from "@/templates/_kit/sections";

// "CHỦ NHẬT" -> "Chủ Nhật"
const titleCase = (s: string) =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/**
 * Paper-cut 囍 drawn as shapes (fonts rarely have a good glyph). `half` crops it to one side,
 * so the two door panels each carry half of the character.
 */
const Hy = ({
  tone = "gold",
  half,
  className = "",
}: {
  tone?: "gold" | "red";
  half?: "l" | "r";
  className?: string;
}) => {
  const id = useId().replace(/:/g, "");
  const box = (x: number, y: number, w: number, h: number, t: number) =>
    `M${x} ${y}h${w}v${h}h${-w}Z M${x + t} ${y + t}v${h - 2 * t}h${w - 2 * t}v${-(h - 2 * t)}Z`;
  const side = (ox: number) => (
    <g key={ox} transform={`translate(${ox} 0)`}>
      <rect x="8" y="3" width="34" height="6" />
      <rect x="21.5" y="3" width="7" height="18" />
      <path d={box(10, 25, 30, 18, 6)} fillRule="evenodd" />
      <polygon points="12,46 18.5,46 21.5,53 15,53" />
      <polygon points="31.5,46 38,46 35,53 28.5,53" />
      <path d={box(8, 65, 34, 32, 6)} fillRule="evenodd" />
      <rect x="20" y="77" width="10" height="8" />
    </g>
  );
  return (
    <svg
      className={`t26-hy ${className}`}
      viewBox={half === "l" ? "0 0 50 100" : half === "r" ? "50 0 50 100" : "0 0 100 100"}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          {tone === "gold" ? (
            <>
              <stop offset="0" stopColor="#f6e2a8" />
              <stop offset="0.45" stopColor="#c9a35b" />
              <stop offset="0.7" stopColor="#f1d999" />
              <stop offset="1" stopColor="#a87d36" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#c4303a" />
              <stop offset="1" stopColor="#8e1520" />
            </>
          )}
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`}>
        {side(0)}
        {side(50)}
        <rect x="3" y="15" width="94" height="6" />
        <rect x="1" y="56" width="98" height="6" />
      </g>
    </svg>
  );
};

/** Auspicious cloud scrolls either side of a small diamond, drawn in gold line. */
const Cloud = ({ className = "" }: { className?: string }) => (
  <svg className={`t26-cloud ${className}`} viewBox="0 0 160 28" aria-hidden="true">
    <g fill="none" strokeWidth="1.1" strokeLinecap="round">
      {[1, -1].map((s) => (
        <g key={s} transform={s < 0 ? "translate(160 0) scale(-1 1)" : undefined}>
          <path d="M4 14 H50" />
          <path d="M50 14 c0-7 9-10 14-6 c4 3 2 9-3 9 c-4 0-5-5-2-6" />
          <path d="M66 14 c3 0 5-3 4-6" />
          <path d="M42 14 c2 4 8 6 12 4" />
        </g>
      ))}
      <path d="M80 7 L86 14 L80 21 L74 14 Z" />
    </g>
    <circle cx="80" cy="14" r="1.8" />
  </svg>
);

const Template26 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const [doors, setDoors] = useState<"shut" | "opening" | "gone">("shut");
  const [giftOpen, setGiftOpen] = useState(false);
  const { photos, album } = data;

  const open = () => {
    if (doors !== "shut") return;
    setDoors("opening");
    window.setTimeout(() => setDoors("gone"), 1700);
  };

  return (
    <Page className={`t26-root ${doors === "shut" ? "" : "t26-open"}`}>
      {/* ---------- red doors, tap to open ---------- */}
      {doors !== "gone" && (
        <div
          className={`t26-doors ${doors === "opening" ? "t26-doors-open" : ""}`}
          onClick={open}
        >
          <div className="t26-door t26-door-l">
            <Hy half="l" />
            <span className="t26-ring" />
          </div>
          <div className="t26-door t26-door-r">
            <Hy half="r" />
            <span className="t26-ring" />
          </div>
          <p className="t26-doors-top">Thiệp mời cưới</p>
          <p className="t26-doors-hint">Chạm để mở thiệp</p>
        </div>
      )}

      {/* ---------- cover ---------- */}
      <section className="t26-cover">
        <Cloud className="t26-cover-cloud" />
        <Hy className="t26-cover-hy" />
        <p className="t26-caps t26-cover-caps">Lễ thành hôn</p>
        <h1 className="t26-cover-names">
          <span>{data.groom}</span>
          <i>&amp;</i>
          <span>{data.bride}</span>
        </h1>
        <div className="t26-cover-date">
          <span>{titleCase(d.weekday)}</span>
          <b>
            {d.day} · {d.month} · {d.year}
          </b>
        </div>
        <LunarNote iso={data.weddingISO} className="t26-cover-lunar" />
        <svg className="t26-scallop" viewBox="0 0 100 6" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 6 V3 Q5 -1 10 3 T20 3 T30 3 T40 3 T50 3 T60 3 T70 3 T80 3 T90 3 T100 3 V6 Z" />
        </svg>
      </section>

      {/* ---------- announcement ---------- */}
      <section className="t26-sec t26-invite">
        <Reveal variant="fade">
          <Cloud />
        </Reveal>
        <Reveal>
          <p className="t26-caps">Trân trọng báo tin lễ thành hôn của</p>
        </Reveal>
        <div className="t26-fams">
          <Reveal variant="left">
            <div className="t26-fam">
              <b>Nhà trai</b>
              {data.families.groom.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </Reveal>
          <Hy tone="red" className="t26-fams-hy" />
          <Reveal variant="right">
            <div className="t26-fam">
              <b>Nhà gái</b>
              {data.families.bride.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal variant="zoom">
          <div className="t26-arch">
            <img src={photoSrc(photos.cover)} alt={photos.cover.label} />
          </div>
        </Reveal>

        <Reveal>
          <div className="t26-couple">
            <div>
              <small>Chú rể</small>
              <i>{data.groom}</i>
            </div>
            <span className="t26-couple-and">&amp;</span>
            <div>
              <small>Cô dâu</small>
              <i>{data.bride}</i>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- invitation + date ---------- */}
      <section className="t26-sec t26-when">
        <Reveal>
          <p className="t26-caps">Trân trọng kính mời</p>
          <GuestName className="t26-guest" />
          <p className="t26-lead">
            đến dự bữa tiệc chung vui
            <br />
            cùng gia đình chúng tôi vào lúc
          </p>
        </Reveal>
        <Reveal variant="zoom">
          <div className="t26-date">
            <span>{titleCase(d.weekday)}</span>
            <b>{d.day}</b>
            <span>
              Tháng {Number(d.month)}
              <br />
              {d.year}
            </span>
          </div>
          <p className="t26-time">{d.time.replace(":", " giờ ")}</p>
          <LunarNote iso={data.weddingISO} className="t26-lunar" />
        </Reveal>
        <Reveal>
          <div className="t26-venue">
            <p className="t26-caps">Địa điểm</p>
            <h3>{data.venueName}</h3>
            <p>{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
      </section>

      {/* ---------- programme, calendar, countdown on red ---------- */}
      <section className="t26-red">
        <Reveal>
          <h2 className="t26-title t26-title-gold">Chương trình</h2>
        </Reveal>
        <div className="t26-steps">
          {data.timeline.map((s, i) => (
            <Reveal key={s.time} delay={i * 150}>
              <div className="t26-step">
                <b>{s.time}</b>
                <span>{titleCase(s.label)}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal variant="zoom">
          <div className="t26-calcard">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <p className="t26-caps t26-caps-gold">Chỉ còn</p>
          <Countdown iso={data.weddingISO} />
        </Reveal>
      </section>

      {/* ---------- album ---------- */}
      <section className="t26-sec t26-album-sec">
        <Reveal>
          <h2 className="t26-title">Khoảnh khắc</h2>
          <Cloud />
        </Reveal>
        <Reveal variant="zoom">
          <div className="t26-wide">
            <img src={photoSrc(photos.couple)} alt={photos.couple.label} />
          </div>
        </Reveal>
        <div className="t26-polas">
          {album.map((p, i) => (
            <Reveal key={p.key} variant={i % 2 ? "right" : "left"} delay={(i % 2) * 120}>
              <figure className="t26-pola">
                <img src={photoSrc(p)} alt={p.label} />
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- RSVP + gift ---------- */}
      <section className="t26-sec t26-rsvp">
        <Reveal>
          <div className="t26-frame">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal variant="zoom">
          <button
            type="button"
            className="t26-giftbtn"
            onClick={() => setGiftOpen((v) => !v)}
          >
            <Hy className="t26-giftbtn-hy" />
            {giftOpen ? "Thu gọn" : "Gửi quà mừng cưới"}
          </button>
        </Reveal>
        {giftOpen && (
          <div className="t26-frame t26-gift">
            <GiftCard data={data} />
          </div>
        )}
      </section>

      {/* ---------- thanks ---------- */}
      <footer className="t26-thanks">
        <Reveal variant="zoom">
          <div className="t26-moon">
            <img src={photoSrc(photos.destiny)} alt={photos.destiny.label} />
          </div>
        </Reveal>
        <Reveal>
          <p className="t26-thanks-script">Trân trọng cảm ơn</p>
          <p className="t26-caps t26-caps-gold">
            {data.groom} &amp; {data.bride}
          </p>
          <Hy className="t26-thanks-hy" />
        </Reveal>
      </footer>
    </Page>
  );
};

export default Template26;
