import { useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t31/styles.scss";
import { PhotoSlot, WeddingData } from "@/core/types";
import aisle from "@/static/t31/aisle.webp";
import candles from "@/static/t31/candles.webp";
import garland from "@/static/t31/footer.webp";
import gift from "@/static/t31/gift.webp";
import rings from "@/static/t31/rings.webp";
import rose from "@/static/t31/rose.webp";
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

/** The one photo frame: a round-topped arch with a double gold hairline. */
const Arch = ({ photo, className = "" }: { photo: PhotoSlot; className?: string }) => (
  <div className={`t31-arch ${className}`}>
    <img src={photoSrc(photo)} alt={photo.label} />
  </div>
);

/** The aisle: a gold hairline down the middle with a small diamond at one end. */
const Aisle = ({ top = false, className = "" }: { top?: boolean; className?: string }) => (
  <i className={`t31-aisle ${top ? "t31-aisle-top" : ""} ${className}`} />
);

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

const DateLine = ({ d, className = "" }: { d: ReturnType<typeof dateParts>; className?: string }) => (
  <div className={`t31-dateline ${className}`}>
    <span>{titleCase(d.weekday)}</span>
    <b>{d.day}</b>
    <span>
      Tháng {Number(d.month)}
      <br />
      {d.year}
    </span>
  </div>
);

const Template31 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const [intro, setIntro] = useState<"closed" | "opening" | "gone">("closed");
  const [giftOpen, setGiftOpen] = useState(false);
  const { photos } = data;

  const open = () => {
    if (intro !== "closed") return;
    setIntro("opening");
    window.setTimeout(() => setIntro("gone"), 3000);
  };

  const couple = (
    <>
      {data.groom} <i className="t31-amp-inline">&amp;</i> {data.bride}
    </>
  );

  return (
    <Page className={`t31-root ${intro === "closed" ? "" : "t31-open"}`}>
      {/* ---------- intro: the chapel doors open onto the aisle, then we walk in ---------- */}
      {intro !== "gone" && (
        <div
          className={`t31-intro ${intro === "opening" ? "t31-intro-opening" : ""}`}
          onClick={open}
        >
          <div className="t31-intro-head">
            <p className="t31-caps">Trân trọng kính mời</p>
            <p className="t31-intro-names">{couple}</p>
          </div>
          <div className="t31-doorway">
            <div className="t31-inside" />
            <div className="t31-leaf t31-leaf-l" />
            <div className="t31-leaf t31-leaf-r" />
          </div>
          <img className="t31-art t31-intro-garland" src={garland} alt="" />
          <p className="t31-caps t31-intro-hint">Chạm để mở cửa lễ đường</p>
        </div>
      )}

      {/* ---------- first screen: inside the chapel ---------- */}
      <section className="t31-cover">
        <img className="t31-art t31-cover-scene" src={aisle} alt="" />
        <div className="t31-cover-veil" />
        <p className="t31-caps">Lễ thành hôn</p>
        <h1 className="t31-names">
          <span>{data.groom}</span>
          <i>&amp;</i>
          <span>{data.bride}</span>
        </h1>
        <DateLine d={d} className="t31-cover-date" />
      </section>

      {/* ---------- cover photo in the arch, a garland at its foot ---------- */}
      <section className="t31-sec t31-photo">
        <Aisle top className="t31-aisle-70" />
        <Reveal variant="zoom">
          <div className="t31-photo-frame">
            <Arch photo={photos.cover} className="t31-cover-arch" />
            <img className="t31-art t31-photo-garland" src={garland} alt="" />
          </div>
        </Reveal>
        <Reveal>
          <p className="t31-caps">Save the date</p>
          <p className="t31-couple-line">{couple}</p>
          <p className="t31-date-dots">
            {d.day} · {d.month} · {d.year}
          </p>
        </Reveal>
        <Aisle className="t31-aisle-100" />
      </section>

      {/* ---------- families, names, invitation ---------- */}
      <section className="t31-sec">
        <Reveal variant="zoom">
          <img className="t31-art t31-rings" src={rings} alt="" />
        </Reveal>
        <Reveal>
          <p className="t31-caps t31-pad">Trân trọng báo tin lễ thành hôn của con chúng tôi</p>
        </Reveal>
        <div className="t31-fams">
          <Reveal variant="left">
            <div className="t31-fam">
              <b className="t31-caps">Nhà trai</b>
              {data.families.groom.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </Reveal>
          <span className="t31-fams-line" />
          <Reveal variant="right">
            <div className="t31-fam">
              <b className="t31-caps">Nhà gái</b>
              {data.families.bride.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="t31-couple">
            <h2 className="t31-name">{data.groom}</h2>
            <p className="t31-role">Chú rể</p>
            <i className="t31-amp">&amp;</i>
            <h2 className="t31-name">{data.bride}</h2>
            <p className="t31-role">Cô dâu</p>
          </div>
        </Reveal>
        <Reveal variant="fade">
          <img className="t31-art t31-rose" src={rose} alt="" />
        </Reveal>
        <Reveal>
          <p className="t31-caps">Trân trọng kính mời</p>
          <GuestName className="t31-guest" />
          <p className="t31-lead">
            tới dự buổi lễ thành hôn
            <br />
            cùng gia đình chúng tôi
          </p>
        </Reveal>
      </section>

      {/* ---------- date and venue ---------- */}
      <section className="t31-sec t31-when">
        <Aisle top className="t31-aisle-70" />
        <Reveal>
          <p className="t31-caps">Hôn lễ cử hành vào lúc</p>
          <p className="t31-time">{d.time.replace(":", " giờ ")}</p>
        </Reveal>
        <Reveal variant="zoom">
          <DateLine d={d} />
          <LunarNote iso={data.weddingISO} className="t31-lunar" />
        </Reveal>
        <Aisle className="t31-aisle-70 t31-aisle-gap" />
        <Reveal>
          <p className="t31-caps">Địa điểm</p>
          <h3 className="t31-venue">{data.venueName}</h3>
          <p className="t31-address">{data.venueAddress}</p>
          <div className="t31-actions">
            <VenueActions data={data} />
          </div>
        </Reveal>
        <img className="t31-art t31-candles t31-candles-l" src={candles} alt="" />
        <img className="t31-art t31-candles t31-candles-r" src={candles} alt="" />
        <Aisle className="t31-aisle-end" />
      </section>

      {/* ---------- album: every photo in the same arch, size and pairing make the rhythm ---------- */}
      <section className="t31-sec t31-album">
        <Reveal>
          <p className="t31-caps">Khoảnh khắc</p>
          <h2 className="t31-title">Những ngày bên nhau</h2>
        </Reveal>
        {albumRows(data.album).map((row) =>
          row.length === 2 ? (
            <div key={row[0].key} className="t31-pair">
              {row.map((p) => (
                <Reveal key={p.key} variant="up">
                  <Arch photo={p} className="t31-small" />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal key={row[0].key} variant="zoom">
              <Arch
                photo={row[0]}
                className={photoShape(row[0]) === "k-land" ? "t31-wide" : "t31-tall"}
              />
            </Reveal>
          ),
        )}
      </section>

      {/* ---------- calendar, countdown, programme ---------- */}
      <section className="t31-sec t31-cal">
        <Reveal variant="zoom">
          <p className="t31-month">
            Tháng {Number(d.month)} · {d.year}
          </p>
          <CalendarCard iso={data.weddingISO} />
        </Reveal>
        <Reveal>
          <p className="t31-caps">Cùng đếm ngược</p>
          <Countdown iso={data.weddingISO} />
        </Reveal>
        <Reveal variant="fade">
          <img className="t31-art t31-rose" src={rose} alt="" />
        </Reveal>
        <Reveal>
          <p className="t31-caps">Lịch trình</p>
          <div className="t31-steps">
            {data.timeline.map((s) => (
              <div key={s.time}>
                <b>{s.time}</b>
                <i />
                <span>{titleCase(s.label)}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------- RSVP and gift ---------- */}
      <section className="t31-sec t31-rsvp">
        <Aisle top className="t31-aisle-60" />
        <Reveal>
          <p className="t31-caps">R · S · V · P</p>
          <RsvpForm data={data} title="Xác nhận tham dự" />
        </Reveal>
        <Reveal>
          <p className="t31-caps t31-gift-caps">Mừng cưới</p>
          <button
            type="button"
            className="t31-giftbtn"
            onClick={() => setGiftOpen((v) => !v)}
          >
            <img className="t31-art" src={gift} alt="" />
            <span>{giftOpen ? "Thu gọn" : "Chạm vào hộp quà để gửi lời chúc mừng"}</span>
          </button>
        </Reveal>
        {giftOpen && (
          <div className="t31-gift">
            <GiftCard data={data} />
          </div>
        )}
      </section>

      {/* ---------- thanks ---------- */}
      <footer className="t31-thanks">
        <Aisle top className="t31-aisle-60" />
        <Reveal variant="zoom">
          <Arch photo={photos.destiny} className="t31-thanks-arch" />
        </Reveal>
        <Reveal>
          <p className="t31-thanks-title">Trân trọng cảm ơn</p>
          <p className="t31-caps t31-ink">
            {data.groom} · {data.bride}
          </p>
          <p className="t31-lead t31-muted">
            Sự hiện diện của bạn là niềm vinh hạnh
            <br />
            của gia đình chúng tôi
          </p>
        </Reveal>
        <img className="t31-art t31-thanks-garland" src={garland} alt="" />
      </footer>
    </Page>
  );
};

export default Template31;
