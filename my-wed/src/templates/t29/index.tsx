import { useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t29/styles.scss";
import { PhotoSlot, WeddingData } from "@/core/types";
import bloom from "@/static/t29/bloom.webp";
import bud from "@/static/t29/bud.webp";
import corner from "@/static/t29/corner.webp";
import divider from "@/static/t29/divider.webp";
import dragonfly from "@/static/t29/dragonfly.webp";
import footer from "@/static/t29/footer.webp";
import gift from "@/static/t29/gift.webp";
import hero from "@/static/t29/hero.webp";
import petals from "@/static/t29/petals.webp";
import ringPlain from "@/static/t29/ring-plain.webp";
import ring from "@/static/t29/ring.webp";
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

/** The one photo frame: a round photo inside the painted brush circle (moon gate).
 * "full" uses the ring with its lotus cluster (cover and thanks), "plain" the circle alone (album). */
const Moon = ({
  photo,
  full = false,
  className = "",
}: {
  photo: PhotoSlot;
  full?: boolean;
  className?: string;
}) => (
  <div className={`t29-moon ${full ? "t29-moon-full" : "t29-moon-plain"} ${className}`}>
    <img className="t29-moon-photo" src={photoSrc(photo)} alt={photo.label} />
    <img className="t29-art t29-moon-ring" src={full ? ring : ringPlain} alt="" />
  </div>
);

const DateLine = ({ d, className = "" }: { d: ReturnType<typeof dateParts>; className?: string }) => (
  <div className={`t29-dateline ${className}`}>
    <span>{titleCase(d.weekday)}</span>
    <b>{d.day}</b>
    <span>
      Tháng {Number(d.month)}
      <br />
      {d.year}
    </span>
  </div>
);

const QUOTES = [
  "“Gặp nhau là duyên, ở bên nhau là phận”",
  "“Mỗi ngày bên nhau là một ngày đẹp nhất”",
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

const Template29 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const [intro, setIntro] = useState<"bud" | "bloom" | "gone">("bud");
  const [giftOpen, setGiftOpen] = useState(false);
  const { photos } = data;
  let single = 0;

  const open = () => {
    if (intro !== "bud") return;
    setIntro("bloom");
    window.setTimeout(() => setIntro("gone"), 3000);
  };

  const couple = (
    <>
      {data.groom} <i className="t29-amp-inline">&amp;</i> {data.bride}
    </>
  );

  return (
    <Page className={`t29-root ${intro === "bud" ? "" : "t29-open"}`}>
      {/* ---------- intro: a lotus bud; a tap and it blooms ---------- */}
      {intro !== "gone" && (
        <div
          className={`t29-intro ${intro === "bloom" ? "t29-intro-bloom" : ""}`}
          onClick={open}
        >
          <img className="t29-art t29-intro-fly" src={dragonfly} alt="" />
          <img className="t29-art t29-intro-petals" src={petals} alt="" />
          <div className="t29-intro-bud">
            <p className="t29-caps">Thiệp mời cưới</p>
            <p className="t29-intro-names">{couple}</p>
            <img className="t29-art t29-bud" src={bud} alt="" />
            <p className="t29-caps t29-intro-hint">Chạm vào búp sen</p>
          </div>
          <div className="t29-intro-open">
            <img className="t29-art t29-bloom" src={bloom} alt="" />
            <p className="t29-caps">Lễ thành hôn</p>
            <p className="t29-intro-names t29-intro-names-lg">{couple}</p>
            <p className="t29-intro-date">
              {d.day} · {d.month} · {d.year}
            </p>
          </div>
        </div>
      )}

      {/* ---------- first screen ---------- */}
      <section className="t29-cover">
        <img className="t29-art t29-hero" src={hero} alt="" />
        <p className="t29-caps">Lễ thành hôn</p>
        <h1 className="t29-names">
          <span>{data.groom}</span>
          <i>&amp;</i>
          <span>{data.bride}</span>
        </h1>
        <DateLine d={d} className="t29-dateline-sm" />
        <Moon photo={photos.cover} full className="t29-cover-moon" />
      </section>

      {/* ---------- families, names, invitation ---------- */}
      <section className="t29-sec t29-fam-sec">
        <img className="t29-art t29-fly-corner" src={dragonfly} alt="" />
        <Reveal>
          <p className="t29-caps t29-pad">Trân trọng báo tin lễ thành hôn của con chúng tôi</p>
        </Reveal>
        <div className="t29-fams">
          <Reveal variant="left">
            <div className="t29-fam">
              <b className="t29-caps">Nhà trai</b>
              {data.families.groom.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </Reveal>
          <span className="t29-fams-line" />
          <Reveal variant="right">
            <div className="t29-fam">
              <b className="t29-caps">Nhà gái</b>
              {data.families.bride.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="t29-couple">
            <h2 className="t29-name">{data.groom}</h2>
            <p className="t29-role">Chú rể</p>
            <i className="t29-amp">&amp;</i>
            <h2 className="t29-name">{data.bride}</h2>
            <p className="t29-role">Cô dâu</p>
          </div>
        </Reveal>
        <Reveal variant="fade">
          <img className="t29-art t29-divider" src={divider} alt="" />
        </Reveal>
        <Reveal>
          <p className="t29-caps">Trân trọng kính mời</p>
          <GuestName className="t29-guest" />
          <p className="t29-lead">
            tới dự bữa tiệc chung vui
            <br />
            cùng gia đình chúng tôi
          </p>
        </Reveal>
      </section>

      {/* ---------- date and venue ---------- */}
      <section className="t29-sec t29-when">
        <Reveal>
          <p className="t29-caps">Tiệc cưới diễn ra vào lúc</p>
          <p className="t29-time">{d.time.replace(":", " giờ ")}</p>
        </Reveal>
        <Reveal variant="zoom">
          <DateLine d={d} />
          <LunarNote iso={data.weddingISO} className="t29-lunar" />
        </Reveal>
        <Reveal variant="fade">
          <img className="t29-art t29-divider" src={divider} alt="" />
        </Reveal>
        <Reveal>
          <p className="t29-caps">Địa điểm</p>
          <h3 className="t29-venue">{data.venueName}</h3>
          <p className="t29-address">{data.venueAddress}</p>
          <div className="t29-actions">
            <VenueActions data={data} />
          </div>
        </Reveal>
        <img className="t29-art t29-corner" src={corner} alt="" />
      </section>

      {/* ---------- album: every photo is a moon gate; size and stagger make the rhythm ---------- */}
      <section className="t29-sec t29-album">
        <Reveal>
          <p className="t29-caps">Khoảnh khắc</p>
          <h2 className="t29-title">Những ngày bên nhau</h2>
        </Reveal>
        {albumRows(data.album).map((row) => {
          if (row.length === 2) {
            return (
              <div key={row[0].key} className="t29-pair">
                {row.map((p) => (
                  <Reveal key={p.key} variant="up">
                    <Moon photo={p} />
                  </Reveal>
                ))}
              </div>
            );
          }
          if (photoShape(row[0]) === "k-land") {
            return (
              <Reveal key={row[0].key} variant="zoom">
                <Moon photo={row[0]} className="t29-big" />
              </Reveal>
            );
          }
          // a lone portrait sits off to one side with a quote beside it
          const i = single++;
          return (
            <div key={row[0].key} className={`t29-single ${i % 2 ? "t29-single-r" : ""}`}>
              <Reveal variant={i % 2 ? "right" : "left"}>
                <Moon photo={row[0]} />
              </Reveal>
              <Reveal variant="fade">
                <p className="t29-quote">{QUOTES[i % QUOTES.length]}</p>
              </Reveal>
            </div>
          );
        })}
      </section>

      {/* ---------- calendar, countdown, programme ---------- */}
      <section className="t29-sec t29-cal">
        <Reveal variant="zoom">
          <p className="t29-month">
            Tháng {Number(d.month)} · {d.year}
          </p>
          <CalendarCard iso={data.weddingISO} />
        </Reveal>
        <Reveal>
          <p className="t29-caps">Cùng đếm ngược</p>
          <Countdown iso={data.weddingISO} />
        </Reveal>
        <Reveal variant="fade">
          <img className="t29-art t29-divider" src={divider} alt="" />
        </Reveal>
        <Reveal>
          <p className="t29-caps">Lịch trình</p>
          <div className="t29-steps">
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
      <section className="t29-sec t29-rsvp">
        <img className="t29-art t29-fly-corner t29-fly-rsvp" src={dragonfly} alt="" />
        <Reveal>
          <p className="t29-caps">R · S · V · P</p>
          <RsvpForm data={data} title="Xác nhận tham dự" />
        </Reveal>
        <Reveal>
          <p className="t29-caps t29-gift-caps">Mừng cưới</p>
          <button
            type="button"
            className="t29-giftbtn"
            onClick={() => setGiftOpen((v) => !v)}
          >
            <img className="t29-art" src={gift} alt="" />
            <span>{giftOpen ? "Thu gọn" : "Thả đèn hoa đăng để gửi quà mừng"}</span>
          </button>
        </Reveal>
        {giftOpen && (
          <div className="t29-gift">
            <GiftCard data={data} />
          </div>
        )}
      </section>

      {/* ---------- thanks: the lotus pond ---------- */}
      <footer className="t29-thanks">
        <Reveal variant="zoom">
          <Moon photo={photos.destiny} full className="t29-thanks-moon" />
        </Reveal>
        <Reveal>
          <p className="t29-thanks-title">Trân trọng cảm ơn</p>
          <p className="t29-caps">
            {data.groom} · {data.bride}
          </p>
        </Reveal>
        <img className="t29-art t29-pond" src={footer} alt="" />
      </footer>
    </Page>
  );
};

export default Template29;
