import { CSSProperties } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t19/styles.scss";
import { WeddingData } from "@/core/types";
import candles from "@/static/t19-candles.jpg";
import reception from "@/static/t19-reception.jpg";
import { Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Countdown,
  Families,
  GiftCard,
  RsvpForm,
  VenueActions,
  photoSrc,
} from "@/templates/_kit/sections";

// a string of warm fairy lights hanging in a gentle curve (fixed positions)
const BULBS = Array.from({ length: 13 }, (_, i) => ({
  left: 4 + i * 7.6,
  top: 10 + Math.sin((i / 12) * Math.PI) * 26,
  delay: (i * 0.37) % 2.2,
}));
const Lights = () => (
  <div className="t19-lights" aria-hidden="true">
    {BULBS.map((b, i) => (
      <i
        key={i}
        style={
          {
            left: `${b.left}%`,
            top: b.top,
            animationDelay: `${b.delay}s`,
          } as CSSProperties
        }
      />
    ))}
  </div>
);

const Template19 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t19-root">
      <section className="t19-hero">
        <img src={reception} alt="" />
        <Lights />
        <div className="t19-hero-text">
          <p className="t19-small">Mời bạn đến dự tiệc cưới</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <p className="t19-hero-date">
            {d.day} · {d.month} · {d.year}
          </p>
        </div>
      </section>

      <section className="t19-sec t19-center">
        <Reveal>
          <p className="t19-small">Trân trọng kính mời</p>
          <h2 className="t19-title">
            Một bàn tiệc, những ngọn nến
            <br />
            và bạn ở đó cùng chúng mình
          </h2>
        </Reveal>
        <Reveal>
          <Families data={data} className="t19-fam" />
        </Reveal>
        <Reveal variant="zoom">
          <div className="t19-frame">
            <img src={photoSrc(data.photos.couple)} alt="" />
          </div>
        </Reveal>
      </section>

      <section className="t19-candles">
        <img src={candles} alt="" />
        <Reveal>
          <div className="t19-glass">
            <p className="t19-small">Save the date</p>
            <p className="t19-bigdate">
              {d.day}.{d.month}
            </p>
            <p className="t19-sub">
              {d.weekday} · {d.time} · {d.year}
            </p>
            <Countdown iso={data.weddingISO} />
          </div>
        </Reveal>
      </section>

      <section className="t19-sec">
        <Reveal>
          <div className="t19-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t19-card">
            <p className="t19-small">Địa điểm</p>
            <h2 className="t19-title">{data.venueName}</h2>
            <p className="t19-sub">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="t19-title t19-center">Thực đơn buổi tối</h2>
        </Reveal>
        <Reveal>
          <ol className="t19-menu">
            {data.timeline.map((s) => (
              <li key={s.time}>
                <span>{s.label}</span>
                <i />
                <b>{s.time}</b>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className="t19-sec">
        <Reveal>
          <h2 className="t19-title t19-center">Khoảnh khắc</h2>
        </Reveal>
        <div className="t19-album">
          {data.album.map((p, i) => (
            <Reveal key={p.key} variant="zoom" delay={i * 120}>
              <img src={photoSrc(p)} alt="" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t19-sec">
        <Reveal>
          <div className="t19-card">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t19-card">
            <h2 className="t19-title t19-center">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t19-foot">
        <img src={reception} alt="" />
        <Lights />
        <div>
          <p className="t19-small">Hẹn gặp bạn ở bữa tiệc</p>
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

export default Template19;
