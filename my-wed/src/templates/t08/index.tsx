import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t08/styles.scss";
import { WeddingData } from "@/core/types";
import sunset from "@/static/t08-wheat-sunset.jpg";
import wheat from "@/static/t08-wheat.jpg";
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

const Template08 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t08-root">
      <Drifters kind="sparkle" count={10} color="#f3d79a" opacity={0.75} />

      <section className="t08-hero">
        <img src={wheat} alt="" />
        <div className="t08-hero-text">
          <p className="t08-small">Mùa lúa chín · chúng mình cưới</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
        </div>
        <p className="t08-hero-date">
          {d.day}
          <span>/</span>
          {d.month}
          <span>/</span>
          {d.year}
        </p>
      </section>

      <section className="t08-sec t08-center">
        <Reveal>
          <p className="t08-small">Trân trọng kính mời</p>
          <h2 className="t08-title">
            Cùng chúng mình đón
            <br />
            buổi chiều đẹp nhất
          </h2>
        </Reveal>
        <Reveal>
          <div className="t08-fam">
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
          <div className="t08-photo">
            <img src={photoSrc(data.photos.cover)} alt="" />
          </div>
        </Reveal>
      </section>

      <section className="t08-sunset">
        <img src={sunset} alt="" />
        <Reveal>
          <div className="t08-sunset-text">
            <p className="t08-small">Save the date</p>
            <p className="t08-bigdate">
              {d.day}.{d.month}
            </p>
            <p className="t08-sub">
              {d.weekday} · {d.time} · {d.year}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="t08-sec">
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
        <Reveal>
          <div className="t08-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t08-card">
            <p className="t08-small">Địa điểm</p>
            <h2 className="t08-title">{data.venueName}</h2>
            <p className="t08-muted">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
      </section>

      <section className="t08-sec">
        <Reveal>
          <h2 className="t08-title t08-center">Lịch trình</h2>
        </Reveal>
        <Reveal variant="fade">
          <ol className="t08-track">
            {data.timeline.map((s) => (
              <li key={s.time}>
                <i />
                <b>{s.time}</b>
                <span>{s.label}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className="t08-sec">
        <Reveal>
          <h2 className="t08-title t08-center">Khoảnh khắc</h2>
        </Reveal>
        <div className="t08-album">
          {data.album.map((p, i) => (
            <Reveal key={p.key} variant="zoom" delay={i * 120}>
              <img src={photoSrc(p)} alt="" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t08-sec">
        <Reveal>
          <div className="t08-card">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t08-card">
            <h2 className="t08-title t08-center">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t08-foot">
        <img src={sunset} alt="" />
        <div>
          <p className="t08-small">Cảm ơn bạn</p>
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

export default Template08;
