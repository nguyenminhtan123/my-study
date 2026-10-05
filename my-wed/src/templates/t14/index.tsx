import { ReactNode, TouchEvent, useEffect, useRef, useState } from "react";
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
import { Couple, FlowerArch, Ring3D } from "@/templates/t14/scene";

const GAP = 700; // distance between arches along the aisle
const AHEAD = 320; // how far in front of the camera the current arch stands

interface Stop {
  title: string;
  body: ReactNode;
}

const Template14 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const [entered, setEntered] = useState(false);
  const [stop, setStop] = useState(0);
  const [cardOn, setCardOn] = useState(false);
  const touchY = useRef<number | null>(null);

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
  const last = stops.length; // index of the final altar scene
  const finale = stop === last;

  // Show the info card only after the camera has arrived.
  useEffect(() => {
    if (!entered) return;
    setCardOn(false);
    const t = setTimeout(() => setCardOn(true), 1500);
    return () => clearTimeout(t);
  }, [stop, entered]);

  const go = (delta: number) =>
    setStop((s) => Math.min(last, Math.max(0, s + delta)));

  const onTouchStart = (e: TouchEvent) => {
    touchY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchY.current === null) return;
    const dy = touchY.current - e.changedTouches[0].clientY;
    touchY.current = null;
    if (Math.abs(dy) > 50) go(dy > 0 ? 1 : -1);
  };

  const camZ = stop * GAP - AHEAD;

  return (
    <Page className="t14-root">
      {/* gate */}
      <div className={`t14-gate ${entered ? "t14-gate-open" : ""}`}>
        <div className="t14-gate-arch">
          <FlowerArch seed={9} />
        </div>
        <div className="t14-doors">
          <div className="t14-door t14-door-l" />
          <div className="t14-door t14-door-r" />
        </div>
        <div className="t14-gate-text">
          <p>Welcome to our wedding</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <button type="button" onClick={() => setEntered(true)}>
            Mở cửa lễ đường
          </button>
        </div>
      </div>

      {/* 3D aisle */}
      <div
        className={`t14-world ${entered ? "t14-on" : ""} ${finale ? "t14-at-end" : ""}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="t14-glow" />
        <div className="t14-cam" style={{ transform: `translateZ(${camZ}px)` }}>
          <div className="t14-floor" />
          {Array.from({ length: last + 1 }, (_, i) => (
            <div
              key={i}
              className={`t14-arch ${i < stop ? "t14-passed" : ""}`}
              style={{ transform: `translate3d(-50%, -58%, ${-i * GAP}px)` }}
            >
              <FlowerArch seed={i} />
            </div>
          ))}
          {Array.from({ length: (last + 1) * 2 }, (_, i) => (
            <div
              key={`p${i}`}
              className="t14-posts"
              style={{
                transform: `translate3d(-50%, 0, ${-i * (GAP / 2) - GAP / 4}px)`,
              }}
            >
              <span />
              <span />
            </div>
          ))}
        </div>
        <Drifters kind="petal" count={10} color="#f6d6dc" opacity={0.85} />

        {!finale && (
          <div className={`t14-card ${cardOn ? "t14-card-on" : ""}`}>
            <p className="t14-step">
              Chặng {stop + 1}/{last} · {stops[stop].title}
            </p>
            <div className="t14-card-body">{stops[stop].body}</div>
          </div>
        )}

        <div
          className={`t14-finale ${finale && cardOn ? "t14-finale-on" : ""}`}
        >
          <div className="t14-sun" />
          <div className="t14-stage">
            <div className="t14-layer t14-l-back">
              <FlowerArch seed={4} />
            </div>
            <div className="t14-layer t14-l-mid">
              <Couple />
            </div>
            <div className="t14-layer t14-l-front">
              <Ring3D />
            </div>
          </div>
          <div className="t14-final-text">
            <h2>
              {data.groom}
              <i>&amp;</i>
              {data.bride}
            </h2>
            <p>Cảm ơn bạn đã cùng chúng mình đi hết con đường này</p>
          </div>
        </div>

        <nav className="t14-nav">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={stop === 0}
            aria-label="Quay lại"
          >
            ‹
          </button>
          <div className="t14-dots">
            {Array.from({ length: last + 1 }, (_, i) => (
              <i
                key={i}
                className={i === stop ? "on" : i < stop ? "done" : ""}
              />
            ))}
          </div>
          {finale ? (
            <button
              type="button"
              className="t14-next"
              onClick={() => setStop(0)}
            >
              Xem lại từ đầu
            </button>
          ) : (
            <button type="button" className="t14-next" onClick={() => go(1)}>
              {stop === last - 1 ? "Đến lễ đường" : "Tiếp tục"} ›
            </button>
          )}
        </nav>
      </div>
    </Page>
  );
};

export default Template14;
