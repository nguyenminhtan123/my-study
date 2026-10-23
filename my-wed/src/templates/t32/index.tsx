import { useEffect, useMemo, useRef, useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t32/styles.scss";
import { PhotoSlot, WeddingData } from "@/core/types";
import bouquet from "@/static/t32/bouquet.webp";
import cake from "@/static/t32/cake.webp";
import corner from "@/static/t32/corner.webp";
import garland from "@/static/t32/garland.webp";
import gift from "@/static/t32/gift.webp";
import glasses from "@/static/t32/glasses.webp";
import heart from "@/static/t32/heart.webp";
import petal1 from "@/static/t32/petal1.webp";
import petal2 from "@/static/t32/petal2.webp";
import rings from "@/static/t32/rings.webp";
import rose from "@/static/t32/rose.webp";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Countdown,
  GiftCard,
  GuestName,
  LunarNote,
  RsvpForm,
  VenueActions,
  photoSrc,
} from "@/templates/_kit/sections";

// "CHỦ NHẬT" -> "Chủ Nhật"
const titleCase = (s: string) =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/** The one photo frame: a bright arch (white mat, soft shadow, gold hairline). */
const Arch = ({ photo, className = "" }: { photo: PhotoSlot; className?: string }) => (
  <div className={`t32-arch ${className}`}>
    <img src={photoSrc(photo)} alt={photo.label} />
  </div>
);

const Hearts = () => (
  <p className="t32-hearts">
    <span>♥</span> <span>♥</span> <span>♥</span>
  </p>
);

// a picture for each step of the programme, in turn
const STEP_ART = [glasses, rings, cake];
const PETALS = [petal1, petal2];

