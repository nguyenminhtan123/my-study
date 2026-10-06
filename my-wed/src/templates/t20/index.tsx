import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t20/styles.scss";
import { WeddingData } from "@/core/types";
import cake from "@/static/t20-cake.jpg";
import cakeNight from "@/static/t20-cake-night.jpg";
import { Drifters, Reveal } from "@/templates/_kit/anim";
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

const Template20 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t20-root">
      <Drifters kind="petal" count={9} color="#f2b9bd" opacity={0.7} />

      <section className="t20-hero">
        <div className="t20-cake">
          <img src={cake} alt="" />
        </div>
        <div className="t20-hero-text">
          <p className="t20-small">Sweet beginning</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <p className="t20-hero-date">
            {d.day} · {d.month} · {d.year}
          </p>
        </div>
      </section>

      <section className="t20-sec t20-center">
        <Reveal>
          <p className="t20-small">Trân trọng kính mời</p>
          <h2 className="t20-title">
            Cùng chúng mình cắt
            <br />
            chiếc bánh ngọt ngào nhất
          </h2>
        </Reveal>
        <Reveal>
          <Families data={data} className="t20-fam" />
        </Reveal>
        <Reveal variant="zoom">
          <div className="t20-dome">
            <img src={photoSrc(data.photos.destiny)} alt="" />
          </div>
        </Reveal>
      </section>

      <section className="t20-night">
        <img src={cakeNight} alt="" />
        <Reveal>
          <div className="t20-glass">
            <p className="t20-small">Save the date</p>
            <p className="t20-bigdate">
              {d.day}
              <span>/</span>
              {d.month}
            </p>
            <p className="t20-muted">
              {d.weekday} · {d.time} · {d.year}
            </p>
            <Countdown iso={data.weddingISO} />
          </div>
        </Reveal>
      </section>

      <section className="t20-sec">
        <Reveal>
          <div className="t20-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t20-card">
            <p className="t20-small">Địa điểm</p>
            <h2 className="t20-title">{data.venueName}</h2>
            <p className="t20-muted">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="t20-title t20-center">Chương trình</h2>
        </Reveal>
        {/* the timeline stacked like the tiers of a cake, widest at the bottom */}
        <div className="t20-tiers">
          {data.timeline.map((s, i) => (
            <Reveal key={s.time} variant="zoom" delay={i * 140}>
              <div style={{ width: `${58 + i * 14}%` }}>
                <b>{s.time}</b>
                <span>{s.label}</span>
              </div>
            </Reveal>
          ))}
          <div className="t20-stand" />
        </div>
      </section>

      <section className="t20-sec t20-mint">
        <Reveal>
          <h2 className="t20-title t20-center">Khoảnh khắc</h2>
        </Reveal>
        <div className="t20-album">
          {data.album.map((p, i) => (
            <Reveal key={p.key} variant="zoom" delay={i * 120}>
              <img src={photoSrc(p)} alt="" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t20-sec">
        <Reveal>
          <div className="t20-card">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t20-card">
            <h2 className="t20-title t20-center">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t20-foot">
        <div className="t20-cake t20-cake-sm">
          <img src={cake} alt="" />
        </div>
        <p className="t20-small">Thank you</p>
        <h2>
          {data.groom}
          <i>&amp;</i>
          {data.bride}
        </h2>
      </footer>
    </Page>
  );
};

export default Template20;
