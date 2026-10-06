import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t23/styles.scss";
import { WeddingData } from "@/core/types";
import daisy from "@/static/t23-daisy.jpg";
import daisyField from "@/static/t23-daisy-field.jpg";
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

const Template23 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t23-root">
      <Drifters kind="petal" count={10} color="#ffffff" opacity={0.95} />

      <section className="t23-hero">
        <p className="t23-kicker">Mùa cúc họa mi · chúng mình cưới</p>
        <div className="t23-oval">
          <img src={daisy} alt="" />
        </div>
        <h1>
          {data.groom}
          <i>&amp;</i>
          {data.bride}
        </h1>
        <p className="t23-hero-date">
          {d.day}.{d.month}.{d.year}
        </p>
      </section>

      <div className="t23-gingham" aria-hidden="true" />

      <section className="t23-sec t23-center">
        <Reveal>
          <p className="t23-kicker">Trân trọng kính mời</p>
          <h2 className="t23-title">bạn đến chung vui cùng chúng mình</h2>
        </Reveal>
        <Reveal>
          <div className="t23-fam">
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
          <div className="t23-scallop">
            <img src={photoSrc(data.photos.couple)} alt="" />
          </div>
        </Reveal>
      </section>

      <section className="t23-field">
        <img src={daisyField} alt="" />
      </section>

      <section className="t23-sec t23-center">
        <Reveal>
          <p className="t23-kicker">Ngày chung đôi</p>
          <p className="t23-bigdate">
            {d.day}
            <span>tháng {Number(d.month)}</span>
          </p>
          <p className="t23-muted">
            {d.weekday} · {d.time} · {d.year}
          </p>
        </Reveal>
        <Reveal>
          <div className="t23-count">
            <Countdown iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t23-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t23-card">
            <p className="t23-kicker">Địa điểm</p>
            <h2 className="t23-title">{data.venueName}</h2>
            <p className="t23-muted">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
      </section>

      <div className="t23-gingham" aria-hidden="true" />

      <section className="t23-sec">
        <Reveal>
          <h2 className="t23-title t23-center">Lịch trình</h2>
        </Reveal>
        <ol className="t23-steps">
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

      <section className="t23-sec t23-green">
        <Reveal>
          <h2 className="t23-title t23-center">Khoảnh khắc</h2>
        </Reveal>
        <div className="t23-album">
          {data.album.map((p, i) => (
            <Reveal key={p.key} variant="zoom" delay={i * 120}>
              <div className="t23-scallop">
                <img src={photoSrc(p)} alt="" />
              </div>
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
        <img src={daisyField} alt="" />
        <div>
          <h2>
            Cảm ơn bạn
            <i>
              {data.groom} &amp; {data.bride}
            </i>
          </h2>
        </div>
      </footer>
    </Page>
  );
};

export default Template23;
