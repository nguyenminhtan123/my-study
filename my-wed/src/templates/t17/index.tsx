import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t17/styles.scss";
import { WeddingData } from "@/core/types";
import forest from "@/static/t17-autumn-forest.jpg";
import leaves from "@/static/t17-maple-leaves.jpg";
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

const MONTHS = [
  "Tháng Một",
  "Tháng Hai",
  "Tháng Ba",
  "Tháng Tư",
  "Tháng Năm",
  "Tháng Sáu",
  "Tháng Bảy",
  "Tháng Tám",
  "Tháng Chín",
  "Tháng Mười",
  "Tháng Mười Một",
  "Tháng Mười Hai",
];

const Template17 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const monthName = MONTHS[Number(d.month) - 1];

  return (
    <Page className="t17-root">
      <Drifters kind="petal" count={10} color="#c8692f" opacity={0.7} />

      <section className="t17-hero">
        <img src={forest} alt="" />
        <div className="t17-hero-text">
          <p className="t17-kicker">
            Mùa thu năm ấy, chúng mình về chung một nhà
          </p>
          <h1>
            {data.groom}
            <i>và</i>
            {data.bride}
          </h1>
        </div>
        <p className="t17-hero-date">
          {d.day} · {d.month} · {d.year}
        </p>
      </section>

      <section className="t17-paper t17-invite">
        <img className="t17-leaves" src={leaves} alt="" />
        <Reveal>
          <p className="t17-kicker">Trân trọng kính mời</p>
          <h2 className="t17-title">
            Đến dự lễ thành hôn
            <br />
            của chúng mình
          </h2>
        </Reveal>
        <Reveal>
          <div className="t17-fam">
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
          <figure className="t17-portrait">
            <img src={photoSrc(data.photos.cover)} alt="" />
            <figcaption>
              {data.groom} &amp; {data.bride}
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="t17-dark">
        <Reveal>
          <p className="t17-kicker">Save the date</p>
          <div className="t17-big">
            <b>{d.day}</b>
            <div>
              <span>{monthName}</span>
              <span>{d.year}</span>
              <em>
                {d.weekday} · {d.time}
              </em>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
      </section>

      <section className="t17-paper">
        <Reveal>
          <div className="t17-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t17-venue">
            <p className="t17-kicker">Địa điểm</p>
            <h2 className="t17-title">{data.venueName}</h2>
            <p className="t17-muted">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
      </section>

      <section className="t17-band">
        <img src={forest} alt="" />
      </section>

      <section className="t17-paper">
        <Reveal>
          <h2 className="t17-title t17-center">Một ngày của chúng mình</h2>
        </Reveal>
        <ol className="t17-steps">
          {data.timeline.map((s, i) => (
            <Reveal key={s.time} delay={i * 120}>
              <li>
                <em>0{i + 1}</em>
                <b>{s.time}</b>
                <span>{s.label}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="t17-paper t17-album">
        <img className="t17-leaves t17-leaves-l" src={leaves} alt="" />
        <Reveal>
          <h2 className="t17-title t17-center">Kỷ niệm</h2>
        </Reveal>
        <div className="t17-photos">
          {data.album.map((p, i) => (
            <Reveal
              key={p.key}
              variant={i % 2 ? "right" : "left"}
              delay={i * 100}
            >
              <figure>
                <img src={photoSrc(p)} alt="" />
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t17-paper">
        <Reveal>
          <div className="t17-card">
            <RsvpForm data={data} variant="select" title="Hồi đáp" />
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
        <img src={forest} alt="" />
        <div>
          <p className="t17-kicker">Cảm ơn bạn</p>
          <h2>
            {data.groom}
            <i>và</i>
            {data.bride}
          </h2>
        </div>
      </footer>
    </Page>
  );
};

export default Template17;
