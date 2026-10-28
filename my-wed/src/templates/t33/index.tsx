import { useEffect, useRef } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t33/styles.scss";
import { PhotoSlot, WeddingData } from "@/core/types";
import blue from "@/static/t33/blue.webp";
import butterfly from "@/static/t33/butterfly.webp";
import cosmos from "@/static/t33/cosmos.webp";
import gift from "@/static/t33/gift.webp";
import meadowPoster from "@/static/t33/meadow-poster.webp";
import meadow from "@/static/t33/meadow.mp4";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Countdown,
  GiftCard,
  LunarNote,
  RsvpForm,
  VenueActions,
  photoShape,
  photoSrc,
  useGuestName,
} from "@/templates/_kit/sections";

// "CHỦ NHẬT" -> "Chủ Nhật"
const titleCase = (s: string) =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/** The one photo frame: a pane of clear glass round the photo. */
const Glass = ({ photo, className = "" }: { photo: PhotoSlot; className?: string }) => (
  <div className={`t33-glass ${className}`}>
    <img src={photoSrc(photo)} alt={photo.label} />
  </div>
);

const Rule = () => (
  <div className="t33-rule" data-anim="up">
    <i />
  </div>
);

const Template33 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const guest = useGuestName();
  const { photos } = data;
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  // the script names shrink a little for long names, so each stays on one line
  const longest = Math.max(data.groom.length, data.bride.length);
  const nameSize = longest > 13 ? 38 : longest > 10 ? 44 : 52;

  useEffect(() => {
    const host = root.current;
    if (!host) return undefined;
    // React does not always put `muted` on the element, and iOS only autoplays muted video
    const v = video.current;
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }
    // entrances: every block rises, zooms or slides in as it scrolls into view
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("t33-in")),
      { threshold: 0.15 },
    );
    host.querySelectorAll("[data-anim]").forEach((el) => reveal.observe(el));
    return () => reveal.disconnect();
  }, []);

  // album: a landscape photo takes a full row; portraits go two by two, the second set a little lower
  let side = 0;
  const album = data.album.map((p) => {
    const land = photoShape(p) === "k-land";
    side = land ? 0 : side + 1;
    return { p, land, low: !land && side % 2 === 0 };
  });

  return (
    <Page className="t33-root">
      <div ref={root}>
        {/* the meadow, still behind the whole card */}
        <div className="t33-bg" aria-hidden>
          <video ref={video} src={meadow} poster={meadowPoster} autoPlay muted loop playsInline preload="auto" />
          <div className="t33-shade" />
        </div>

        {/* ---------- opening: the video alone, then the photo lands, then the names write in ---------- */}
        <section className="t33-cover">
          <p className="t33-kicker">Thiệp mời cưới</p>
          <Glass photo={photos.cover} className="t33-cover-glass" />
          <h1 className="t33-names" style={{ fontSize: `${nameSize}px` }}>
            <span className="t33-n1">{data.groom}</span>
            <span className="t33-n2">
              <i>&amp;</i>
              {data.bride}
            </span>
          </h1>
          <p className="t33-date">
            {d.day} · {d.month} · {d.year}
          </p>
          <p className="t33-hint">Cuộn xuống</p>
          <div className="t33-fly">
            <img src={butterfly} alt="" />
          </div>
        </section>

        {/* ---------- everything else: a white sheet in a clear glass rim ---------- */}
        <div className="t33-sheet">
          <div className="t33-paper">
            {/* families, names, invitation */}
            <section className="t33-sec t33-invite">
              <img className="t33-sprig t33-sprig-tr" src={cosmos} alt="" />
              <img className="t33-sprig t33-sprig-bl" src={blue} alt="" />
              <p className="t33-caps" data-anim="up">
                Trân trọng báo tin lễ thành hôn
              </p>
              <div className="t33-fams" data-anim="up">
                <div>
                  <b>Nhà trai</b>
                  {data.families.groom.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
                <i />
                <div>
                  <b>Nhà gái</b>
                  {data.families.bride.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
              </div>
              <div className="t33-couple">
                <div data-anim="left">
                  <h2>{data.groom}</h2>
                  <p>Chú rể</p>
                </div>
                <i data-anim="zoom">&amp;</i>
                <div data-anim="right">
                  <h2>{data.bride}</h2>
                  <p>Cô dâu</p>
                </div>
              </div>
              <div className="t33-invite-line" data-anim="up">
                <p className="t33-caps">Trân trọng kính mời</p>
                <p className="t33-script t33-guest">{guest || "Quý khách"}</p>
                <p className="t33-lead">
                  đến dự buổi tiệc chung vui
                  <br />
                  cùng gia đình chúng tôi
                </p>
              </div>
            </section>

            {/* date and time */}
            <section className="t33-sec">
              <h2 className="t33-title" data-anim="up">
                Ngày chung đôi
              </h2>
              <Rule />
              <div className="t33-day" data-anim="zoom">
                <span>{titleCase(d.weekday)}</span>
                <b>{d.day}</b>
                <span>
                  Tháng {Number(d.month)}
                  <br />
                  {d.year}
                </span>
              </div>
              <p className="t33-lead" data-anim="up">
                Tiệc cưới lúc {d.time.replace(":", " giờ ")}
              </p>
              <div data-anim="up">
                <LunarNote iso={data.weddingISO} className="t33-lunar" />
              </div>
            </section>

            {/* venue */}
            <section className="t33-sec t33-venue">
              <h2 className="t33-title" data-anim="up">
                Địa điểm
              </h2>
              <Rule />
              <div className="t33-glade" data-anim="zoom" />
              <h3 data-anim="up">{data.venueName}</h3>
              <p className="t33-address" data-anim="up">
                {data.venueAddress}
              </p>
              <div className="t33-actions" data-anim="up">
                <VenueActions data={data} />
              </div>
            </section>

            {/* album */}
            <section className="t33-sec t33-album-sec">
              <img className="t33-sprig t33-sprig-tl" src={cosmos} alt="" />
              <h2 className="t33-title" data-anim="up">
                Khoảnh khắc
              </h2>
              <Rule />
              <div className="t33-album">
                {album.map(({ p, land, low }, i) => (
                  <div
                    key={p.key}
                    className={land ? "t33-wide" : `t33-tall ${low ? "t33-low" : ""}`}
                    data-anim={land ? "zoom" : low ? "right" : "left"}
                    style={{ transitionDelay: `${(i % 2) * 0.12}s` }}
                  >
                    <Glass photo={p} />
                  </div>
                ))}
              </div>
              <p className="t33-quote" data-anim="up">
                “Gặp nhau giữa mùa hoa nở,
                <br />
                thương nhau suốt những mùa sau.”
              </p>
            </section>

            {/* calendar and countdown */}
            <section className="t33-sec t33-cal">
              <h2 className="t33-title" data-anim="up">
                Tháng {Number(d.month)} · {d.year}
              </h2>
              <Rule />
              <div className="t33-card" data-anim="up">
                <CalendarCard iso={data.weddingISO} />
              </div>
              <p className="t33-caps t33-gap" data-anim="up">
                Cùng đếm ngược
              </p>
              <div data-anim="up">
                <Countdown iso={data.weddingISO} />
              </div>
            </section>

            {/* programme */}
            <section className="t33-sec">
              <h2 className="t33-title" data-anim="up">
                Lịch trình
              </h2>
              <Rule />
              <div className="t33-program">
                {data.timeline.map((s, i) => (
                  <div key={s.time} className="t33-step" data-anim="left" style={{ transitionDelay: `${i * 0.15}s` }}>
                    <span className="t33-step-time">{s.time}</span>
                    <i />
                    <span className="t33-step-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* RSVP */}
            <section className="t33-sec t33-rsvp">
              <div className="t33-card" data-anim="up">
                <RsvpForm data={data} title="Xác nhận tham dự" />
              </div>
            </section>

            {/* gift */}
            <section className="t33-sec t33-gift">
              <h2 className="t33-title" data-anim="up">
                Hộp mừng cưới
              </h2>
              <Rule />
              <img className="t33-gift-art" src={gift} alt="" data-anim="zoom" />
              <div data-anim="up">
                <GiftCard data={data} />
              </div>
            </section>

            {/* thanks */}
            <footer className="t33-sec t33-thanks">
              <div data-anim="zoom">
                <Glass photo={photos.destiny} className="t33-thanks-glass" />
              </div>
              <h2 className="t33-title" data-anim="up">
                Cảm ơn bạn
              </h2>
              <p className="t33-lead" data-anim="up">
                Sự hiện diện của bạn là
                <br />
                niềm vui lớn nhất của chúng tôi
              </p>
              <p className="t33-caps t33-sign" data-anim="up">
                {data.groom} · {data.bride}
              </p>
              <div className="t33-foot" />
            </footer>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Template33;
