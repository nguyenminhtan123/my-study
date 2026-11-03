import { useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t03/styles.scss";
import { WeddingData } from "@/core/types";
import cloth from "@/static/t03/cloth.webp";
import leaf from "@/static/t03/leaf.webp";
import trayEnd from "@/static/t03/tray-end.webp";
import tray from "@/static/t03/tray.webp";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Countdown,
  Families,
  GiftCard,
  GuestName,
  LunarNote,
  RsvpForm,
  VenueActions,
  photoShape,
  photoSrc,
} from "@/templates/_kit/sections";

/** Two small betel leaves above a section title, like the leaves round a betel quid. */
const Leaves = () => (
  <span className="t03-orn" aria-hidden="true">
    <img src={leaf} alt="" />
    <img src={leaf} alt="" />
  </span>
);

/** 囍, drawn in clean block strokes so it looks the same, and sharp, on every phone (fonts differ). */
const Hy = () => (
  <svg className="t03-hy-glyph" viewBox="0 0 96 80" aria-label="囍" role="img">
    <path d="M2 0H42V6H2Z M19.5 6H24.5V14H19.5Z M8 14H36V19H8Z M10 24H34V29H10Z M10 33H34V38H10Z M10 24H15V38H10Z M29 24H34V38H29Z M12 42H17V47H12Z M27 42H32V47H27Z M8 58H36V63H8Z M8 75H36V80H8Z M8 58H13V80H8Z M31 58H36V80H31Z M54 0H94V6H54Z M71.5 6H76.5V14H71.5Z M60 14H88V19H60Z M62 24H86V29H62Z M62 33H86V38H62Z M62 24H67V38H62Z M81 24H86V38H81Z M64 42H69V47H64Z M79 42H84V47H79Z M60 58H88V63H60Z M60 75H88V80H60Z M60 58H65V80H60Z M83 58H88V80H83Z M0 48H96V53H0Z" />
  </svg>
);

const Template03 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  // the betel tray waits under its red cloth, as at a real betrothal, until the guest lifts it
  const [cover, setCover] = useState<"on" | "lifting" | "off">("on");
  const lift = () => {
    if (cover !== "on") return;
    setCover("lifting");
    window.setTimeout(() => setCover("off"), 1600);
  };

  return (
    <Page className="t03-root">
      <Drifters kind="sparkle" count={8} color="#f1cf7e" opacity={0.6} />

      {cover !== "off" && (
        <button
          type="button"
          className={`t03-cloth ${cover === "lifting" ? "t03-lift" : ""}`}
          style={{ backgroundImage: `url(${cloth})` }}
          onClick={lift}
        >
          <span className="t03-cloth-hy">
            <Hy />
          </span>
          <span className="t03-small t03-gold">Trầu cau nên duyên</span>
          <span className="t03-cloth-names">
            {data.groom} <i>&amp;</i> {data.bride}
          </span>
          <span className="t03-cloth-tap">Chạm để vén khăn</span>
        </button>
      )}

      <section className="t03-hero">
        <img src={tray} alt="" />
        <div className="t03-hero-text">
          <span className="t03-hy">
            <Hy />
          </span>
          <p className="t03-small">Trầu cau nên duyên</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <p className="t03-hero-date">
            {d.day} · {d.month} · {d.year}
          </p>
        </div>
      </section>

      <section className="t03-sec t03-center t03-invite">
        <Reveal>
          <Leaves />
          <p className="t03-quote">“Miếng trầu là đầu câu chuyện”</p>
          <p className="t03-small">Trân trọng báo tin lễ thành hôn</p>
          <GuestName prefix="Kính gửi" />
        </Reveal>
        <Reveal>
          <Families data={data} className="t03-fam" />
        </Reveal>
        <Reveal variant="zoom">
          <div className="t03-arch">
            <img src={photoSrc(data.photos.cover)} alt="" />
          </div>
        </Reveal>
      </section>

      <section className="t03-red t03-silk t03-hem">
        <Reveal>
          <p className="t03-small t03-gold">Ngày lành tháng tốt</p>
          <p className="t03-bigdate">
            {d.day}
            <span>tháng {Number(d.month)}</span>
            {d.year}
          </p>
          <p className="t03-sub">
            {d.weekday} · {d.time}
          </p>
          <LunarNote iso={data.weddingISO} />
        </Reveal>
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
      </section>

      <section className="t03-sec">
        <Reveal>
          <div className="t03-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t03-card">
            <p className="t03-small">Địa điểm</p>
            <h2 className="t03-title">{data.venueName}</h2>
            <p className="t03-muted">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
      </section>

      <section className="t03-red t03-silk t03-hem t03-hem-top">
        <Reveal>
          <Leaves />
          <h2 className="t03-title">Chương trình</h2>
          <ol className="t03-steps">
            {data.timeline.map((s) => (
              <li key={s.time}>
                <b>{s.time}</b>
                <img src={leaf} alt="" />
                <span>{s.label}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className="t03-sec">
        <Reveal>
          <Leaves />
          <h2 className="t03-title t03-center">Khoảnh khắc</h2>
        </Reveal>
        <div className="t03-album k-album">
          {data.album.map((p, i) => (
            <Reveal
              key={p.key}
              variant="zoom"
              delay={i * 120}
              className={photoShape(p)}
            >
              <div className="t03-leaf">
                <img src={photoSrc(p)} alt="" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t03-sec t03-silk t03-on-red t03-hem-top">
        <Reveal>
          <div className="t03-card">
            <RsvpForm data={data} title="Xác nhận tham dự" variant="select" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t03-card">
            <Leaves />
            <h2 className="t03-title t03-center">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t03-foot">
        <img src={trayEnd} alt="" />
        <div>
          <span className="t03-hy">
            <Hy />
          </span>
          <p className="t03-small t03-gold">Hân hạnh đón tiếp</p>
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

export default Template03;