/** Petals thrown out from a point on the screen (fixed layer, removed when they land). */
const burst = (x: number, y: number, n: number) => {
  for (let i = 0; i < n; i++) {
    const p = document.createElement("img");
    p.className = "t32-burst";
    p.src = PETALS[i % 2];
    const size = 12 + Math.random() * 14;
    Object.assign(p.style, { width: `${size}px`, left: `${x - size / 2}px`, top: `${y - size / 2}px` });
    document.body.appendChild(p);
    const ang = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 120;
    p.animate(
      [
        { transform: "translate(0,0) rotate(0deg) scale(0.6)", opacity: 1 },
        {
          transform: `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist + 50}px) rotate(${Math.random() * 540 - 270}deg) scale(1)`,
          opacity: 0,
        },
      ],
      { duration: 1200 + Math.random() * 600, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
    ).onfinish = () => p.remove();
  }
};

const Template32 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const [giftOpen, setGiftOpen] = useState(false);
  const { photos } = data;
  const root = useRef<HTMLDivElement>(null);
  const bouquetPiece = useRef<HTMLDivElement>(null);
  const heartPiece = useRef<HTMLDivElement>(null);
  const traveller = useRef<HTMLDivElement>(null);
  const giftImg = useRef<HTMLImageElement>(null);

  // drifting petals: a few at a time, each with its own place, size and speed
  const drift = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        src: PETALS[i % 2],
        left: `${Math.round(Math.random() * 95)}%`,
        width: `${14 + Math.round(Math.random() * 12)}px`,
        animationDuration: `${10 + Math.random() * 8}s`,
        animationDelay: `${-Math.random() * 18}s`,
      })),
    [],
  );

  useEffect(() => {
    const host = root.current;
    const pieces = [bouquetPiece.current, heartPiece.current];
    const fly = traveller.current;
    const box = giftImg.current;
    if (!host || !pieces[0] || !pieces[1] || !fly || !box) return undefined;
    const [, heartEl] = pieces as HTMLDivElement[];

    // entrances: every block rises in, staggered; photos zoom, dividers grow, programme rows slide
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("t32-in")),
      { threshold: 0.15 },
    );
    host.querySelectorAll("[data-anim]").forEach((el) => reveal.observe(el));

    // the bouquet flies from the first screen into the heart of roses round the date (and back)
    const W = 130;
    const view = (el: Element) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width };
    };
    const put = (x: number, y: number, scale: number, opacity: number, turn = 0) => {
      fly.style.transform = `translate(${x - W / 2}px, ${y - W * 0.55}px) scale(${scale}) rotate(${turn}deg)`;
      fly.style.opacity = String(opacity);
    };
    const swap = (el: HTMLElement, on: boolean) => {
      el.style.transition = "none";
      el.classList.toggle("t32-here", on);
      el.getBoundingClientRect();
      el.style.transition = "";
    };
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let current = 0;
    let busy = false;
    let alive = true;
    const timers: number[] = [];
    const go = (to: number) => {
      busy = true;
      const from = pieces[current] as HTMLDivElement;
      const dest = pieces[to] as HTMLDivElement;
      const fromBouquet = from === pieces[0];
      const a = view(from);
      a.y = Math.min(innerHeight - 120, Math.max(120, a.y));
      fly.style.transition = "none";
      if (fromBouquet) {
        // the bouquet lifts straight off its place
        put(a.x, a.y, a.w / W, 1);
        swap(from, false);
        fly.getBoundingClientRect();
        fly.style.transition = "transform 0.4s ease-out";
        put(a.x, a.y, 1, 1);
      } else {
        // the heart folds back into the bouquet
        put(a.x, a.y, Math.min(1.6, a.w / W), 0);
        fly.getBoundingClientRect();
        from.classList.remove("t32-here");
        fly.style.transition = "opacity 0.3s, transform 0.4s ease-out";
        put(a.x, a.y, 1, 1);
      }
      timers.push(
        window.setTimeout(() => {
          fly.style.transition = "none";
          const t0 = performance.now();
          const land = dest === pieces[0];
          const step = (now: number) => {
            if (!alive) return;
            const p = Math.min(1, (now - t0) / 1200);
            const e = ease(p);
            const b = view(dest);
            const size = land ? 1 + (b.w / W - 1) * e : 1;
            put(
              a.x + (b.x - a.x) * e,
              a.y + (b.y - a.y) * e - Math.sin(Math.PI * p) * 70,
              size + Math.sin(Math.PI * p) * 0.12,
              1,
              Math.sin(Math.PI * p * 2) * 10,
            );
            if (p < 1) {
              requestAnimationFrame(step);
              return;
            }
            if (land) {
              swap(dest, true);
              fly.style.opacity = "0";
              burst(b.x, b.y, 18);
            } else {
              fly.style.transition = "opacity 0.45s, transform 0.45s";
              put(b.x, b.y, 1.35, 0);
              burst(b.x, b.y, 16);
              dest.classList.add("t32-here");
            }
            timers.push(
              window.setTimeout(() => {
                current = to;
                busy = false;
              }, 500),
            );
          };
          requestAnimationFrame(step);
        }, 400),
      );
    };

    // one light loop: the date section takes over once its top passes 70% of the screen; the gift box
    // pops open whenever it comes into view
    const dateSection = heartEl.closest("section") as HTMLElement;
    const loop = () => {
      if (!alive) return;
      const want = dateSection.getBoundingClientRect().top <= innerHeight * 0.7 ? 1 : 0;
      if (!busy && want !== current) go(want);
      const r = box.getBoundingClientRect();
      const seen = r.top < innerHeight * 0.92 && r.bottom > innerHeight * 0.08;
      if (seen && !box.classList.contains("t32-on")) {
        box.classList.add("t32-on");
        timers.push(
          window.setTimeout(() => {
            const q = box.getBoundingClientRect();
            burst(q.left + q.width / 2, q.top + q.height / 2, 20);
          }, 350),
        );
      } else if (r.bottom < -innerHeight * 0.2 || r.top > innerHeight * 1.2) {
        box.classList.remove("t32-on");
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    return () => {
      alive = false;
      reveal.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      document.querySelectorAll(".t32-burst").forEach((p) => p.remove());
    };
  }, []);

  // album rhythm: one large arch, then two small ones side by side, repeated
  const groups: PhotoSlot[][] = [];
  data.album.forEach((p, i) => {
    if (i % 3 === 0) groups.push([p]);
    else if (i % 3 === 1) groups.push([p]);
    else groups[groups.length - 1].push(p);
  });

  return (
    <Page className="t32-root">
      <div ref={root}>
        <div className="t32-petals" aria-hidden>
          {drift.map(({ src, ...style }, i) => (
            <img key={i} src={src} alt="" style={style} />
          ))}
        </div>
        <div className="t32-traveller" ref={traveller} aria-hidden>
          <img src={bouquet} alt="" />
        </div>

        {/* ---------- first screen: names, date and the bouquet ---------- */}
        <section className="t32-sec t32-cover">
          <div className="t32-glow" />
          <p data-anim="pop">
            <span className="t32-tag">Save the date</span>
          </p>
          <p className="t32-caps" data-anim="up">
            Lễ thành hôn
          </p>
          <h1 className="t32-names" data-anim="up">
            <span>{data.groom}</span>
            <i>&amp;</i>
            <span>{data.bride}</span>
          </h1>
          <div className="t32-dateline" data-anim="up">
            <span>{titleCase(d.weekday)}</span>
            <b>{d.day}</b>
            <span>
              Tháng {Number(d.month)}
              <br />
              {d.year}
            </span>
          </div>
          <Hearts />
          <div className="t32-live t32-here t32-bouquet" ref={bouquetPiece}>
            <img className="t32-sway" src={bouquet} alt="" />
          </div>
        </section>

        {/* ---------- families, names, invitation ---------- */}
        <section className="t32-sec t32-fam-sec">
          <div className="t32-art t32-sprig">
            <img className="t32-sway" src={corner} alt="" />
          </div>
          <p className="t32-caps t32-pad" data-anim="up">
            Trân trọng báo tin lễ thành hôn của con chúng tôi
          </p>
          <div className="t32-fams" data-anim="up">
            <div className="t32-fam">
              <b className="t32-caps">Nhà trai</b>
              {data.families.groom.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
            <span className="t32-fams-line" />
            <div className="t32-fam">
              <b className="t32-caps">Nhà gái</b>
              {data.families.bride.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </div>
          <div className="t32-couple" data-anim="up">
            <h2 className="t32-name">{data.groom}</h2>
            <p className="t32-role">Chú rể</p>
            <i className="t32-amp">&amp;</i>
            <h2 className="t32-name">{data.bride}</h2>
            <p className="t32-role">Cô dâu</p>
          </div>
          <img className="t32-rose" src={rose} alt="" data-anim="grow" />
          <div data-anim="up">
            <p className="t32-caps">Trân trọng kính mời</p>
            <GuestName className="t32-guest" />
            <p className="t32-lead">
              tới dự bữa tiệc chung vui
              <br />
              cùng gia đình chúng tôi
            </p>
          </div>
        </section>

        {/* ---------- cover photo with a rose divider across its foot ---------- */}
        <section className="t32-sec t32-photo">
          <div data-anim="zoom">
            <Arch photo={photos.cover} className="t32-cover-arch" />
          </div>
          <img className="t32-under" src={garland} alt="" data-anim="grow" />
          <p className="t32-script t32-photo-line" data-anim="up">
            Hạnh phúc là nắm tay nhau
          </p>
          <p className="t32-lead t32-muted" data-anim="up">
            đi qua mọi mùa của cuộc đời
          </p>
        </section>

        {/* ---------- date and venue: the bouquet opens into the heart of roses ---------- */}
        <section className="t32-sec t32-when">
          <div data-anim="up">
            <p className="t32-caps">Tiệc cưới diễn ra vào lúc</p>
            <p className="t32-time">{d.time.replace(":", " giờ ")}</p>
          </div>
          <div className="t32-heart">
            <div className="t32-live" ref={heartPiece}>
              <img className="t32-breathe" src={heart} alt="" />
            </div>
            <div className="t32-heart-date">
              <p className="t32-caps">{titleCase(d.weekday)}</p>
              <b>{d.day}</b>
            </div>
          </div>
          <div data-anim="up">
            <p className="t32-month-line">
              Tháng {Number(d.month)} · {d.year}
            </p>
            <LunarNote iso={data.weddingISO} className="t32-lunar" />
          </div>
          <div data-anim="up">
            <p className="t32-caps t32-gap">Địa điểm</p>
            <h3 className="t32-venue">{data.venueName}</h3>
            <p className="t32-address">{data.venueAddress}</p>
            <div className="t32-actions">
              <VenueActions data={data} />
            </div>
          </div>
        </section>

        {/* ---------- album: a large arch, then a staggered pair, repeated; the quote in its own card ---------- */}
        <section className="t32-sec t32-album">
          <div data-anim="up">
            <p className="t32-caps">Khoảnh khắc</p>
            <h2 className="t32-title">Những ngày bên nhau</h2>
          </div>
          <img className="t32-divider" src={garland} alt="" data-anim="grow" />
          {groups.map((group, i) =>
            group.length === 1 && i % 2 === 0 ? (
              <div key={group[0].key} className="t32-hero" data-anim="zoom">
                <Arch photo={group[0]} className="t32-hero-arch" />
                {i === 0 && (
                  <div className="t32-art t32-hero-sprig">
                    <img className="t32-sway" src={corner} alt="" />
                  </div>
                )}
              </div>
            ) : (
              <div key={group[0].key} className="t32-pair">
                {group.map((p, k) => (
                  <div key={p.key} data-anim={k ? "right" : "left"}>
                    <Arch photo={p} className="t32-small" />
                  </div>
                ))}
              </div>
            ),
          )}
          <div className="t32-card t32-quote" data-anim="up">
            <p className="t32-script t32-quote-mark">“</p>
            <p className="t32-lead">
              Gặp nhau là duyên,
              <br />ở bên nhau là phận
            </p>
          </div>
        </section>

        {/* ---------- calendar and countdown ---------- */}
        <section className="t32-sec t32-cal">
          <div className="t32-card t32-cal-card" data-anim="up">
            <img className="t32-art t32-cal-rose" src={rose} alt="" />
            <p className="t32-script t32-month">
              Tháng {Number(d.month)} · {d.year}
            </p>
            <CalendarCard iso={data.weddingISO} />
          </div>
          <div data-anim="up">
            <p className="t32-caps t32-gap">Cùng đếm ngược</p>
            <Countdown iso={data.weddingISO} />
          </div>
          <img className="t32-divider t32-divider-sm" src={garland} alt="" data-anim="grow" />
        </section>

        {/* ---------- programme: pictures and times either side of a dashed line ---------- */}
        <section className="t32-sec t32-prog">
          <div data-anim="up">
            <p className="t32-caps">Lịch trình</p>
            <h2 className="t32-title">Ngày chung đôi</h2>
          </div>
          <div className="t32-tl">
            {data.timeline.map((s, i) => (
              <div
                key={s.time}
                className={`t32-tl-row ${i % 2 ? "t32-flip" : ""}`}
                data-anim={i % 2 ? "right" : "left"}
                style={{ transitionDelay: `${0.15 + i * 0.2}s` }}
              >
                <img src={STEP_ART[i % STEP_ART.length]} alt="" />
                <div className="t32-tl-text">
                  <p className="t32-tl-time">{s.time}</p>
                  <p className="t32-tl-label">{titleCase(s.label)}</p>
                </div>
                <i className="t32-tl-dot" />
              </div>
            ))}
          </div>
        </section>

        {/* ---------- RSVP and the gift box ---------- */}
        <section className="t32-sec t32-rsvp">
          <div className="t32-card" data-anim="up">
            <p className="t32-caps">R · S · V · P</p>
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
          <p className="t32-caps t32-gift-caps">Mừng cưới</p>
          <button type="button" className="t32-giftbtn" onClick={() => setGiftOpen((v) => !v)}>
            <img className="t32-gift-pop" ref={giftImg} src={gift} alt="" />
            <span>{giftOpen ? "Thu gọn" : "Chạm vào hộp quà để gửi lời chúc"}</span>
          </button>
          {giftOpen && (
            <div className="t32-gift">
              <GiftCard data={data} />
            </div>
          )}
        </section>

        {/* ---------- thanks ---------- */}
        <footer className="t32-sec t32-thanks">
          <div data-anim="zoom">
            <Arch photo={photos.destiny} className="t32-thanks-arch" />
          </div>
          <div data-anim="up">
            <p className="t32-script t32-thanks-title">Trân trọng cảm ơn</p>
            <p className="t32-caps t32-ink">
              {data.groom} · {data.bride}
            </p>
            <p className="t32-lead t32-muted">
              Sự hiện diện của bạn là niềm hạnh phúc
              <br />
              của gia đình chúng tôi
            </p>
          </div>
          <Hearts />
          <img className="t32-divider t32-divider-sm" src={garland} alt="" data-anim="grow" />
        </footer>
      </div>
    </Page>
  );
};

export default Template32;
