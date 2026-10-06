import { CSSProperties } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t19/styles.scss";
import { WeddingData } from "@/core/types";
import milkyWay from "@/static/t19-milky-way.jpg";
import nightTrees from "@/static/t19-night-trees.jpg";
import { Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Countdown,
  GiftCard,
  Mosaic,
  RsvpForm,
  VenueActions,
  photoSrc,
} from "@/templates/_kit/sections";

// twinkling stars over the whole page (fixed, deterministic positions)
const STARS = Array.from({ length: 46 }, (_, i) => ({
  left: (i * 47 + 13) % 100,
  top: (i * 71 + 7) % 100,
  size: 1 + (i % 3),
  delay: (i * 0.37) % 4,
  dur: 2.4 + ((i * 0.61) % 3),
}));

const Template19 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t19-root">
      <div className="t19-stars" aria-hidden="true">
        {STARS.map((s, i) => (
          <i
            key={i}
            style={
              {
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.dur}s`,
              } as CSSProperties
            }
          />
        ))}
        <b className="t19-shoot" />
      </div>

      <section className="t19-hero">
        <img src={milkyWay} alt="" />
        <div className="t19-hero-text">
          <p className="t19-kicker">Under the same stars</p>
          <h1>
            {data.groom}
            <span>&amp;</span>
            {data.bride}
          </h1>
          <p className="t19-hero-date">
            {d.day} . {d.month} . {d.year}
          </p>
        </div>
      </section>

      <section className="t19-sec">
        <Reveal>
          <p className="t19-quote">
            “Giữa hàng tỉ vì sao, chúng mình đã tìm thấy nhau.”
          </p>
        </Reveal>
        <Reveal>
          <div className="t19-glass t19-invite">
            <p className="t19-kicker">Trân trọng kính mời</p>
            <h2 className="t19-title">Lễ thành hôn</h2>
            <div className="t19-fam">
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
          </div>
        </Reveal>
        <Reveal variant="zoom">
          <div className="t19-orbit">
            <img src={photoSrc(data.photos.cover)} alt="" />
          </div>
        </Reveal>
      </section>

      <section className="t19-sec t19-center">
        <Reveal>
          <p className="t19-kicker">Đếm ngược đến ngày</p>
          <p className="t19-bigdate">
            {d.day}
            <em>/</em>
            {d.month}
          </p>
          <p className="t19-sub">
            {d.weekday} · {d.time} · {d.year}
          </p>
        </Reveal>
        <Reveal>
          <div className="t19-glass">
            <Countdown iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t19-glass">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
      </section>

      <section className="t19-sec">
        <Reveal>
          <div className="t19-glass t19-center">
            <p className="t19-kicker">Địa điểm</p>
            <h2 className="t19-title">{data.venueName}</h2>
            <p className="t19-sub">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="t19-title t19-center">Lịch trình</h2>
        </Reveal>
        <ol className="t19-steps">
          {data.timeline.map((s, i) => (
            <Reveal key={s.time} delay={i * 140}>
              <li>
                <i />
                <b>{s.time}</b>
                <span>{s.label}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="t19-sec t19-album">
        <Reveal>
          <h2 className="t19-title t19-center">Khoảnh khắc</h2>
        </Reveal>
        <Mosaic photos={data.album} />
      </section>

      <section className="t19-sec">
        <Reveal>
          <div className="t19-glass">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t19-glass">
            <h2 className="t19-title t19-center">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t19-foot">
        <img src={nightTrees} alt="" />
        <div>
          <p className="t19-kicker">Thank you</p>
          <h2>
            {data.groom}
            <span>&amp;</span>
            {data.bride}
          </h2>
        </div>
      </footer>
    </Page>
  );
};

export default Template19;
