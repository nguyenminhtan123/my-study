import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t09/styles.scss";
import { WeddingData } from "@/core/types";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  IconCamera,
  IconDinner,
  IconMusic,
  IconRings,
} from "@/templates/_kit/icons";
import {
  GiftCard,
  Mosaic,
  RsvpForm,
  VenueActions,
  photoSrc,
} from "@/templates/_kit/sections";

/** Four-petal paper hydrangea floret. */
const Floret = ({ x, y, s }: { x: number; y: number; s: number }) => (
  <g
    transform={`translate(${x} ${y}) scale(${s})`}
    fill="#ffffff"
    stroke="#d9dcef"
    strokeWidth="0.6"
  >
    {[0, 90, 180, 270].map((r) => (
      <ellipse
        key={r}
        cx="0"
        cy="-8"
        rx="7"
        ry="9"
        transform={`rotate(${r + 20})`}
      />
    ))}
    <circle r="2.2" fill="#c8cbe6" stroke="none" />
  </g>
);

const Hydrangea = ({ className = "" }: { className?: string }) => (
  <svg
    className={`t09-hydra ${className}`}
    viewBox="0 0 200 110"
    aria-hidden="true"
  >
    <defs>
      <filter id="t09-sh" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="2"
          floodColor="#5a5e9a"
          floodOpacity="0.3"
        />
      </filter>
    </defs>
    <g filter="url(#t09-sh)">
      {[
        [30, 24, 1.5],
        [70, 14, 1.3],
        [110, 28, 1.6],
        [152, 16, 1.4],
        [186, 34, 1.3],
        [50, 56, 1.4],
        [92, 60, 1.5],
        [136, 58, 1.3],
        [20, 74, 1.1],
        [172, 76, 1.2],
      ].map(([x, y, s], i) => (
        <Floret key={i} x={x} y={y} s={s} />
      ))}
    </g>
  </svg>
);

const Template09 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const mono = `${data.groom.charAt(0)}&${data.bride.charAt(0)}`;
  const steps = [
    { t: data.timeline[0], Icon: IconCamera },
    { t: data.timeline[1], Icon: IconRings },
    { t: data.timeline[2], Icon: IconDinner },
    { t: data.timeline[3], Icon: IconMusic },
  ];

  return (
    <Page className="t09-root">
      <Drifters kind="petal" count={12} color="#c8cbe6" opacity={0.9} />

      <section className="t09-cover">
        <Hydrangea />
        <div className="t09-mono">{mono}</div>
        <div className="t09-torn">
          <img src={photoSrc(data.photos.cover)} alt="" />
        </div>
        <p className="t09-cover-names">
          {data.groom} &amp; {data.bride}
          <span>
            {d.day}.{d.month}.{d.year}
          </span>
        </p>
      </section>

      <section className="t09-invite">
        <Reveal>
          <p className="t09-cap">Thân mời đến dự lễ thành hôn của chúng tôi!</p>
          <h2>
            {data.groom}
            <i>&</i>
            {data.bride}
          </h2>
          <p className="t09-cap">Được tổ chức vào lúc</p>
          <div className="t09-paper">
            <b>
              {d.time} | {d.weekday}
            </b>
            <span>
              {d.day} . {d.month} . {d.year}
            </span>
          </div>
          <p className="t09-cap">Địa điểm</p>
          <h3>{data.venueName}</h3>
          <p className="t09-addr">{data.venueAddress}</p>
          <VenueActions data={data} />
        </Reveal>
      </section>

      <section className="t09-env">
        <Reveal variant="fade">
          <div className="t09-envelope">
            <div className="t09-letter">
              <img src={photoSrc(data.photos.couple)} alt="" />
              <img src={photoSrc(data.album[0])} alt="" />
            </div>
            <div className="t09-back" />
            <div className="t09-front" />
            <div className="t09-flap" />
            <div className="t09-seal">{mono}</div>
          </div>
        </Reveal>
        <Reveal>
          <p className="t09-script">Save the Date</p>
        </Reveal>
      </section>

      <section className="t09-story">
        <img src={photoSrc(data.album[2])} alt="" />
        <Reveal className="t09-story-text">
          <p className="t09-script t09-white">The Story of Love</p>
          <div>
            <i>Cô dâu</i>
            <b>{data.bride}</b>
          </div>
          <div>
            <i>Chú rể</i>
            <b>{data.groom}</b>
          </div>
        </Reveal>
      </section>

      <section className="t09-album">
        <Reveal>
          <h2 className="t09-script">The Album</h2>
        </Reveal>
        <Mosaic photos={data.album} />
      </section>

      <section className="t09-time">
        <Reveal>
          <h2 className="t09-cap t09-tl">TIMELINE</h2>
        </Reveal>
        <div className="t09-row">
          {steps.map(({ t, Icon }, i) => (
            <Reveal key={t.time} variant="zoom" delay={i * 200}>
              <div className="t09-step">
                <Icon />
                <b>{t.time}</b>
                <span>{t.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t09-form">
        <Reveal>
          <RsvpForm data={data} />
        </Reveal>
      </section>

      <section className="t09-gift">
        <Reveal>
          <GiftCard data={data} />
        </Reveal>
        <Reveal variant="zoom">
          <p className="t09-thanks">Thank you!</p>
        </Reveal>
      </section>
    </Page>
  );
};

export default Template09;
