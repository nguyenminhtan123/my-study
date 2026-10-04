import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t06/styles.scss";
import { WeddingData } from "@/core/types";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Dresscode,
  GiftCard,
  Mosaic,
  RsvpForm,
  VenueActions,
  WindingTimeline,
  photoSrc,
} from "@/templates/_kit/sections";

/** Layered white paper flower drawn with SVG ellipses and soft shadows. */
const PaperFlower = ({ className = "" }: { className?: string }) => (
  <svg
    className={`t06-flower ${className}`}
    viewBox="0 0 100 100"
    aria-hidden="true"
  >
    <defs>
      <filter id="t06-sh" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="2"
          floodColor="#6b7f6e"
          floodOpacity="0.35"
        />
      </filter>
    </defs>
    <g filter="url(#t06-sh)" fill="#fbfdfb" stroke="#dfe7de" strokeWidth="0.8">
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="28"
          rx="14"
          ry="22"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
    </g>
    <g fill="#f2f6f1" stroke="#dfe7de" strokeWidth="0.6">
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="36"
          rx="9"
          ry="13"
          transform={`rotate(${i * 60 + 20} 50 50)`}
        />
      ))}
    </g>
    <circle cx="50" cy="50" r="5" fill="#d9e3a8" />
  </svg>
);

const Clover = ({ className = "" }: { className?: string }) => (
  <svg
    className={`t06-clover ${className}`}
    viewBox="0 0 60 60"
    aria-hidden="true"
  >
    <g fill="#2f7a3a">
      <path d="M30 28C24 14 8 18 14 30C18 36 26 34 30 28Z" />
      <path d="M30 28C46 24 48 8 36 12C28 16 28 24 30 28Z" />
      <path d="M30 32C24 46 8 42 14 30C18 24 26 26 30 32Z" />
      <path d="M30 32C46 36 48 52 36 48C28 44 28 36 30 32Z" />
    </g>
    <path
      d="M30 30C32 42 36 50 42 56"
      fill="none"
      stroke="#256b30"
      strokeWidth="2"
    />
  </svg>
);

const Template06 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const mono = `${data.groom.charAt(0)}${data.bride.charAt(0)}`;

  return (
    <Page className="t06-root">
      <Drifters kind="petal" count={10} color="#ffffff" opacity={0.9} />

      <section className="t06-cover">
        <div className="t06-flowers">
          <PaperFlower className="t06-f1" />
          <PaperFlower className="t06-f2" />
          <PaperFlower className="t06-f3" />
        </div>
        <div className="t06-mono">{mono}</div>
        <div className="t06-torn">
          <img src={photoSrc(data.photos.cover)} alt="" />
        </div>
        <Clover className="t06-c1" />
        <p className="t06-cover-names">
          {data.groom} &amp; {data.bride}
          <span>
            {d.day}.{d.month}.{d.year}
          </span>
        </p>
      </section>

      <section className="t06-invite">
        <Reveal>
          <p className="t06-cap">Thân mời đến dự lễ thành hôn của chúng tôi!</p>
          <h2>
            {data.groom}
            <i>&</i>
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
          <VenueActions data={data} />
        </Reveal>
        <Clover className="t06-c2" />
      </section>

      <section className="t06-env">
        <Reveal variant="zoom">
          <div className="t06-envelope">
            <img
              className="t06-pola1"
              src={photoSrc(data.photos.couple)}
              alt=""
            />
            <img className="t06-pola2" src={photoSrc(data.album[0])} alt="" />
            <div className="t06-flap" />
            <div className="t06-env-front" />
            <div className="t06-wax">{mono}</div>
          </div>
        </Reveal>
      </section>

      <section className="t06-wide">
        <img src={photoSrc(data.album[1])} alt="" />
        <Reveal>
          <p className="t06-script">Save the Date</p>
        </Reveal>
      </section>

      <section className="t06-cal">
        <Reveal variant="zoom">
          <CalendarCard iso={data.weddingISO} />
        </Reveal>
        <Reveal className="t06-fam">
          <div>
            <b>NHÀ TRAI</b>
            {data.families.groom.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
          <div>
            <b>NHÀ GÁI</b>
            {data.families.bride.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="t06-time">
        <Reveal variant="left">
          <h2 className="t06-script">Timeline</h2>
        </Reveal>
        <WindingTimeline steps={data.timeline} />
        <Reveal variant="left">
          <h2 className="t06-script">Dresscode</h2>
        </Reveal>
        <Dresscode colors={data.dressColors} />
      </section>

      <section className="t06-album">
        <Reveal>
          <h2 className="t06-script">The Album</h2>
        </Reveal>
        <Mosaic photos={data.album} />
      </section>

      <section className="t06-form">
        <Reveal>
          <RsvpForm data={data} />
        </Reveal>
      </section>

      <section className="t06-gift">
        <Reveal>
          <GiftCard data={data} />
        </Reveal>
        <Reveal variant="zoom">
          <p className="t06-thanks">Thank you!</p>
        </Reveal>
      </section>
    </Page>
  );
};

export default Template06;
