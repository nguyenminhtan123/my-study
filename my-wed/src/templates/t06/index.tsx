import { CSSProperties } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t06/styles.scss";
import { WeddingData } from "@/core/types";
import hydrangea from "@/static/hydrangea-white.jpg";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import { IconPin } from "@/templates/_kit/icons";
import { GiftCard, RsvpForm, photoSrc } from "@/templates/_kit/sections";
import { openLink } from "@/core/utils/open-link";
import { buildMapUrl } from "@/core/utils/wedding";

/** Shared gradients and soft shadow for the paper flowers and clovers (rendered once). */
const PaperDefs = () => (
  <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
    <defs>
      <filter id="t06-sh" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow
          dx="0"
          dy="3"
          stdDeviation="3"
          floodColor="#4f6a58"
          floodOpacity="0.38"
        />
      </filter>
      <radialGradient id="t06-pet" cx="0.5" cy="0.75" r="0.9">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.65" stopColor="#f4f7f4" />
        <stop offset="1" stopColor="#dde6df" />
      </radialGradient>
      <linearGradient id="t06-leaf" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0" stopColor="#6fcf6a" />
        <stop offset="0.55" stopColor="#2e8a3e" />
        <stop offset="1" stopColor="#14602a" />
      </linearGradient>
    </defs>
  </svg>
);

/** Five-petal layered paper flower. */
const Bloom = ({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => (
  <svg
    className={`t06-bloom ${className}`}
    style={style}
    viewBox="-50 -50 100 100"
    aria-hidden="true"
  >
    <g filter="url(#t06-sh)">
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse
          key={r}
          cx="0"
          cy="-22"
          rx="17"
          ry="25"
          fill="url(#t06-pet)"
          stroke="#d6e0d8"
          strokeWidth="0.8"
          transform={`rotate(${r})`}
        />
      ))}
      {[36, 108, 180, 252, 324].map((r) => (
        <ellipse
          key={r}
          cx="0"
          cy="-14"
          rx="10"
          ry="16"
          fill="url(#t06-pet)"
          stroke="#dbe4dd"
          strokeWidth="0.6"
          transform={`rotate(${r})`}
        />
      ))}
      <circle r="5" fill="#e6efc4" />
      <circle r="2" fill="#c9d98a" />
    </g>
  </svg>
);

