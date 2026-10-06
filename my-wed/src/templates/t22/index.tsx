import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t22/styles.scss";
import { WeddingData } from "@/core/types";
import bokeh from "@/static/t22-gold-bokeh.jpg";
import champagne from "@/static/t22-champagne.jpg";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Countdown,
  GiftCard,
  RsvpForm,
  VenueActions,
  photoShape,
  photoSrc,
} from "@/templates/_kit/sections";

const Rule = () => (
  <div className="t22-rule" aria-hidden="true">
    <i />
  </div>
);

const Template22 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t22-root">
      <Drifters kind="bubble" count={14} color="#e9cf98" opacity={0.45} />

      <section className="t22-hero">
        <img src={champagne} alt="" />
        <div className="t22-hero-text">
          <p className="t22-kicker">Cheers to love</p>
          <h1>
            {data.groom}
            <span>&amp;</span>
            {data.bride}
          </h1>
          <Rule />
          <p className="t22-hero-date">
            {d.day} · {d.month} · {d.year}
          </p>
        </div>
      </section>

      <section className="t22-sec">
        <Reveal>
          <div className="t22-deco">
            <p className="t22-kicker">Trân trọng kính mời</p>
            <h2 className="t22-title">Quý khách đến dự tiệc cưới</h2>
            <Rule />
            <div className="t22-fam">
              <div>
                <b>Nhà trai</b>
                {data.families.groom.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </div>
              <div>
                <b>Nhà gái</b>
                {data.families.bride.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal variant="zoom">
          <div className="t22-portrait">
            <img src={photoSrc(data.photos.destiny)} alt="" />
          </div>
        </Reveal>
      </section>

      <section
        className="t22-bokeh"
        style={{ backgroundImage: `url(${bokeh})` }}
      >
        <Reveal>
          <p className="t22-kicker">Save the date</p>
          <p className="t22-bigdate">
            {d.day}
            <span>.</span>
            {d.month}
            <span>.</span>
            {d.year.slice(2)}
          </p>
          <p className="t22-sub">
            {d.weekday} · {d.time}
          </p>
        </Reveal>
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
      </section>

      <section className="t22-sec">
        <Reveal>
          <div className="t22-deco">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t22-deco">
            <p className="t22-kicker">Địa điểm</p>
            <h2 className="t22-title">{data.venueName}</h2>
            <p className="t22-sub">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="t22-title t22-center">Chương trình</h2>
          <Rule />
        </Reveal>
        <ol className="t22-steps">
          {data.timeline.map((s, i) => (
            <Reveal key={s.time} delay={i * 120}>
              <li>
                <b>{s.time}</b>
                <i />
                <span>{s.label}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="t22-sec">
        <Reveal>
          <h2 className="t22-title t22-center">Khoảnh khắc</h2>
          <Rule />
        </Reveal>
        <div className="t22-gallery k-album">
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

      <section className="t22-sec">
        <Reveal>
          <div className="t22-deco">
            <RsvpForm data={data} title="R.S.V.P" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t22-deco">
            <h2 className="t22-title">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t22-foot" style={{ backgroundImage: `url(${bokeh})` }}>
        <p className="t22-kicker">With love &amp; gratitude</p>
        <h2>
          {data.groom}
          <span>&amp;</span>
          {data.bride}
        </h2>
        <Rule />
      </footer>
    </Page>
  );
};

export default Template22;
