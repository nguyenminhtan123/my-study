import { ReactNode, useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t03/styles.scss";
import { WeddingData } from "@/core/types";
import cloth from "@/static/t03/cloth.webp";
import filigree from "@/static/t03/filigree.webp";
import long from "@/static/t03/long.webp";
import phoenix from "@/static/t03/phoenix.webp";
import phung from "@/static/t03/phung.webp";
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

/** Above a title: a gold hairline with a small diamond in the middle. */
const Crest = () => (
  <span className="t03-mark" aria-hidden="true">
    <i />
  </span>
);

/** Between sections: a longer gold hairline with the same diamond. */
const Divider = () => (
  <span className="t03-mark t03-divider" aria-hidden="true">
    <i />
  </span>
);

/** The dragon and the phoenix (long phụng) facing each other across the 囍 seal. */
const LongPhung = () => (
  <div className="t03-pair" aria-hidden="true">
    <img src={long} alt="" />
    <span className="t03-hy">囍</span>
    <img src={phung} alt="" />
  </div>
);

/**
 * A cream panel in a fine gold frame, filigree in its four corners, a soft glow behind the words, and with `quid` a
 * betel quid folded into phoenix wings (trầu têm cánh phượng) resting on the bottom right corner.
 */
const Frame = ({ children, quid = false }: { children: ReactNode; quid?: boolean }) => (
  <div className="t03-frame">
    {["tl", "tr", "bl", "br"].map((c) => (
      <img key={c} className={`t03-fil t03-fil-${c}`} src={filigree} alt="" aria-hidden="true" />
    ))}
    {quid && <img className="t03-bloom t03-bloom-b" src={phoenix} alt="" aria-hidden="true" />}
    <div className="t03-frame-in">{children}</div>
  </div>
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
          <span className="t03-cloth-hy">囍</span>
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
          <span className="t03-hy">囍</span>
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

      {/* ---------- the inside: paper flowers and rose-gold filigree on pearl paper ---------- */}
      <div className="t03-pearl">
        <section className="t03-sec">
          <Reveal>
            <Frame quid>
              <LongPhung />
              <p className="t03-quote">“Miếng trầu là đầu câu chuyện”</p>
              <p className="t03-small">Trân trọng báo tin lễ thành hôn</p>
              <GuestName prefix="Kính gửi" />
              <Families data={data} className="t03-fam" />
              <div className="t03-heart">
                <div className="t03-heart-frame">
                  <img src={photoSrc(data.photos.cover)} alt="" />
                </div>
                <span className="t03-hy t03-heart-hy">囍</span>
              </div>
            </Frame>
          </Reveal>
        </section>

        <section className="t03-sec">
          <Reveal>
            <Frame>
              <p className="t03-small">Ngày lành tháng tốt</p>
              <p className="t03-month">
                Tháng {Number(d.month)} · {d.year}
              </p>
              <div className="t03-dayrow">
                <span>{d.weekday}</span>
                <b>{d.day}</b>
                <span>{d.time}</span>
              </div>
              <LunarNote iso={data.weddingISO} />
              <Countdown iso={data.weddingISO} />
            </Frame>
          </Reveal>
        </section>

        <Divider />

        <section className="t03-sec">
          <Reveal>
            <div className="t03-card">
              <CalendarCard iso={data.weddingISO} />
            </div>
          </Reveal>
          <Reveal>
            <div className="t03-card">
              <Crest />
              <p className="t03-small">Địa điểm</p>
              <h2 className="t03-title">{data.venueName}</h2>
              <p className="t03-muted">{data.venueAddress}</p>
              <VenueActions data={data} />
            </div>
          </Reveal>
          <Reveal>
            <div className="t03-card">
              <Crest />
              <h2 className="t03-title">Chương trình</h2>
              <ol className="t03-steps">
                {data.timeline.map((s) => (
                  <li key={s.time}>
                    <b>{s.time}</b>
                    <i className="t03-pearl-dot" />
                    <span>{s.label}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </section>

        <section className="t03-sec t03-album-sec">
          <Reveal>
            <Crest />
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

        <Divider />

        <section className="t03-sec">
          <Reveal>
            <div className="t03-card">
              <RsvpForm data={data} title="Xác nhận tham dự" variant="select" />
            </div>
          </Reveal>
          <Reveal>
            <div className="t03-card">
              <Crest />
              <h2 className="t03-title t03-center">Mừng cưới</h2>
              <GiftCard data={data} />
            </div>
          </Reveal>
        </section>
      </div>

      <footer className="t03-foot">
        <img src={trayEnd} alt="" />
        <div>
          <span className="t03-hy">囍</span>
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
