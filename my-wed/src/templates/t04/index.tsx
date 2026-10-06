import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t04/styles.scss";
import { WeddingData } from "@/core/types";
import rose from "@/static/t04-rose.jpg";
import wine from "@/static/t04-wine.jpg";
import { Reveal } from "@/templates/_kit/anim";
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

const Template04 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t04-root">
      <section className="t04-hero">
        <img src={wine} alt="" />
        <div className="t04-hero-text">
          <p className="t04-small">A toast to forever</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <span className="t04-line" />
          <p className="t04-hero-date">
            {d.day} · {d.month} · {d.year}
          </p>
        </div>
      </section>

      <section className="t04-sec t04-center">
        <Reveal>
          <p className="t04-small">Trân trọng kính mời</p>
          <h2 className="t04-title">
            Đến dự buổi tiệc
            <br />
            mừng lễ thành hôn
          </h2>
        </Reveal>
        <Reveal>
          <div className="t04-fam">
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
          <div className="t04-portrait">
            <img src={photoSrc(data.photos.destiny)} alt="" />
          </div>
        </Reveal>
      </section>

      <section className="t04-sec t04-rose-sec">
        <Reveal variant="zoom">
          <div className="t04-rose">
            <img src={rose} alt="" />
          </div>
        </Reveal>
        <Reveal>
          <p className="t04-small t04-center">Save the date</p>
          <p className="t04-bigdate">
            <span>{d.day}</span>
            <em>tháng {Number(d.month)}</em>
            <span>{d.year}</span>
          </p>
          <p className="t04-sub t04-center">
            {d.weekday} · {d.time}
          </p>
        </Reveal>
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
      </section>

      <section className="t04-sec">
        <Reveal>
          <div className="t04-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t04-card">
            <p className="t04-small">Địa điểm</p>
            <h2 className="t04-title">{data.venueName}</h2>
            <p className="t04-sub">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="t04-title t04-center">Chương trình</h2>
        </Reveal>
        <ol className="t04-steps">
          {data.timeline.map((s, i) => (
            <Reveal key={s.time} delay={i * 120}>
              <li>
                <b>{s.time}</b>
                <span>{s.label}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="t04-sec">
        <Reveal>
          <h2 className="t04-title t04-center">Khoảnh khắc</h2>
        </Reveal>
        <div className="t04-album k-album">
          {data.album.map((p, i) => (
            <Reveal
              key={p.key}
              variant={i % 2 ? "right" : "left"}
              delay={i * 100}
              className={photoShape(p)}
            >
              <img src={photoSrc(p)} alt="" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t04-sec">
        <Reveal>
          <div className="t04-card">
            <RsvpForm data={data} variant="select" title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t04-card">
            <h2 className="t04-title t04-center">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t04-foot">
        <img src={rose} alt="" />
        <div>
          <p className="t04-small">With love</p>
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

export default Template04;