/** Glossy four-leaf clover. */
const Clover = ({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => (
  <svg
    className={`t06-clover ${className}`}
    style={style}
    viewBox="-40 -40 80 100"
    aria-hidden="true"
  >
    <g filter="url(#t06-sh)">
      <path
        d="M2 4C4 22 12 40 22 50"
        fill="none"
        stroke="#1d6b30"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {[45, 135, 225, 315].map((r) => (
        <g key={r} transform={`rotate(${r})`}>
          <path
            d="M0 0 C-4 -14 -22 -22 -26 -8 C-29 4 -12 8 0 0Z"
            fill="url(#t06-leaf)"
          />
          <path
            d="M-3 -2 C-9 -10 -16 -12 -20 -9"
            fill="none"
            stroke="#b9f0b0"
            strokeWidth="1.2"
            opacity="0.55"
          />
        </g>
      ))}
    </g>
  </svg>
);

const SCATTER = [
  { x: 6, y: 12, s: 74, d: 0, dur: 16 },
  { x: 58, y: 4, s: 56, d: -4, dur: 20 },
  { x: 36, y: 36, s: 90, d: -2, dur: 18 },
  { x: 74, y: 40, s: 66, d: -9, dur: 22 },
  { x: 12, y: 62, s: 60, d: -6, dur: 19 },
  { x: 52, y: 70, s: 78, d: -11, dur: 17 },
  { x: 82, y: 76, s: 48, d: -3, dur: 21 },
];

const Template06 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const mono = `${data.groom.charAt(0)}${data.bride.charAt(0)}`;
  const album = [data.album[0], data.album[1], data.album[2], data.album[3]];

  return (
    <Page className="t06-root">
      <PaperDefs />
      <Drifters kind="petal" count={9} color="#ffffff" opacity={0.95} />

      {/* 1. cover */}
      <section className="t06-cover">
        <div className="t06-top">
          <img src={hydrangea} alt="" />
        </div>
        <div className="t06-mono">{mono}</div>
        <div className="t06-torn">
          <img src={photoSrc(data.photos.cover)} alt="" />
        </div>
        <Bloom className="t06-cv-bloom" />
        <Clover className="t06-cv-clover-l" />
        <Clover className="t06-cv-clover-r" />
        <p className="t06-cover-names">
          {data.groom} &amp; {data.bride}
          <span>
            {d.day}.{d.month}.{d.year}
          </span>
        </p>
      </section>

      {/* 2. invitation */}
      <section className="t06-invite">
        <Reveal>
          <p className="t06-cap">Thân mời đến dự lễ thành hôn của chúng tôi!</p>
          <h2>
            {data.groom}
            <i>&amp;</i>
            <br />
            {data.bride}
          </h2>
          <p className="t06-cap">Được tổ chức vào lúc</p>
          <div className="t06-paper">
            <b>
              {d.time} | {d.weekday}
            </b>
            <span>
              {d.day} . {d.month} . {d.year}
            </span>
          </div>
          <p className="t06-cap">Địa điểm</p>
          <h3>{data.venueName}</h3>
          <p className="t06-addr">{data.venueAddress}</p>
          <button
            type="button"
            className="t06-direction"
            onClick={() => openLink(buildMapUrl(data.venueQuery))}
          >
            <IconPin /> CHỈ ĐƯỜNG
          </button>
        </Reveal>
        <Clover className="t06-in-clover" />
      </section>

      {/* 3. envelope with polaroids + wax seal */}
      <section className="t06-env">
        <Reveal variant="fade">
          <div className="t06-envelope">
            <div className="t06-back" />
            <img
              className="t06-pola t06-pola1"
              src={photoSrc(data.photos.couple)}
              alt=""
            />
            <img
              className="t06-pola t06-pola2"
              src={photoSrc(data.album[0])}
              alt=""
            />
            <div className="t06-front" />
            <div className="t06-flap" />
            <div className="t06-wax">
              <span>{mono}</span>
            </div>
            <div className="t06-tag">
              {data.groom} {data.bride}
            </div>
            <Bloom className="t06-env-bloom" />
          </div>
        </Reveal>
      </section>

      {/* 4. wide torn photo with SAVE The DATE */}
      <section className="t06-wide">
        <img src={photoSrc(data.album[1])} alt="" />
        <Reveal>
          <p className="t06-save">
            SAVE <i>The</i> DATE
          </p>
        </Reveal>
      </section>

      {/* 5. scattered paper flowers (animated) */}
      <section className="t06-scatter" aria-hidden="true">
        {SCATTER.map((f, i) => (
          <Bloom
            key={i}
            className="t06-sc"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: f.s,
              animationDuration: `${f.dur}s`,
              animationDelay: `${f.d}s`,
            }}
          />
        ))}
      </section>

      {/* 6. couple frames */}
      <section className="t06-frames">
        <Reveal variant="left" className="t06-fr t06-fr-groom">
          <img src={photoSrc(data.photos.couple)} alt="" />
          <p>
            <i>Chú rể</i>
            {data.groom}
          </p>
        </Reveal>
        <Reveal variant="right" delay={160} className="t06-fr t06-fr-bride">
          <img src={photoSrc(data.photos.destiny)} alt="" />
          <p>
            <i>Cô dâu</i>
            {data.bride}
          </p>
        </Reveal>
        <Clover className="t06-fr-clover" />
      </section>

      {/* 7. album collage */}
      <section className="t06-album">
        <Reveal>
          <h2 className="t06-album-title">
            <i>The</i> ALBUM
          </h2>
        </Reveal>
        <div className="t06-collage">
          <div className="t06-col">
            {[album[0], album[1], album[2], album[3]].map((photo, i) => (
              <Reveal key={photo.key} variant="left" delay={i * 120}>
                <img
                  src={photoSrc(photo)}
                  alt=""
                  className={`t06-ph t06-ph${i + 1}`}
                />
              </Reveal>
            ))}
          </div>
          <Reveal variant="right" className="t06-big">
            <img src={photoSrc(data.photos.cover)} alt="" />
            <p>
              WHISPERS
              <span>AFFECTION</span>
            </p>
          </Reveal>
        </div>
        <Bloom className="t06-al-bloom" />
        <Clover className="t06-al-clover" />
      </section>

      {/* 8. RSVP */}
      <section className="t06-form">
        <Reveal>
          <RsvpForm data={data} variant="select" title="Xác nhận tham dự" />
        </Reveal>
      </section>

      {/* 9. gift + closing photo */}
      <section className="t06-gift">
        <Reveal>
          <GiftCard data={data} />
        </Reveal>
      </section>
      <section className="t06-end">
        <img src={photoSrc(data.album[3])} alt="" />
      </section>
    </Page>
  );
};

export default Template06;
