import { CSSProperties } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t24/styles.scss";
import { WeddingData } from "@/core/types";
import petalsPink from "@/static/t24-petals-pink.jpg";
import petals from "@/static/t24-petals.jpg";
import { Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Countdown,
  Families,
  GiftCard,
  RsvpForm,
  VenueActions,
  photoShape,
  photoSrc,
} from "@/templates/_kit/sections";

// a shower of real-looking petals falling over the whole page (fixed, deterministic)
const SHOWER = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 41 + 7) % 100,
  size: 12 + ((i * 7) % 14),
  dur: 7 + ((i * 5) % 7),
  delay: -((i * 1.7) % 12),
  sway: ((i % 2) * 2 - 1) * (20 + ((i * 13) % 40)),
  tone: i % 3,
}));

const Template24 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t24-root">
      <div className="t24-shower" aria-hidden="true">
        {SHOWER.map((p, i) => (
          <i
            key={i}
            className={`t24-p${p.tone}`}
            style={
              {
                left: `${p.left}%`,
                width: p.size,
                height: p.size * 0.8,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
                "--sway": `${p.sway}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <section
        className="t24-hero"
        style={{ backgroundImage: `url(${petals})` }}
      >
        <div className="t24-circle">
          <p className="t24-small">Tung hoa cùng chúng mình</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <p className="t24-hero-date">
            {d.day}.{d.month}.{d.year}
          </p>
        </div>
      </section>

      <section className="t24-sec t24-center">
        <Reveal>
          <p className="t24-small">Trân trọng kính mời</p>
          <h2 className="t24-title">
            Đến chung vui và tiễn
            <br />
            chúng mình bằng mưa cánh hoa
          </h2>
        </Reveal>
        <Reveal>
          <Families data={data} className="t24-fam" />
        </Reveal>
        <Reveal variant="zoom">
          <div className="t24-photo">
            <img src={photoSrc(data.photos.couple)} alt="" />
          </div>
        </Reveal>
      </section>

      <section
        className="t24-band"
        style={{ backgroundImage: `url(${petalsPink})` }}
      >
        <Reveal>
          <div className="t24-card">
            <p className="t24-small">Save the date</p>
            <p className="t24-bigdate">
              {d.day}
              <span>/</span>
              {d.month}
            </p>
            <p className="t24-muted">
              {d.weekday} · {d.time} · {d.year}
            </p>
            <Countdown iso={data.weddingISO} />
          </div>
        </Reveal>
      </section>

      <section className="t24-sec">
        <Reveal>
          <div className="t24-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t24-card">
            <p className="t24-small">Địa điểm</p>
            <h2 className="t24-title">{data.venueName}</h2>
            <p className="t24-muted">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="t24-title t24-center">Chương trình</h2>
        </Reveal>
        <ol className="t24-steps">
          {data.timeline.map((s, i) => (
            <Reveal key={s.time} variant="zoom" delay={i * 120}>
              <li>
                <b>{s.time}</b>
                <span>{s.label}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="t24-sec">
        <Reveal>
          <h2 className="t24-title t24-center">Khoảnh khắc</h2>
        </Reveal>
        <div className="t24-album k-album">
          {data.album.map((p, i) => (
            <Reveal
              key={p.key}
              variant="zoom"
              delay={i * 120}
              className={photoShape(p)}
            >
              <img src={photoSrc(p)} alt="" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t24-sec">
        <Reveal>
          <div className="t24-card">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t24-card">
            <h2 className="t24-title t24-center">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer
        className="t24-hero t24-foot"
        style={{ backgroundImage: `url(${petals})` }}
      >
        <div className="t24-circle">
          <p className="t24-small">Cảm ơn bạn</p>
          <h2>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h2>
        </div>
      </footer>
    </Page>
  );
};

export default Template24;
