import { useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t28/styles.scss";
import { PhotoSlot, WeddingData } from "@/core/types";
import bougain from "@/static/t28/bougain.webp";
import divider from "@/static/t28/divider.webp";
import fanClosed from "@/static/t28/fan-closed.webp";
import fanOpen from "@/static/t28/fan-open.webp";
import hero from "@/static/t28/hero.webp";
import lantern from "@/static/t28/lantern.webp";
import town from "@/static/t28/town.webp";
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

// every photo gets a watercolour brush edge; several painted shapes so no two look stamped
const LAND = ["land1", "land3", "land2"];
const PORT = ["port3", "port1", "port2"];

const Wash = ({
  photo,
  shape,
  className = "",
}: {
  photo: PhotoSlot;
  shape: string;
  className?: string;
}) => (
  <img
    className={`t28-wash t28-w-${shape} ${className}`}
    src={photoSrc(photo)}
    alt={photo.label}
  />
);

const QUOTES = [
  ["Gặp nhau là duyên,", "ở bên nhau là phận"],
  ["Mỗi ngày bên nhau", "là một ngày đẹp nhất"],
];

/** Album rows: a landscape photo takes a full row, portraits pair up side by side. */
const albumRows = (album: PhotoSlot[]) =>
  album.reduce<PhotoSlot[][]>((rows, photo) => {
    const last = rows[rows.length - 1];
    const portrait = photoShape(photo) === "k-port";
    if (portrait && last?.length === 1 && photoShape(last[0]) === "k-port") {
      last.push(photo);
    } else {
      rows.push([photo]);
    }
    return rows;
  }, []);

const Template28 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const [intro, setIntro] = useState<"closed" | "opening" | "gone">("closed");
  const [giftOpen, setGiftOpen] = useState(false);
  const { photos } = data;
  const rows = albumRows(data.album);
  let land = 0;
  let port = 0;

  const open = () => {
    if (intro !== "closed") return;
    setIntro("opening");
    window.setTimeout(() => setIntro("gone"), 2600);
  };

  return (
    <Page className={`t28-root ${intro === "closed" ? "" : "t28-open"}`}>
      {/* ---------- intro: a folded red fan that spreads open ---------- */}
      {intro !== "gone" && (
        <div
          className={`t28-intro ${intro === "opening" ? "t28-intro-opening" : ""}`}
          onClick={open}
        >
          <img className="t28-art t28-intro-hero" src={hero} alt="" />
          <p className="t28-caps t28-intro-caps">Thiệp mời cưới</p>
          <p className="t28-intro-names">
            {data.groom} &amp; {data.bride}
          </p>
          <div className="t28-fan">
            <img className="t28-art t28-fan-closed" src={fanClosed} alt="" />
            <img className="t28-art t28-fan-open" src={fanOpen} alt="" />
          </div>
          <p className="t28-caps t28-intro-hint">Chạm để mở quạt</p>
        </div>
      )}

      {/* ---------- first screen ---------- */}
      <section className="t28-cover">
        <img className="t28-art t28-cover-hero" src={hero} alt="" />
        <p className="t28-caps">Lễ thành hôn</p>
        <h1 className="t28-names">
          <span>{data.groom}</span>
          <i>&amp;</i>
          <span>{data.bride}</span>
        </h1>
        <div className="t28-dateline t28-dateline-sm">
          <span>{titleCase(d.weekday)}</span>
          <b>{d.day}</b>
          <span>
            Tháng {Number(d.month)}
            <br />
            {d.year}
          </span>
        </div>
        <Wash photo={photos.cover} shape="port2" className="t28-cover-photo" />
        <img className="t28-art t28-corner t28-corner-bl" src={bougain} alt="" />
      </section>

      {/* ---------- families, names, invitation ---------- */}
      <section className="t28-sec">
        <img className="t28-art t28-corner t28-corner-tr" src={bougain} alt="" />
        <Reveal>
          <p className="t28-caps t28-pad">
            Trân trọng báo tin lễ thành hôn của con chúng tôi
          </p>
        </Reveal>
        <div className="t28-fams">
          <Reveal variant="left">
            <div className="t28-fam">
              <b className="t28-caps">Nhà trai</b>
              {data.families.groom.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </Reveal>
          <span className="t28-fams-line" />
          <Reveal variant="right">
            <div className="t28-fam">
              <b className="t28-caps">Nhà gái</b>
              {data.families.bride.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="t28-couple">
            <h2 className="t28-names">{data.groom}</h2>
            <p className="t28-role">Chú rể</p>
            <i className="t28-amp">&amp;</i>
            <h2 className="t28-names">{data.bride}</h2>
            <p className="t28-role">Cô dâu</p>
          </div>
        </Reveal>
        <Reveal variant="fade">
          <img className="t28-art t28-divider" src={divider} alt="" />
        </Reveal>
        <Reveal>
          <p className="t28-caps">Trân trọng kính mời</p>
          <GuestName className="t28-guest" />
          <p className="t28-lead">
            tới dự bữa tiệc chung vui
            <br />
            cùng gia đình chúng tôi
          </p>
        </Reveal>
      </section>

      {/* ---------- date and venue ---------- */}
      <section className="t28-sec t28-sec-corner t28-when">
        <img className="t28-art t28-when-lantern" src={lantern} alt="" />
        <Reveal>
          <p className="t28-caps">Tiệc cưới diễn ra vào lúc</p>
          <p className="t28-time">{d.time.replace(":", " giờ ")}</p>
        </Reveal>
        <Reveal variant="zoom">
          <div className="t28-dateline">
            <span>{titleCase(d.weekday)}</span>
            <b>{d.day}</b>
            <span>
              Tháng {Number(d.month)}
              <br />
              {d.year}
            </span>
          </div>
          <LunarNote iso={data.weddingISO} className="t28-lunar" />
        </Reveal>
        <Reveal variant="fade">
          <img className="t28-art t28-divider" src={divider} alt="" />
        </Reveal>
        <Reveal>
          <p className="t28-caps">Địa điểm</p>
          <h3 className="t28-venue">{data.venueName}</h3>
          <p className="t28-address">{data.venueAddress}</p>
          <div className="t28-actions">
            <VenueActions data={data} />
          </div>
        </Reveal>
        <img className="t28-art t28-corner t28-corner-bl" src={bougain} alt="" />
      </section>

      {/* ---------- album: one photo treatment, rhythm from size and stagger ---------- */}
      <section className="t28-sec t28-album">
        <Reveal>
          <p className="t28-caps">Khoảnh khắc</p>
          <h2 className="t28-title">Những ngày bên nhau</h2>
        </Reveal>
        {rows.map((row, i) => {
          const quote = QUOTES[Math.floor(i / 2) % QUOTES.length];
          return (
            <div key={row[0].key}>
              {row.length === 2 ? (
                <div className="t28-pair">
                  {row.map((p) => (
                    <Reveal key={p.key} variant="up">
                      <Wash photo={p} shape={PORT[port++ % PORT.length]} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <Reveal variant="zoom">
                  <Wash
                    photo={row[0]}
                    shape={
                      photoShape(row[0]) === "k-land"
                        ? LAND[land++ % LAND.length]
                        : PORT[port++ % PORT.length]
                    }
                    className={photoShape(row[0]) === "k-land" ? "t28-wide" : "t28-tall"}
                  />
                </Reveal>
              )}
              {i < rows.length - 1 && i % 2 === 0 && (
                <Reveal variant="fade">
                  <img className="t28-art t28-divider" src={divider} alt="" />
                </Reveal>
              )}
              {i < rows.length - 1 && i % 2 === 1 && (
                <Reveal>
                  <p className="t28-quote">
                    “{quote[0]}
                    <br />
                    {quote[1]}”
                  </p>
                </Reveal>
              )}
            </div>
          );
        })}
      </section>

      {/* ---------- calendar, countdown, programme ---------- */}
      <section className="t28-sec t28-sec-corner t28-cal">
        <Reveal variant="zoom">
          <p className="t28-month">
            Tháng {Number(d.month)} · {d.year}
          </p>
          <CalendarCard iso={data.weddingISO} />
        </Reveal>
        <Reveal>
          <p className="t28-caps">Cùng đếm ngược</p>
          <Countdown iso={data.weddingISO} />
        </Reveal>
        <Reveal variant="fade">
          <img className="t28-art t28-divider" src={divider} alt="" />
        </Reveal>
        <Reveal>
          <p className="t28-caps">Lịch trình</p>
          <div className="t28-steps">
            {data.timeline.map((s) => (
              <div key={s.time}>
                <b>{s.time}</b>
                <i />
                <span>{titleCase(s.label)}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <img className="t28-art t28-corner t28-corner-br" src={bougain} alt="" />
      </section>

      {/* ---------- RSVP and gift ---------- */}
      <section className="t28-sec t28-rsvp">
        <Reveal>
          <p className="t28-caps">R · S · V · P</p>
          <RsvpForm data={data} title="Xác nhận tham dự" />
        </Reveal>
        <Reveal>
          <p className="t28-caps t28-gift-caps">Mừng cưới</p>
          <button
            type="button"
            className="t28-giftbtn"
            onClick={() => setGiftOpen((v) => !v)}
          >
            <img className="t28-art" src={lantern} alt="" />
            <span>
              {giftOpen ? "Thu gọn" : "Chạm vào đèn lồng để gửi quà mừng"}
            </span>
          </button>
        </Reveal>
        {giftOpen && (
          <div className="t28-gift">
            <GiftCard data={data} />
          </div>
        )}
      </section>

      {/* ---------- thanks, the old town by the river ---------- */}
      <footer className="t28-thanks">
        <img className="t28-art t28-thanks-hero" src={hero} alt="" />
        <Reveal variant="zoom">
          <Wash photo={photos.destiny} shape="round" className="t28-round" />
        </Reveal>
        <Reveal>
          <p className="t28-thanks-title">Trân trọng cảm ơn</p>
          <p className="t28-caps">
            {data.groom} · {data.bride}
          </p>
        </Reveal>
        <img className="t28-art t28-town" src={town} alt="" />
      </footer>
    </Page>
  );
};

export default Template28;
