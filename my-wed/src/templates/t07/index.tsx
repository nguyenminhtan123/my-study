import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t07/styles.scss";
import { WeddingData } from "@/core/types";
import satin from "@/static/t07-gold-drape.jpg";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Countdown,
  GiftCard,
  RsvpForm,
  VenueActions,
  photoSrc,
} from "@/templates/_kit/sections";

// a thin strip of the real satin photo with a moving sheen, used as a divider
const Ribbon = () => (
  <div className="t07-ribbon" style={{ backgroundImage: `url(${satin})` }} />
);

const Template07 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t07-root">
      <Drifters kind="sparkle" count={8} color="#e8cf8f" opacity={0.6} />

      <section
        className="t07-hero"
        style={{ backgroundImage: `url(${satin})` }}
      >
        <span className="t07-sheen" aria-hidden="true" />
        <div className="t07-arch">
          <p className="t07-small">Thiệp mời cưới</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <span className="t07-rule" />
          <p className="t07-arch-date">
            {d.weekday}
            <br />
            <b>
              {d.day}.{d.month}.{d.year}
            </b>
          </p>
        </div>
      </section>

      <section className="t07-sec t07-center">
        <Reveal>
          <p className="t07-small">Trân trọng kính mời</p>
          <h2 className="t07-title">Đến dự lễ thành hôn của chúng mình</h2>
        </Reveal>
        <Reveal>
          <div className="t07-fam">
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
          <div className="t07-window">
            <img src={photoSrc(data.photos.destiny)} alt="" />
          </div>
        </Reveal>
      </section>

      <Ribbon />

      <section className="t07-sec t07-center">
        <Reveal>
          <p className="t07-small">Save the date</p>
          <p className="t07-bigdate">
            {d.day}
            <span>tháng {d.month}</span>
            {d.year}
          </p>
          <p className="t07-sub">
            {d.weekday} · {d.time}
          </p>
        </Reveal>
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
        <Reveal>
          <div className="t07-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
      </section>

      <Ribbon />

      <section className="t07-sec">
        <Reveal>
          <div className="t07-card">
            <p className="t07-small">Địa điểm</p>
            <h2 className="t07-title">{data.venueName}</h2>
            <p className="t07-sub">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="t07-title t07-center">Chương trình</h2>
        </Reveal>
        <ol className="t07-steps">
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

      <Ribbon />

      <section className="t07-sec">
        <Reveal>
          <h2 className="t07-title t07-center">Khoảnh khắc</h2>
        </Reveal>
        <div className="t07-arches">
          {data.album.map((p, i) => (
            <Reveal key={p.key} variant="zoom" delay={i * 120}>
              <div className="t07-window">
                <img src={photoSrc(p)} alt="" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t07-sec">
        <Reveal>
          <div className="t07-card">
            <RsvpForm data={data} variant="select" title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t07-card">
            <h2 className="t07-title t07-center">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t07-foot" style={{ backgroundImage: `url(${satin})` }}>
        <span className="t07-sheen" aria-hidden="true" />
        <div className="t07-arch t07-arch-sm">
          <p className="t07-small">Thank you</p>
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

export default Template07;
