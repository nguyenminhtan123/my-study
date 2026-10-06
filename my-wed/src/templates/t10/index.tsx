import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t10/styles.scss";
import { WeddingData } from "@/core/types";
import ringsBox from "@/static/t10-rings-box.jpg";
import ringsGold from "@/static/t10-rings-gold.jpg";
import { Drifters, Reveal } from "@/templates/_kit/anim";
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

const Template10 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t10-root">
      <Drifters kind="sparkle" count={8} color="#d8bd84" opacity={0.65} />

      <section className="t10-hero">
        <div className="t10-iris">
          <img src={ringsBox} alt="" />
        </div>
        <div className="t10-hero-text">
          <p className="t10-small">Hai chiếc nhẫn · một lời hứa</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <p className="t10-hero-date">
            {d.day}.{d.month}.{d.year}
          </p>
        </div>
      </section>

      <section className="t10-sec t10-center">
        <Reveal>
          <p className="t10-small">Trân trọng kính mời</p>
          <h2 className="t10-title">
            Chứng kiến khoảnh khắc
            <br />
            chúng mình trao nhẫn
          </h2>
        </Reveal>
        <Reveal>
          <Families data={data} className="t10-fam" />
        </Reveal>
        <Reveal variant="zoom">
          <div className="t10-portrait">
            <img src={photoSrc(data.photos.destiny)} alt="" />
          </div>
        </Reveal>
      </section>

      <section
        className="t10-dark"
        style={{ backgroundImage: `url(${ringsGold})` }}
      >
        <Reveal>
          <div className="t10-rings" aria-label="Ngày cưới">
            <span className="t10-ring t10-ring-l" />
            <span className="t10-ring t10-ring-r" />
            <div className="t10-rings-text">
              <b>{d.day}</b>
              <span>tháng {d.month}</span>
              <b>{d.year}</b>
            </div>
          </div>
          <p className="t10-sub">
            {d.weekday} · {d.time}
          </p>
        </Reveal>
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
      </section>

      <section className="t10-sec">
        <Reveal>
          <div className="t10-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t10-card">
            <p className="t10-small">Địa điểm</p>
            <h2 className="t10-title">{data.venueName}</h2>
            <p className="t10-muted">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="t10-title t10-center">Chương trình</h2>
        </Reveal>
        <ol className="t10-steps">
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

      <section className="t10-sec">
        <Reveal>
          <h2 className="t10-title t10-center">Khoảnh khắc</h2>
        </Reveal>
        <div className="t10-album k-album">
          {data.album.map((p, i) => (
            <Reveal
              key={p.key}
              variant="zoom"
              delay={i * 120}
              className={photoShape(p)}
            >
              <div className="t10-ringframe">
                <img src={photoSrc(p)} alt="" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t10-sec">
        <Reveal>
          <div className="t10-card">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t10-card">
            <h2 className="t10-title t10-center">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t10-foot">
        <div className="t10-iris t10-iris-sm">
          <img src={ringsBox} alt="" />
        </div>
        <p className="t10-small">With love</p>
        <h2>
          {data.groom}
          <i>&amp;</i>
          {data.bride}
        </h2>
      </footer>
    </Page>
  );
};

export default Template10;
