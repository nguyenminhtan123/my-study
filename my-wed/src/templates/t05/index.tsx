import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t05/styles.scss";
import { WeddingData } from "@/core/types";
import lagoon from "@/static/t05-lagoon.jpg";
import water from "@/static/t05-water.jpg";
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

const Template05 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t05-root">
      <Drifters kind="bubble" count={10} color="#ffffff" opacity={0.6} />

      <section className="t05-hero">
        <img src={lagoon} alt="" />
        <div className="t05-hero-text">
          <p className="t05-small">Biển gọi tên chúng mình</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <p className="t05-pill">
            {d.day} · {d.month} · {d.year}
          </p>
        </div>
      </section>

      <section className="t05-sec t05-center">
        <Reveal>
          <p className="t05-small">Trân trọng kính mời</p>
          <h2 className="t05-title">
            Đến chung vui trong ngày cưới của chúng mình
          </h2>
        </Reveal>
        <Reveal>
          <div className="t05-fam">
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
          <div className="t05-pebble">
            <img src={photoSrc(data.photos.couple)} alt="" />
          </div>
        </Reveal>
      </section>

      <section
        className="t05-water"
        style={{ backgroundImage: `url(${water})` }}
      >
        <Reveal>
          <div className="t05-glass">
            <p className="t05-small">Save the date</p>
            <p className="t05-bigdate">
              {d.day}
              <span>/</span>
              {d.month}
            </p>
            <p className="t05-sub">
              {d.weekday} · {d.time} · {d.year}
            </p>
            <Countdown iso={data.weddingISO} />
          </div>
        </Reveal>
      </section>

      <section className="t05-sec">
        <Reveal>
          <div className="t05-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t05-card">
            <p className="t05-small">Địa điểm</p>
            <h2 className="t05-title">{data.venueName}</h2>
            <p className="t05-sub">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
      </section>

      <section className="t05-sec t05-sand">
        <Reveal>
          <h2 className="t05-title t05-center">Lịch trình</h2>
        </Reveal>
        <ol className="t05-tide">
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

      <section className="t05-sec">
        <Reveal>
          <h2 className="t05-title t05-center">Khoảnh khắc</h2>
        </Reveal>
        <div className="t05-album">
          {data.album.map((p, i) => (
            <Reveal key={p.key} variant="zoom" delay={i * 120}>
              <img src={photoSrc(p)} alt="" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t05-sec">
        <Reveal>
          <div className="t05-card">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t05-card">
            <h2 className="t05-title t05-center">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t05-foot" style={{ backgroundImage: `url(${water})` }}>
        <p className="t05-small">Hẹn gặp bạn bên biển</p>
        <h2>
          {data.groom}
          <i>&amp;</i>
          {data.bride}
        </h2>
      </footer>
    </Page>
  );
};

export default Template05;
