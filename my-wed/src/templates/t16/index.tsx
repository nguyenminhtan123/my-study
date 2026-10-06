import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t16/styles.scss";
import { WeddingData } from "@/core/types";
import rows from "@/static/t16-lavender-rows.jpg";
import sprig from "@/static/t16-lavender-sprig.jpg";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Countdown,
  Dresscode,
  GiftCard,
  Mosaic,
  RsvpForm,
  VenueActions,
  WindingTimeline,
  photoSrc,
} from "@/templates/_kit/sections";

// a strip of the real lavender photo used as a divider
const Sprig = () => (
  <Reveal variant="fade">
    <div className="t16-sprig" style={{ backgroundImage: `url(${sprig})` }} />
  </Reveal>
);

const Template16 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t16-root">
      <Drifters kind="petal" count={12} color="#a98fcf" opacity={0.55} />

      <section className="t16-hero">
        <img src={rows} alt="" />
        <div className="t16-hero-text">
          <p className="t16-kicker">We are getting married</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <p className="t16-hero-date">
            {d.day}.{d.month}.{d.year}
          </p>
        </div>
      </section>

      <section className="t16-sec t16-invite">
        <Reveal>
          <p className="t16-kicker">Trân trọng kính mời</p>
          <h2 className="t16-title">
            Lễ thành hôn <i>của chúng mình</i>
          </h2>
        </Reveal>
        <Reveal>
          <div className="t16-fam">
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
        <Sprig />
      </section>

      <section className="t16-sec t16-date">
        <Reveal variant="left">
          <div className="t16-arch">
            <img src={photoSrc(data.photos.destiny)} alt="" />
          </div>
        </Reveal>
        <Reveal variant="right">
          <div className="t16-stack">
            <p className="t16-kicker">Save the date</p>
            <b>{d.day}</b>
            <b>{d.month}</b>
            <b>{d.year}</b>
            <span>
              {d.weekday}
              <br />
              {d.time}
            </span>
          </div>
        </Reveal>
      </section>

      <section className="t16-sec t16-count">
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
        <Reveal>
          <div className="t16-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
      </section>

      <section className="t16-field">
        <img src={rows} alt="" />
        <Reveal>
          <div className="t16-card t16-venue">
            <p className="t16-kicker">Địa điểm</p>
            <h2 className="t16-title">{data.venueName}</h2>
            <p className="t16-muted">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
      </section>

      <section className="t16-sec">
        <Reveal>
          <h2 className="t16-title t16-center">
            <i>Lịch trình</i> ngày vui
          </h2>
        </Reveal>
        <WindingTimeline steps={data.timeline} />
        <Reveal>
          <p className="t16-kicker t16-center">Dress code</p>
        </Reveal>
        <Dresscode colors={data.dressColors} />
      </section>

      <section className="t16-sec t16-album">
        <Reveal>
          <h2 className="t16-title t16-center">
            <i>Khoảnh khắc</i>
          </h2>
        </Reveal>
        <Mosaic photos={data.album} />
        <Sprig />
      </section>

      <section className="t16-sec">
        <Reveal>
          <div className="t16-card">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t16-card">
            <h2 className="t16-title t16-center">
              <i>Mừng cưới</i>
            </h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t16-foot">
        <img src={rows} alt="" />
        <div>
          <p className="t16-kicker">Thank you</p>
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

export default Template16;
