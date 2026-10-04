import { useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t04/styles.scss";
import { WeddingData } from "@/core/types";
import roseDark from "@/static/rose-dark.jpg";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Dresscode,
  GiftCard,
  RsvpForm,
  VenueActions,
  WindingTimeline,
  photoSrc,
} from "@/templates/_kit/sections";

const initials = (a: string, b: string) =>
  `${a.trim().charAt(0)}&${b.trim().charAt(0)}`;

const Template04 = ({ data }: { data: WeddingData }) => {
  const [opened, setOpened] = useState(false);
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t04-root">
      <div className={`t04-intro ${opened ? "t04-open" : ""}`}>
        <Drifters kind="heart" count={9} color="#e7b7ae" opacity={0.6} />
        <p className="t04-intro-pre">TRÂN TRỌNG KÍNH MỜI</p>
        <h1 className="t04-intro-names">
          {data.groom}
          <i>&</i>
          {data.bride}
        </h1>
        <button
          type="button"
          className="t04-seal"
          aria-label="Mở thiệp"
          onClick={() => setOpened(true)}
        >
          {initials(data.groom, data.bride)}
        </button>
        <p className="t04-intro-hint">Chạm vào dấu sáp để mở thiệp</p>
      </div>

      <div className={`t04-body ${opened ? "t04-body-on" : ""}`}>
        <Drifters kind="petal" count={10} color="#b0243a" opacity={0.55} />

        <section className="t04-cover">
          <img src={photoSrc(data.photos.cover)} alt="" />
          <div className="t04-cover-text">
            <span>SAVE</span>
            <i>the</i>
            <span>DATE</span>
            <p>
              {data.groom} &amp; {data.bride}
            </p>
          </div>
        </section>

        <section className="t04-card">
          <Reveal variant="zoom">
            <div className="t04-mono">{initials(data.groom, data.bride)}</div>
            <p className="t04-en">
              We step into a new chapter together, hand in hand, ready to build
              our home and embrace a lifetime of love.
            </p>
          </Reveal>
          <Reveal className="t04-strip">
            <img src={photoSrc(data.photos.couple)} alt="" />
            <img src={photoSrc(data.album[0])} alt="" />
            <img src={photoSrc(data.album[1])} alt="" />
            <span>
              {d.day} . {d.month} . {d.year.slice(2)}
            </span>
          </Reveal>
          <Reveal>
            <CalendarCard iso={data.weddingISO} monthClass="t04-month" />
          </Reveal>
          <Reveal className="t04-families">
            <div>
              <b>NHÀ GÁI</b>
              {data.families.bride.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
            <div>
              <b>NHÀ TRAI</b>
              {data.families.groom.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </Reveal>
        </section>

        <div className="t04-band t04-band-sm">
          <img src={roseDark} alt="" />
        </div>

        <section className="t04-invite">
          <Reveal>
            <h2>
              {data.groom}
              <i>&</i>
              {data.bride}
            </h2>
            <p className="t04-when">
              {d.time}, {d.weekday}
            </p>
            <div className="t04-bigdate">
              <span>THÁNG {d.month}</span>
              <b>{d.day}</b>
              <span>NĂM {d.year}</span>
            </div>
            <p className="t04-cap">Tại địa điểm</p>
            <h3>{data.venueName}</h3>
            <p className="t04-addr">{data.venueAddress}</p>
            <VenueActions data={data} />
          </Reveal>
        </section>

        <div className="t04-band">
          <img src={roseDark} alt="" />
        </div>

        <section className="t04-time">
          <Reveal variant="left">
            <h2 className="t04-title">Timeline</h2>
          </Reveal>
          <WindingTimeline steps={data.timeline} />
          <Reveal variant="left">
            <h2 className="t04-title">Dresscode</h2>
          </Reveal>
          <Dresscode colors={data.dressColors} />
        </section>

        <section className="t04-moments">
          <Reveal className="t04-moments-title">
            <h2>Our Moments</h2>
            <p>A collection of memories we&apos;ve shared together</p>
          </Reveal>
          <div className="t04-collage">
            {data.album.slice(0, 3).map((photo, i) => (
              <Reveal
                key={photo.key}
                variant={i % 2 ? "right" : "left"}
                delay={i * 150}
                className={`t04-pol t04-pol${i + 1}`}
              >
                <img src={photoSrc(photo)} alt={photo.label} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="t04-form">
          <Reveal>
            <RsvpForm data={data} />
          </Reveal>
        </section>

        <section className="t04-gift">
          <Reveal>
            <GiftCard data={data} />
          </Reveal>
        </section>

        <section className="t04-thanks">
          <img src={photoSrc(data.photos.destiny)} alt="" />
          <Reveal variant="zoom" className="t04-thanks-text">
            <p>
              Hẹn gặp bạn trong ngày đặc biệt nhất của chúng mình. Sẽ thật hạnh
              phúc khi có bạn ở đó.
            </p>
            <h2>Thank you!</h2>
          </Reveal>
        </section>
      </div>
    </Page>
  );
};

export default Template04;
