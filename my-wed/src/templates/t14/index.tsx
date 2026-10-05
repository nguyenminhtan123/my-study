import {
  CSSProperties,
  ReactNode,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t14/styles.scss";
import { WeddingData } from "@/core/types";
import { Drifters } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  Countdown,
  GiftCard,
  RsvpForm,
  VenueActions,
  photoSrc,
} from "@/templates/_kit/sections";

interface Stop {
  title: string;
  body: ReactNode;
}

const GUST_MS = 1700; // the gust blows the card away; the next card rides in at the tail of it

// one gust of hearts: fixed pseudo-random values so every gust looks the same on re-render
const GUST = Array.from({ length: 26 }, (_, i) => ({
  top: 12 + ((i * 37) % 76),
  size: 16 + ((i * 7) % 22),
  delay: (i * 53) % 520,
  dur: 1250 + ((i * 131) % 600),
  sway: 20 + ((i * 11) % 40),
  tone: i % 4,
}));

const Heart = ({ tone }: { tone: number }) => (
  <svg viewBox="0 0 24 22" aria-hidden="true">
    <path
      d="M12 21S3.6 15.9 1.5 10.7C-.2 6.5 2.3 2.4 6 2.1c2.4-.2 4.4 1.1 6 3.2 1.6-2.1 3.6-3.4 6-3.2 3.7.3 6.2 4.4 4.5 8.6C20.4 15.9 12 21 12 21z"
      fill={`url(#t14-heart-${tone})`}
    />
    <path
      d="M6.3 5.2c-1.6.3-2.7 1.9-2.4 3.6"
      stroke="#fff"
      strokeOpacity=".7"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const Template14 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const [entered, setEntered] = useState(false);
  const [gust, setGust] = useState(0); // bumps on every move so the hearts replay
  const [dir, setDir] = useState(1); // 1 = forward (wind blows left to right), -1 = back
  const touchX = useRef<number | null>(null);
  const touchInCard = useRef(false);
  const [shown, setShown] = useState(0); // which stop's card is on screen
  const [cardOn, setCardOn] = useState(false);
  const [busy, setBusy] = useState(false);
  const touchY = useRef<number | null>(null);
  const timers = useRef<number[]>([]);

  const stops: Stop[] = [
    {
      title: "Lời mời",
      body: (
        <>
          <p className="t14-eyebrow">
            Trân trọng kính mời bạn đến dự lễ thành hôn của
          </p>
          <h2 className="t14-names">
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h2>
          <div className="t14-fam">
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
        </>
      ),
    },
    {
      title: "Thời gian",
      body: (
        <>
          <p className="t14-eyebrow">
            {d.weekday} · {d.time}
          </p>
          <p className="t14-big">
            {d.day}
            <span>.</span>
            {d.month}
            <span>.</span>
            {d.year}
          </p>
          <Countdown iso={data.weddingISO} />
        </>
      ),
    },
    {
      title: "Địa điểm",
      body: (
        <>
          <p className="t14-eyebrow">Hôn lễ được tổ chức tại</p>
          <h3 className="t14-venue">{data.venueName}</h3>
          <p className="t14-addr">{data.venueAddress}</p>
          <VenueActions data={data} />
        </>
      ),
    },
    {
      title: "Chương trình",
      body: (
        <ol className="t14-steps">
          {data.timeline.map((s) => (
            <li key={s.time}>
              <b>{s.time}</b>
              <span>{s.label}</span>
            </li>
          ))}
        </ol>
      ),
    },
    {
      title: "Khoảnh khắc",
      body: (
        <div className="t14-photos">
          {data.album.map((p) => (
            <img key={p.key} src={photoSrc(p)} alt="" />
          ))}
        </div>
      ),
    },
    {
      title: "Xác nhận tham dự",
      body: <RsvpForm data={data} variant="select" title="" />,
    },
    { title: "Mừng cưới", body: <GiftCard data={data} /> },
  ];
  const last = stops.length; // index of the altar
  const finale = shown === last;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const enter = () => {
    setEntered(true);
    setBusy(true);
    later(() => {
      setCardOn(true);
      setBusy(false);
    }, 2600);
  };

  // Hide the card, walk, swap the content, then show the card: never the other way round.
  const goTo = (target: number) => {
    if (busy || target < 0 || target > last || target === shown) return;
    setBusy(true);
    setDir(target > shown ? 1 : -1);
    setCardOn(false); // the card is swept away by the same gust
    setGust((g) => g + 1);
    later(() => {
      setShown(target);
      setCardOn(true);
    }, GUST_MS);
    later(() => setBusy(false), GUST_MS + 500);
  };

  // Swipe with the wind (finger left to right) to go on, against it to go back. Up/down also works,
  // except inside a card whose content scrolls.
  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    touchY.current = e.touches[0].clientY;
    touchInCard.current = !!(e.target as HTMLElement).closest?.(
      ".t14-card-body",
    );
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null || touchY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    const dy = touchY.current - e.changedTouches[0].clientY;
    touchX.current = touchY.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      goTo(shown + (dx > 0 ? 1 : -1));
    } else if (Math.abs(dy) > 50 && !touchInCard.current) {
      goTo(shown + (dy > 0 ? 1 : -1));
    }
  };

  return (
    <Page className="t14-root">
      <div className={`t14-scene ${entered ? "t14-entered" : ""}`}>
        <div className="t14-cam">
          <div className="t14-photo" />
        </div>
        <div className="t14-veil" />
        <div
          className={`t14-portrait ${finale && cardOn ? "t14-portrait-on" : ""}`}
        >
          <img src={photoSrc(data.photos.cover)} alt="" />
        </div>
        <Drifters kind="heart" count={7} color="#f3c2c4" opacity={0.75} />
        <svg className="t14-defs" aria-hidden="true">
          <defs>
            {[
              ["#ffd6dc", "#e98a9b"],
              ["#ffe1e4", "#ef9fae"],
              ["#f7d9a8", "#c9965a"],
              ["#ffc2cc", "#d0607a"],
            ].map(([a, b], i) => (
              <linearGradient
                key={i}
                id={`t14-heart-${i}`}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0" stopColor={a} />
                <stop offset="1" stopColor={b} />
              </linearGradient>
            ))}
          </defs>
        </svg>
        {gust > 0 && (
          <div
            className="t14-gust"
            key={gust}
            style={{ transform: `scaleX(${dir})` }}
          >
            {GUST.map((h, i) => (
              <span
                key={i}
                className="t14-gust-h"
                style={
                  {
                    top: `${h.top}%`,
                    width: h.size,
                    animationDelay: `${h.delay}ms`,
                    animationDuration: `${h.dur}ms`,
                    "--sway": `${h.sway}px`,
                  } as CSSProperties
                }
              >
                <i style={{ animationDelay: `${h.delay}ms` }}>
                  <Heart tone={h.tone} />
                </i>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* gate: sheer curtains over the aisle */}
      <div className={`t14-gate ${entered ? "t14-gate-open" : ""}`}>
        <div className="t14-curtain t14-curtain-l" />
        <div className="t14-curtain t14-curtain-r" />
        <div className="t14-pelmet" />
        <div className="t14-gate-text">
          <p>Welcome to our wedding</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <p className="t14-gate-date">
            {d.day} · {d.month} · {d.year}
          </p>
          <div className="t14-gate-rule" />
          <button type="button" onClick={enter}>
            Mở cửa lễ đường
          </button>
        </div>
      </div>

      {entered && (
        <div
          className="t14-ui"
          style={{ "--dir": dir } as CSSProperties}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <header
            className={`t14-head ${cardOn && !finale ? "t14-head-on" : ""}`}
          >
            <p>
              {data.groom} <i>&amp;</i> {data.bride}
            </p>
            <h2>{stops[Math.min(shown, last - 1)].title}</h2>
            <span>
              {String(Math.min(shown, last - 1) + 1).padStart(2, "0")} /{" "}
              {String(last).padStart(2, "0")}
            </span>
          </header>
          {!finale && (
            <div
              key={shown}
              className={`t14-card ${cardOn ? "t14-card-on" : "t14-card-out"}`}
            >
              <div className="t14-card-body">{stops[shown].body}</div>
            </div>
          )}

          <div
            className={`t14-finale ${finale && cardOn ? "t14-finale-on" : ""}`}
          >
            <h2>
              {data.groom}
              <i>&amp;</i>
              {data.bride}
            </h2>
            <p>Cảm ơn bạn đã cùng chúng mình đi hết con đường này</p>
          </div>

          <nav className="t14-nav">
            <button
              type="button"
              onClick={() => goTo(shown - 1)}
              disabled={busy || shown === 0}
              aria-label="Quay lại"
            >
              ‹
            </button>
            <div className="t14-dots">
              {Array.from({ length: last + 1 }, (_, i) => (
                <i
                  key={i}
                  className={i === shown ? "on" : i < shown ? "done" : ""}
                />
              ))}
            </div>
            {finale ? (
              <button
                type="button"
                className="t14-next"
                disabled={busy}
                onClick={() => goTo(0)}
              >
                Xem lại từ đầu
              </button>
            ) : (
              <button
                type="button"
                className="t14-next"
                disabled={busy}
                onClick={() => goTo(shown + 1)}
              >
                {shown === last - 1 ? "Đến lễ đường" : "Tiếp tục"} ›
              </button>
            )}
          </nav>
        </div>
      )}
    </Page>
  );
};

export default Template14;
