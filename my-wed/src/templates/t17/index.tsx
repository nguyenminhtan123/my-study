import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t17/styles.scss";
import { WeddingData } from "@/core/types";
import bouquet from "@/static/t17-bouquet.jpg";
import roses from "@/static/t17-bouquet-roses.jpg";
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

const Template17 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t17-root">
      <Drifters kind="petal" count={12} color="#f2b8ae" opacity={0.75} />

      <section className="t17-hero">
        <img src={bouquet} alt="" />
        <div className="t17-hero-text">
          <p className="t17-small">The bride's bouquet</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <p className="t17-ribbon">
            {d.day} · {d.month} · {d.year}
          </p>
        </div>
      </section>

      <section className="t17-sec t17-center">
        <Reveal>
          <p className="t17-small">Trân trọng kính mời</p>
          <h2 className="t17-title">
            Đến chung vui trong ngày
            <br />
            cô dâu cầm hoa về nhà chồng
          </h2>
        </Reveal>
        <Reveal>
          <Families data={data} className="t17-fam" />
        </Reveal>
        <Reveal variant="zoom">
          <div className="t17-arch">
            <img src={photoSrc(data.photos.cover)} alt="" />
          </div>
        </Reveal>
      </section>

      <section
        className="t17-roses"
        style={{ backgroundImage: `url(${roses})` }}
      >
        <Reveal>
          <div className="t17-glass">
            <p className="t17-small">Save the date</p>
            <p className="t17-bigdate">
              {d.day}
              <span>.</span>
              {d.month}
            </p>
            <p className="t17-muted">
              {d.weekday} · {d.time} · {d.year}
            </p>
            <Countdown iso={data.weddingISO} />
          </div>
        </Reveal>
      </section>

      <section className="t17-sec">
        <Reveal>
          <div className="t17-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t17-card">
            <p className="t17-small">Địa điểm</p>
            <h2 className="t17-title">{data.venueName}</h2>
            <p className="t17-muted">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="t17-title t17-center">Chương trình</h2>
        </Reveal>
        <ol className="t17-steps">
          {data.timeline.map((s, i) => (
            <Reveal
              key={s.time}
              variant={i % 2 ? "right" : "left"}
              delay={i * 120}
            >
              <li>
                <b>{s.time}</b>
                <span>{s.label}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="t17-sec t17-blush">
        <Reveal>
          <h2 className="t17-title t17-center">Khoảnh khắc</h2>
        </Reveal>
        <div className="t17-album">
          {data.album.map((p, i) => (
            <Reveal key={p.key} variant="zoom" delay={i * 120}>
              <img src={photoSrc(p)} alt="" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t17-sec">
        <Reveal>
          <div className="t17-card">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t17-card">
            <h2 className="t17-title t17-center">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t17-foot">
        <img src={bouquet} alt="" />
        <div>
          <p className="t17-small">Thank you</p>
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

export default Template17;
