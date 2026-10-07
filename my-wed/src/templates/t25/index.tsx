import { useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t25/styles.scss";
import { PhotoSlot, WeddingData } from "@/core/types";
import { Reveal } from "@/templates/_kit/anim";
import { dateParts, lunarDate } from "@/templates/_kit/date";
import { TIMELINE_ICONS } from "@/templates/_kit/icons";
import {
  CalendarCard,
  Countdown,
  GiftCard,
  RsvpForm,
  VenueActions,
  photoShape,
  photoSrc,
  useGuestName,
} from "@/templates/_kit/sections";

// "CHỦ NHẬT" -> "Chủ Nhật", "ĐÓN KHÁCH" -> "Đón Khách"
const titleCase = (s: string) =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

// a hand-drawn flourish under each signature, drawn in as it scrolls into view
const Flourish = () => (
  <svg viewBox="0 0 160 30" aria-hidden="true">
    <path pathLength={1} d="M4 22 C40 30 70 6 98 12 S146 26 156 8" />
  </svg>
);

// small pink blossom that sits on the seam between the cover and the page
const Blossom = () => (
  <svg viewBox="0 0 60 60" aria-hidden="true">
    {[0, 72, 144, 216, 288].map((r) => (
      <path
        key={r}
        transform={`rotate(${r} 30 30)`}
        d="M30 30 C22 22 22 8 30 6 C38 8 38 22 30 30Z"
      />
    ))}
    <circle cx="30" cy="30" r="3.4" />
  </svg>
);

// album rows alternate 3 then 2 portraits (as in a printed album); never leave one photo alone
const rowSizes = (n: number) => {
  const rows: number[] = [];
  for (let left = n, i = 0; left > 0; i++) {
    const size = Math.min(i % 2 ? 2 : 3, left);
    rows.push(size);
    left -= size;
  }
  const last = rows.length - 1;
  if (rows[last] === 1 && last > 0) {
    if (rows[last - 1] === 3) rows.splice(last - 1, 2, 2, 2);
    else rows.splice(last - 1, 2, 3);
  }
  return rows.reduce<number[]>(
    (all, size) => all.concat(Array<number>(size).fill(size)),
    [],
  );
};

const Photo = ({
  photo,
  className = "",
}: {
  photo: PhotoSlot;
  className?: string;
}) => (
  <div className={`t25-photo ${className}`}>
    <img src={photoSrc(photo)} alt={photo.label} />
  </div>
);

const Template25 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const lunar = lunarDate(data.weddingISO);
  const guest = useGuestName();
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const { photos, album } = data;
  const [lead, ...rest] = album;
  const portraits = rest.filter((p) => photoShape(p) === "k-port");
  const perRow = rowSizes(portraits.length);

  return (
    <Page className="t25-root">
      {/* ---------- cover ---------- */}
      <section className="t25-hero">
        <img className="t25-hero-img" src={photoSrc(photos.cover)} alt="" />
        <div className="t25-hero-text">
          <p className="t25-hero-date">
            {d.day}.{d.month}.{d.year}
          </p>
          <p className="t25-quote">
            “Chúng mình đã cùng nhau đi qua nhiều thăng trầm để nhận ra rằng
            được ở bên nhau là điều quý giá nhất. Hôm nay, trước sự chứng kiến
            của mọi người, chúng mình nhẹ nhàng gọi nhau bằng hai tiếng Vợ –
            Chồng.”
          </p>
        </div>
        <span className="t25-blossom">
          <Blossom />
        </span>
      </section>

      {/* ---------- signatures ---------- */}
      <section className="t25-sec t25-sign">
        <div className="t25-sign-row">
          {[data.bride, data.groom].map((name, i) => (
            <Reveal key={name} variant={i ? "right" : "left"} delay={i * 200}>
              <div className="t25-sig">
                <span className="t25-sig-hand">{name.split(" ").pop()}</span>
                <Flourish />
                <b>{name}</b>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="t25-lead">
            Một hành trình mới của chúng mình
            <br />
            bắt đầu từ hôm nay
          </p>
        </Reveal>
      </section>

      {/* ---------- families ---------- */}
      <section className="t25-fams">
        <div className="t25-fam">
          <Reveal variant="left" className="t25-fam-pic">
            <Photo photo={photos.bride} />
          </Reveal>
          <Reveal variant="fade" delay={200} className="t25-fam-info">
            <h3>Nhà Gái</h3>
            {data.families.bride.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="t25-fam-who">Cô dâu : {data.bride}</p>
          </Reveal>
        </div>
        <div className="t25-fam t25-fam-flip">
          <Reveal variant="right" className="t25-fam-pic">
            <Photo photo={photos.groom} />
          </Reveal>
          <Reveal variant="fade" delay={200} className="t25-fam-info">
            <h3>Nhà Trai</h3>
            {data.families.groom.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="t25-fam-who">Chú rể : {data.groom}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- invitation ---------- */}
      <section className="t25-sec t25-invite">
        <Reveal variant="fade">
          <hr className="t25-dots" />
        </Reveal>
        <Reveal>
          <h2 className="t25-script">Thiệp Mời</h2>
          <p className="t25-sub">
            Tham dự lễ cưới {data.groom} &amp; {data.bride}
          </p>
        </Reveal>
        <div className="t25-trio">
          {album.slice(0, 3).map((p, i) => (
            <Reveal
              key={p.key}
              variant={i === 1 ? "zoom" : "up"}
              delay={i * 160}
            >
              <Photo photo={p} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="t25-caps">Trân trọng kính mời</p>
          <p className={`t25-guest ${guest ? "t25-guest-named" : ""}`}>
            {guest || "Quý khách"}
          </p>
          <p className="t25-lead">
            Đến dự Bữa Tiệc thân mật
            <br />
            cùng Gia Đình chúng tôi vào lúc
          </p>
        </Reveal>

        <Reveal variant="zoom">
          <div className="t25-date">
            <p className="t25-date-wd">{titleCase(d.weekday)}</p>
            <div className="t25-date-row">
              <span>{d.time.replace(":", "h")}</span>
              <b>{d.day}</b>
              <span>Năm {d.year}</span>
            </div>
            <p className="t25-date-m">Tháng {Number(d.month)}</p>
            <p className="t25-date-lunar">
              (Tức ngày {lunar.day} tháng {lunar.leap ? "nhuận " : ""}
              {lunar.month} năm {lunar.yearName})
            </p>
          </div>
        </Reveal>

        <div className="t25-steps">
          {data.timeline.map((s, i) => {
            const Icon = TIMELINE_ICONS[(i * 2 + 1) % TIMELINE_ICONS.length];
            return (
              <Reveal key={s.time} delay={i * 140}>
                <div className="t25-step">
                  <Icon />
                  <div>
                    <b>{s.time.replace(":", "h")}</b>
                    <span>{titleCase(s.label)}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="t25-venue">
            <p className="t25-venue-label">Địa chỉ dự tiệc</p>
            <h3>{data.venueName}</h3>
            <p>{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
      </section>

      {/* ---------- calendar over a photo ---------- */}
      <section className="t25-night">
        <img className="t25-night-img" src={photoSrc(photos.night)} alt="" />
        <div className="t25-night-body">
          <Reveal variant="right">
            <p className="t25-night-title">Wedding</p>
          </Reveal>
          <Reveal variant="fade" delay={200}>
            <CalendarCard iso={data.weddingISO} />
          </Reveal>
          <Reveal delay={300}>
            <div className="t25-left">
              <span className="t25-left-hand">Chỉ còn…</span>
              <Countdown iso={data.weddingISO} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- RSVP ---------- */}
      <section className="t25-sec t25-rsvp">
        <Reveal>
          <p className="t25-note">
            Chúng mình rất mong sự hiện diện của bạn để cùng nhau chung vui, sẻ
            chia niềm hạnh phúc và lưu lại những khoảnh khắc đáng nhớ trong ngày
            cưới. Đừng quên để lại xác nhận tham dự để chúng mình chuẩn bị chu
            đáo hơn!
          </p>
        </Reveal>
        <Reveal variant="fade" className="t25-env-wrap">
          <div className="t25-env" aria-hidden="true">
            <span className="t25-env-flap" />
            <span className="t25-env-seal">囍</span>
          </div>
          <div className="t25-card">
            <p className="t25-caps">R.S.V.P.</p>
            <h3>Xác nhận tham dự</h3>
            <p>
              Vui lòng xác nhận tham dự để chúng mình chuẩn bị lễ cưới được
              thuận lợi và trọn vẹn nhất.
            </p>
            <button
              type="button"
              className="t25-btn"
              onClick={() => setRsvpOpen((v) => !v)}
            >
              {rsvpOpen ? "Thu gọn" : "Gửi xác nhận"}
            </button>
          </div>
        </Reveal>
        {rsvpOpen && (
          <div className="t25-panel">
            <RsvpForm data={data} title="Phản hồi của bạn" />
          </div>
        )}
      </section>

      {/* ---------- gift ---------- */}
      <section className="t25-sec t25-giftsec">
        <Reveal variant="zoom">
          <button
            type="button"
            className="t25-giftbtn"
            onClick={() => setGiftOpen((v) => !v)}
          >
            <span className="t25-giftenv" aria-hidden="true">
              <i className="t25-giftletter">
                <em>♥</em>
              </i>
              <i className="t25-giftfront" />
            </span>
            <span className="t25-giftlabel">Gửi quà mừng</span>
          </button>
        </Reveal>
        {giftOpen && (
          <div className="t25-panel">
            <GiftCard data={data} />
          </div>
        )}
      </section>

      {/* ---------- album ---------- */}
      <section className="t25-album-sec">
        <Reveal variant="left">
          <h2 className="t25-album-title">
            Album ảnh cưới <span />
          </h2>
        </Reveal>
        {lead && (
          <Reveal variant="zoom" className="t25-album-lead">
            <Photo photo={lead} />
          </Reveal>
        )}
        <div className="t25-album k-album">
          {rest.map((p, i) => (
            <Reveal
              key={p.key}
              variant="zoom"
              delay={(i % 3) * 120}
              className={`${photoShape(p)} t25-w${perRow[portraits.indexOf(p)] ?? 1}`}
            >
              <img src={photoSrc(p)} alt={p.label} />
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="t25-thanks">
        <img src={photoSrc(photos.thanks)} alt="" />
        <Reveal variant="fade" className="t25-thanks-text">
          <p>Trân trọng</p>
          <i>&amp;</i>
          <p>Biết ơn!</p>
          <span>
            {data.groom} · {data.bride}
          </span>
        </Reveal>
      </footer>
    </Page>
  );
};

export default Template25;
