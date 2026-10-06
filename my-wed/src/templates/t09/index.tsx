import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t09/styles.scss";
import { WeddingData } from "@/core/types";
import blue from "@/static/t09-hydrangea-blue2.jpg";
import purple from "@/static/t09-hydrangea-purple.jpg";
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

const Template09 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t09-root">
      <Drifters kind="petal" count={12} color="#b7a9e6" opacity={0.7} />

      <section className="t09-hero">
        <img src={blue} alt="" />
        <div className="t09-bloom">
          <p className="t09-small">We're getting married</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <p className="t09-bloom-date">
            {d.day} · {d.month} · {d.year}
          </p>
        </div>
      </section>

      <section className="t09-sec t09-center">
        <Reveal>
          <p className="t09-small">Trân trọng kính mời</p>
          <h2 className="t09-title">Đến dự lễ thành hôn của chúng mình</h2>
        </Reveal>
        <Reveal>
          <div className="t09-fam">
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
        </Reveal>
        <Reveal variant="zoom">
          <div className="t09-circle">
            <img src={photoSrc(data.photos.cover)} alt="" />
          </div>
        </Reveal>
      </section>

      <section
        className="t09-carpet"
        style={{ backgroundImage: `url(${purple})` }}
      >
        <Reveal>
          <div className="t09-glass">
            <p className="t09-small">Save the date</p>
            <p className="t09-bigdate">
              {d.day}
              <span>/</span>
              {d.month}
              <span>/</span>
              {d.year.slice(2)}
            </p>
            <p className="t09-sub">
              {d.weekday} · {d.time}
            </p>
            <Countdown iso={data.weddingISO} />
          </div>
        </Reveal>
      </section>

      <section className="t09-sec">
        <Reveal>
          <div className="t09-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t09-card">
            <p className="t09-small">Địa điểm</p>
            <h2 className="t09-title">{data.venueName}</h2>
            <p className="t09-sub">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="t09-title t09-center">Chương trình</h2>
        </Reveal>
        <div className="t09-steps">
          {data.timeline.map((s, i) => (
            <Reveal key={s.time} variant="zoom" delay={i * 120}>
              <div>
                <b>{s.time}</b>
                <span>{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t09-sec t09-mist">
        <Reveal>
          <h2 className="t09-title t09-center">Khoảnh khắc</h2>
        </Reveal>
        <div className="t09-bubbles k-album">
          {data.album.map((p, i) => (
            <Reveal
              key={p.key}
              variant="zoom"
              delay={i * 140}
              className={photoShape(p)}
            >
              <div className="t09-circle">
                <img src={photoSrc(p)} alt="" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t09-sec">
        <Reveal>
          <div className="t09-card">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t09-card">
            <h2 className="t09-title t09-center">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t09-foot" style={{ backgroundImage: `url(${blue})` }}>
        <div className="t09-bloom t09-bloom-sm">
          <p className="t09-small">Thank you</p>
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

export default Template09;
