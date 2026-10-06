import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t23/styles.scss";
import { WeddingData } from "@/core/types";
import gown from "@/static/t23-gown.jpg";
import lace from "@/static/t23-lace.jpg";
import veil from "@/static/t23-veil.jpg";
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

// a strip of the real lace photo used as a divider
const Lace = () => (
  <div className="t23-lace" style={{ backgroundImage: `url(${lace})` }} />
);

const Template23 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t23-root">
      <Drifters kind="petal" count={9} color="#ffffff" opacity={0.9} />

      <section className="t23-hero">
        <img src={gown} alt="" />
        {/* a sheer white veil over the cover that lifts away on load */}
        <span className="t23-sheer" aria-hidden="true" />
        <div className="t23-hero-text">
          <p className="t23-small">The bride</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <p className="t23-hero-date">
            {d.day} · {d.month} · {d.year}
          </p>
        </div>
      </section>

      <section className="t23-sec t23-center">
        <Reveal>
          <p className="t23-small">Trân trọng kính mời</p>
          <h2 className="t23-title">
            Ngày em khoác voan trắng,
            <br />
            mong có bạn ở đó
          </h2>
        </Reveal>
        <Reveal>
          <Families data={data} className="t23-fam" />
        </Reveal>
        <Reveal variant="zoom">
          <div className="t23-portrait">
            <img src={photoSrc(data.photos.cover)} alt="" />
          </div>
        </Reveal>
      </section>

      <Lace />

      <section className="t23-sec t23-center">
        <Reveal>
          <p className="t23-small">Save the date</p>
          <p className="t23-bigdate">
            {d.day}
            <span>tháng {d.month}</span>
            {d.year}
          </p>
          <p className="t23-muted">
            {d.weekday} · {d.time}
          </p>
        </Reveal>
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
        <Reveal>
          <div className="t23-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
      </section>

      <Lace />

      <section className="t23-sec">
        <Reveal>
          <div className="t23-card">
            <p className="t23-small">Địa điểm</p>
            <h2 className="t23-title">{data.venueName}</h2>
            <p className="t23-muted">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="t23-title t23-center">Chương trình</h2>
        </Reveal>
        <ol className="t23-steps">
          {data.timeline.map((s, i) => (
            <Reveal key={s.time} delay={i * 120}>
              <li>
                <b>{s.time}</b>
                <span>{s.label}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="t23-sec">
        <Reveal>
          <h2 className="t23-title t23-center">Khoảnh khắc</h2>
        </Reveal>
        <div className="t23-album">
          {data.album.map((p, i) => (
            <Reveal key={p.key} variant="fade" delay={i * 160}>
              <figure>
                <img src={photoSrc(p)} alt="" />
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t23-sec">
        <Reveal>
          <div className="t23-card">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t23-card">
            <h2 className="t23-title t23-center">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t23-foot">
        <img src={veil} alt="" />
        <div>
          <p className="t23-small">Thank you</p>
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

export default Template23;
