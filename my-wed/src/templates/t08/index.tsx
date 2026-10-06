import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t08/styles.scss";
import { WeddingData } from "@/core/types";
import duck from "@/static/t08-mandarin-duck.jpg";
import pair from "@/static/t08-mandarin-painting.jpg";
import { Reveal } from "@/templates/_kit/anim";
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

const Template08 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t08-root">
      <section className="t08-hero">
        <p className="t08-small">Như đôi uyên ương · trọn đời bên nhau</p>
        <figure className="t08-plate">
          <img src={pair} alt="" />
          <figcaption>Pl. I · Aix galericulata</figcaption>
        </figure>
        <h1>
          {data.groom}
          <i>&amp;</i>
          {data.bride}
        </h1>
        <p className="t08-hero-date">
          {d.weekday} · {d.day}.{d.month}.{d.year}
        </p>
      </section>

      <section className="t08-sec t08-center">
        <Reveal>
          <p className="t08-lead">
            Uyên ương chọn một bạn đời và ở bên nhau suốt đời. Chúng mình cũng
            vậy.
          </p>
          <p className="t08-small">
            Trân trọng kính mời bạn đến dự lễ thành hôn
          </p>
        </Reveal>
        <Reveal>
          <Families data={data} className="t08-fam" />
        </Reveal>
        <Reveal variant="zoom">
          <div className="t08-oval">
            <img src={photoSrc(data.photos.couple)} alt="" />
          </div>
        </Reveal>
      </section>

      <section className="t08-pond">
        <img src={duck} alt="" />
        <Reveal>
          <div className="t08-card t08-float">
            <p className="t08-small">Ngày chung đôi</p>
            <p className="t08-bigdate">
              {d.day}
              <em>·</em>
              {d.month}
              <em>·</em>
              {d.year}
            </p>
            <p className="t08-muted">
              {d.weekday} · {d.time}
            </p>
            <Countdown iso={data.weddingISO} />
          </div>
        </Reveal>
      </section>

      <section className="t08-sec">
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
        <Reveal>
          <h2 className="t08-title t08-center">Chương trình</h2>
        </Reveal>
        <ol className="t08-steps">
          {data.timeline.map((s, i) => (
            <Reveal key={s.time} delay={i * 120}>
              <li>
                <em>{["I", "II", "III", "IV"][i] ?? i + 1}</em>
                <b>{s.time}</b>
                <span>{s.label}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="t08-sec">
        <Reveal>
          <h2 className="t08-title t08-center">Khoảnh khắc</h2>
        </Reveal>
        <div className="t08-album">
          {data.album.map((p, i) => (
            <Reveal key={p.key} delay={i * 120}>
              <figure>
                <img src={photoSrc(p)} alt="" />
                <figcaption>
                  Pl. {["II", "III", "IV", "V"][i] ?? i + 2}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t08-sec">
        <Reveal>
          <div className="t08-card">
            <RsvpForm data={data} variant="select" title="Xác nhận tham dự" />
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
        <img src={pair} alt="" />
        <p className="t08-small">Cảm ơn bạn</p>
        <h2>
          {data.groom}
          <i>&amp;</i>
          {data.bride}
        </h2>
      </footer>
    </Page>
  );
};

export default Template08;
