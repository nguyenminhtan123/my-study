import { ReactNode, TouchEvent, useEffect, useRef, useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t14/styles.scss";
import { WeddingData } from "@/core/types";
import coupleVector from "@/static/couple-vector.svg";
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

const CARD_OUT_MS = 380; // card fades out before we start walking
const WALK_MS = 1800; // must match the transition on .t14-arch / .t14-walking

const Template14 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const [entered, setEntered] = useState(false);
  const [pos, setPos] = useState(0); // where the walk is heading (drives the arches)
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
    setCardOn(false);
    later(() => setPos(target), CARD_OUT_MS);
    later(() => {
      setShown(target);
      setCardOn(true);
      setBusy(false);
    }, CARD_OUT_MS + WALK_MS);
  };

  const onTouchStart = (e: TouchEvent) => {
    touchY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchY.current === null) return;
    const dy = touchY.current - e.changedTouches[0].clientY;
    touchY.current = null;
    if (Math.abs(dy) > 50) goTo(shown + (dy > 0 ? 1 : -1));
  };

  const walking = busy && pos !== shown;

  return (
    <Page className="t14-root">
      <div
        className={`t14-scene ${entered ? "t14-entered" : ""} ${walking ? "t14-walking" : ""} ${pos === last ? "t14-at-altar" : ""}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="t14-sky" />
        <div className="t14-glow" />
        <div className="t14-ground" />
        <div className="t14-runner" />
        <div className="t14-bank t14-bank-l" />
        <div className="t14-bank t14-bank-r" />

        {Array.from({ length: last + 1 }, (_, i) => {
          const rel = i - pos;
          const scale = rel >= 0 ? 1 / (1 + rel * 0.85) : 2.6;
          return (
            <div
              key={i}
              className={`t14-arch ${i === last ? "t14-arch-altar" : ""}`}
              style={{
                transform: `scale(${scale})`,
                opacity: rel < 0 ? 0 : rel > 2 ? 0 : 1,
                zIndex: 20 - i,
              }}
            >
              <div className="t14-arch-flowers" />
            </div>
          );
        })}

        <img
          className={`t14-couple ${finale && cardOn ? "t14-couple-on" : ""}`}
          src={coupleVector}
          alt=""
        />
        <Drifters kind="petal" count={10} color="#f7d4dc" opacity={0.9} />
      </div>

      {/* gate */}
      <div className={`t14-gate ${entered ? "t14-gate-open" : ""}`}>
        <div className="t14-gate-arch">
          <div className="t14-arch-flowers" />
          <div className="t14-doors">
            <div className="t14-door t14-door-l" />
            <div className="t14-door t14-door-r" />
          </div>
        </div>
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
          <button type="button" onClick={enter}>
            Mở cửa lễ đường
          </button>
        </div>
      </div>

      {entered && (
        <div className="t14-ui">
          {!finale && (
            <div className={`t14-card ${cardOn ? "t14-card-on" : ""}`}>
              <p className="t14-step">
                {String(shown + 1).padStart(2, "0")} /{" "}
                {String(last).padStart(2, "0")} · {stops[shown].title}
              </p>
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
