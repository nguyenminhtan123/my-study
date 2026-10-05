import { ReactNode, TouchEvent, useEffect, useRef, useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t14/styles.scss";
import { WeddingData } from "@/core/types";
import { dateParts } from "@/templates/_kit/date";
import {
  Countdown,
  GiftCard,
  RsvpForm,
  VenueActions,
  photoSrc,
} from "@/templates/_kit/sections";
import type { World } from "@/templates/t14/world";

interface Stop {
  title: string;
  body: ReactNode;
}

const Template14 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const [entered, setEntered] = useState(false);
  const [stop, setStop] = useState(0);
  const [cardOn, setCardOn] = useState(false);
  const [noGL, setNoGL] = useState(false);
  const touchY = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<World | null>(null);

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

  // three.js is loaded on demand so the other templates stay light.
  useEffect(() => {
    let cancelled = false;
    import("@/templates/t14/world")
      .then(({ createWorld }) => {
        if (cancelled || !canvasRef.current) return;
        try {
          worldRef.current = createWorld(canvasRef.current, {
            stops: last,
            photo: photoSrc(data.photos.couple),
          });
        } catch {
          setNoGL(true);
        }
      })
      .catch(() => setNoGL(true));
    return () => {
      cancelled = true;
      worldRef.current?.dispose();
      worldRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (entered) worldRef.current?.setStop(stop);
  }, [stop, entered]);

  // Show the info card only after the camera has arrived.
  useEffect(() => {
    if (!entered) return;
    setCardOn(false);
    const t = setTimeout(() => setCardOn(true), stop === 0 ? 3000 : 1900);
    return () => clearTimeout(t);
  }, [stop, entered]);

  const enter = () => {
    setEntered(true);
    worldRef.current?.open();
  };
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

  return (
    <Page className={`t14-root ${noGL ? "t14-nogl" : ""}`}>
      <canvas ref={canvasRef} className="t14-canvas" />
      <div className="t14-vignette" />

      {/* gate: the doors are 3D, this is the text and button over them */}
      <div className={`t14-gate ${entered ? "t14-gate-open" : ""}`}>
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

      <div
        className={`t14-world ${entered ? "t14-on" : ""}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {!finale && (
          <div className={`t14-card ${cardOn ? "t14-card-on" : ""}`}>
            <p className="t14-step">
              {String(stop + 1).padStart(2, "0")} /{" "}
              {String(last).padStart(2, "0")} · {stops[stop].title}
            </p>
            <div className="t14-card-body">{stops[stop].body}</div>
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
