import { ReactNode, useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t30/styles.scss";
import { PhotoSlot, WeddingData } from "@/core/types";
import boat from "@/static/t30/boat.webp";
import corner from "@/static/t30/corner.webp";
import divider from "@/static/t30/divider.webp";
import gift from "@/static/t30/gift.webp";
import gulls from "@/static/t30/gulls.webp";
import hero from "@/static/t30/hero.webp";
import shells from "@/static/t30/shells.webp";
import shore from "@/static/t30/shore.webp";
import { Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Countdown,
  GiftCard,
  GuestName,
  LunarNote,
  RsvpForm,
  VenueActions,
  photoShape,
  photoSrc,
} from "@/templates/_kit/sections";

// "CHỦ NHẬT" -> "Chủ Nhật"
const titleCase = (s: string) =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/** The one photo treatment: full bleed to a screen edge, washed with morning sun, text may sit on it. */
const Sunlit = ({
  photo,
  className = "",
  children,
}: {
  photo: PhotoSlot;
  className?: string;
  children?: ReactNode;
}) => (
  <div className={`t30-ph ${className}`}>
    <img src={photoSrc(photo)} alt={photo.label} />
    {children}
  </div>
);

// what sits beside each portrait in the album, in turn
const NOTES: ReactNode[] = [
  <p className="t30-note-quote">“Gặp nhau là duyên, ở bên nhau là phận”</p>,
  <p className="t30-note-script">Mỗi bình minh có nhau</p>,
  <img className="t30-art t30-note-shells" src={shells} alt="" />,
  <p className="t30-note-quote">“Biển rộng trời cao, và chúng mình có nhau”</p>,
];

const Template30 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const [intro, setIntro] = useState<"dawn" | "rising" | "gone">("dawn");
  const [giftOpen, setGiftOpen] = useState(false);
  const { photos } = data;
  let port = 0;

  const open = () => {
    if (intro !== "dawn") return;
    setIntro("rising");
    window.setTimeout(() => setIntro("gone"), 3000);
  };

  return (
    <Page className={`t30-root ${intro === "dawn" ? "" : "t30-open"}`}>
      {/* ---------- intro: the sea before dawn; a tap and the sun comes up ---------- */}
      {intro !== "gone" && (
        <div
          className={`t30-intro ${intro === "rising" ? "t30-intro-rising" : ""}`}
          onClick={open}
        >
          <img className="t30-art t30-scene" src={hero} alt="" />
          <div className="t30-night" />
          <div className="t30-sun" />
          <div className="t30-intro-text">
            <p className="t30-caps">Thiệp mời cưới</p>
            <p className="t30-intro-names">
              {data.groom}
              <br />
              &amp; {data.bride}
            </p>
          </div>
          <div className="t30-intro-tap">
            <span className="t30-intro-orb" />
            <p className="t30-caps">Chạm để đón bình minh</p>
          </div>
        </div>
      )}

      {/* ---------- first screen: sunrise over the sea ---------- */}
      <section className="t30-cover">
        <img className="t30-art t30-scene t30-fade-bottom" src={hero} alt="" />
        <div className="t30-sky" />
        <div className="t30-sun t30-sun-up" />
        <p className="t30-caps">Lễ thành hôn</p>
        <h1 className="t30-names">
          <span>{data.groom}</span>
          <i>&amp;</i>
          <span>{data.bride}</span>
        </h1>
        <div className="t30-cover-date">
          <p>{d.weekday}</p>
          <p>
            <span className="t30-rule" /> {Number(d.day)} · {Number(d.month)} · {d.year}{" "}
            <span className="t30-rule" />
          </p>
        </div>
      </section>

      {/* ---------- cover photo spread ---------- */}
      <section className="t30-spread">
        <Reveal variant="left">
          <Sunlit photo={photos.cover} className="t30-spread-photo">
            <p className="t30-over t30-spread-title">
              Chúng mình
              <br />
              về chung một nhà
            </p>
          </Sunlit>
        </Reveal>
        <p className="t30-caps t30-vertical">
          {d.day} · {d.month} · {d.year}
        </p>
        <Reveal variant="right">
          <div className="t30-spread-text">
            <p className="t30-caps">Lễ thành hôn</p>
            <p className="t30-spread-names">
              {data.groom} <i>&amp;</i>
              <br />
              {data.bride}
            </p>
            <p className="t30-lead">
              “Biển rộng trời cao,
              <br />
              và chúng mình có nhau.”
            </p>
          </div>
        </Reveal>
        <img className="t30-art t30-spread-shells" src={shells} alt="" />
      </section>

      {/* ---------- families, names, invitation ---------- */}
      <section className="t30-sec t30-fam-sec">
        <img className="t30-art t30-corner" src={corner} alt="" />
        <Reveal>
          <p className="t30-caps t30-pad">
            Trân trọng báo tin lễ thành hôn của con chúng tôi
          </p>
        </Reveal>
        <div className="t30-fams">
          <Reveal variant="left">
            <div className="t30-fam">
              <b className="t30-caps">Nhà trai</b>
              {data.families.groom.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </Reveal>
          <Reveal variant="right">
            <div className="t30-fam t30-fam-bride">
              <b className="t30-caps">Nhà gái</b>
              {data.families.bride.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="t30-couple">
          <Reveal variant="left">
            <div className="t30-couple-groom">
              <h2 className="t30-name">{data.groom}</h2>
              <p className="t30-role">Chú rể</p>
            </div>
          </Reveal>
          <i className="t30-amp">&amp;</i>
          <Reveal variant="right">
            <div className="t30-couple-bride">
              <h2 className="t30-name">{data.bride}</h2>
              <p className="t30-role">Cô dâu</p>
            </div>
          </Reveal>
        </div>
        <Reveal variant="fade">
          <img className="t30-art t30-divider" src={divider} alt="" />
        </Reveal>
        <Reveal>
          <p className="t30-caps">Trân trọng kính mời</p>
          <GuestName className="t30-guest" />
          <p className="t30-lead">
            tới dự bữa tiệc chung vui
            <br />
            cùng gia đình chúng tôi
          </p>
        </Reveal>
      </section>

      {/* ---------- date and venue ---------- */}
      <section className="t30-sec t30-when">
        <img className="t30-art t30-when-gulls" src={gulls} alt="" />
        <Reveal variant="left">
          <div className="t30-left">
            <p className="t30-caps">Tiệc cưới diễn ra vào lúc</p>
            <p className="t30-time">{d.time.replace(":", " giờ ")}</p>
          </div>
        </Reveal>
        <Reveal variant="zoom">
          <div className="t30-bigdate">
            <b>{d.day}</b>
            <div>
              <p>{d.weekday}</p>
              <p>Tháng {Number(d.month)}</p>
              <p>{d.year}</p>
            </div>
          </div>
          <LunarNote iso={data.weddingISO} className="t30-lunar" />
        </Reveal>
        <Reveal variant="fade">
          <img className="t30-art t30-divider" src={divider} alt="" />
        </Reveal>
        <Reveal variant="right">
          <div className="t30-right">
            <p className="t30-caps">Địa điểm</p>
            <h3 className="t30-venue">{data.venueName}</h3>
            <p className="t30-address">{data.venueAddress}</p>
            <div className="t30-actions">
              <VenueActions data={data} />
            </div>
          </div>
        </Reveal>
        <img className="t30-art t30-when-boat" src={boat} alt="" />
      </section>

      {/* ---------- album: landscape photos bleed both edges, portraits alternate left and right ---------- */}
      <section className="t30-album">
        <Reveal>
          <div className="t30-left t30-album-head">
            <p className="t30-caps">Khoảnh khắc</p>
            <h2 className="t30-title">Những ngày bên nhau</h2>
          </div>
        </Reveal>
        {data.album.map((photo) => {
          if (photoShape(photo) === "k-land") {
            return (
              <Reveal key={photo.key} variant="zoom">
                <Sunlit photo={photo} className="t30-wide" />
              </Reveal>
            );
          }
          const i = port++;
          return (
            <div
              key={photo.key}
              className={`t30-row ${i % 2 ? "t30-row-right" : "t30-row-left"}`}
            >
              <Reveal variant={i % 2 ? "right" : "left"}>
                <Sunlit photo={photo} className="t30-tall" />
              </Reveal>
              <Reveal variant="fade">
                <div className="t30-note">{NOTES[i % NOTES.length]}</div>
              </Reveal>
            </div>
          );
        })}
      </section>

      {/* ---------- calendar, countdown, programme ---------- */}
      <section className="t30-sec t30-cal">
        <Reveal variant="zoom">
          <p className="t30-month">
            Tháng {Number(d.month)} · {d.year}
          </p>
          <CalendarCard iso={data.weddingISO} />
        </Reveal>
        <Reveal>
          <p className="t30-caps">Cùng đếm ngược</p>
          <Countdown iso={data.weddingISO} />
        </Reveal>
        <Reveal variant="fade">
          <img className="t30-art t30-divider" src={divider} alt="" />
        </Reveal>
        <Reveal>
          <p className="t30-caps">Lịch trình</p>
          <div className="t30-steps">
            {data.timeline.map((s) => (
              <div key={s.time}>
                <b>{s.time}</b>
                <i />
                <span>{titleCase(s.label)}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <img className="t30-art t30-cal-boat" src={boat} alt="" />
      </section>

      {/* ---------- RSVP and gift ---------- */}
      <section className="t30-sec t30-rsvp">
        <img className="t30-art t30-rsvp-gulls" src={gulls} alt="" />
        <Reveal>
          <p className="t30-caps">R · S · V · P</p>
          <RsvpForm data={data} title="Xác nhận tham dự" />
        </Reveal>
        <Reveal>
          <p className="t30-caps t30-gift-caps">Mừng cưới</p>
          <button
            type="button"
            className="t30-giftbtn"
            onClick={() => setGiftOpen((v) => !v)}
          >
            <img className="t30-art" src={gift} alt="" />
            <span>{giftOpen ? "Thu gọn" : "Chạm vào vỏ sò để gửi quà mừng"}</span>
          </button>
        </Reveal>
        {giftOpen && (
          <div className="t30-gift">
            <GiftCard data={data} />
          </div>
        )}
      </section>

      {/* ---------- thanks: the morning shore ---------- */}
      <footer className="t30-thanks">
        <Reveal variant="fade">
          <Sunlit photo={photos.destiny} className="t30-thanks-photo">
            <p className="t30-over t30-thanks-title">Trân trọng cảm ơn</p>
          </Sunlit>
        </Reveal>
        <Reveal>
          <p className="t30-caps">
            {data.groom} · {data.bride}
          </p>
          <p className="t30-lead t30-muted">Hẹn gặp bạn trong ngày vui của chúng mình</p>
        </Reveal>
        <img className="t30-art t30-thanks-gulls" src={gulls} alt="" />
        <img className="t30-art t30-shore t30-fade-top" src={shore} alt="" />
      </footer>
    </Page>
  );
};

export default Template30;
