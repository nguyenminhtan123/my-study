import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t08/styles.scss";
import { WeddingData } from "@/core/types";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  Countdown,
  GiftCard,
  Mosaic,
  RsvpForm,
  VenueActions,
  photoSrc,
} from "@/templates/_kit/sections";

const Template08 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const mono = `${data.groom.charAt(0)}${data.bride.charAt(0)}`;

  return (
    <Page className="t08-root">
      <Drifters kind="sparkle" count={14} color="#e9c987" opacity={0.85} />

      <section className="t08-cover">
        <img src={photoSrc(data.photos.cover)} alt="" />
        <div className="t08-sun" />
        <div className="t08-cover-text">
          <h1>
            {data.groom}
            <i>and</i>
            {data.bride}
          </h1>
          <p>
            {d.day} . {d.month} . {d.year}
          </p>
        </div>
      </section>

      <section className="t08-std">
        <div className="t08-grid">
          {[data.album[0], data.album[1], data.album[2], data.album[3]].map(
            (photo, i) => (
              <Reveal
                key={photo.key}
                variant="zoom"
                delay={i * 130}
                className={`t08-g${i + 1}`}
              >
                <img src={photoSrc(photo)} alt="" />
              </Reveal>
            ),
          )}
          <div className="t08-datebox">
            <small>SAVE THE DATE</small>
            <b>{d.day}</b>
            <b>{d.month}</b>
            <b>{d.year.slice(2)}</b>
            <small>
              {data.groom} &amp; {data.bride}
            </small>
          </div>
        </div>
      </section>

      <section className="t08-invite">
        <Reveal>
          <div className="t08-ring">
            <span>{mono.charAt(0)}</span>
            <span>{mono.charAt(1)}</span>
          </div>
          <p className="t08-cap">
            Trân trọng kính mời quý khách đến dự buổi tiệc chung vui cùng gia
            đình chúng tôi
          </p>
          <p className="t08-cap">Tại nhà hàng tiệc cưới</p>
          <h2 className="t08-venue">{data.venueName}</h2>
          <p className="t08-addr">{data.venueAddress}</p>
          <div className="t08-cells">
            <span>{d.weekday}</span>
            <span>
              {d.day} . {d.month} . {d.year}
            </span>
            <span>{d.time}</span>
          </div>
          <VenueActions data={data} />
        </Reveal>
      </section>

      <section className="t08-dream">
        <div className="t08-letters" aria-label="Dream">
          {["D", "R", "E", "A", "M"].map((ch, i) => (
            <Reveal key={ch} variant="left" delay={i * 160}>
              <span>{ch}</span>
            </Reveal>
          ))}
        </div>
        <Reveal className="t08-dream-text">
          <p>
            Some dreams are meant to last forever, just like true love. When two
            hearts stay faithful through every season, forever becomes more than
            a promise.
          </p>
        </Reveal>
        <Reveal variant="zoom">
          <div className="t08-pola">
            <img src={photoSrc(data.photos.couple)} alt="" />
            <span>LOVE FOREVER</span>
          </div>
        </Reveal>
        <div className="t08-lines">
          {["Two hearts", "One journey", "A lifetime of love"].map(
            (line, i) => (
              <Reveal key={line} delay={i * 450}>
                <i />
                <p>{line}</p>
              </Reveal>
            ),
          )}
          <Reveal delay={1500}>
            <span className="t08-heart">♥</span>
          </Reveal>
        </div>
      </section>

      <section className="t08-album">
        <Reveal>
          <h2 className="t08-script">Endless Romance</h2>
        </Reveal>
        <Mosaic photos={data.album} />
      </section>

      <section className="t08-count">
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
      </section>

      <section className="t08-form">
        <Reveal>
          <RsvpForm data={data} />
        </Reveal>
      </section>

      <section className="t08-gift">
        <Reveal>
          <GiftCard data={data} />
        </Reveal>
      </section>

      <section className="t08-thanks">
        <img src={photoSrc(data.photos.destiny)} alt="" />
        <Reveal variant="zoom" className="t08-thanks-text">
          <p className="t08-script">Thank you!</p>
        </Reveal>
      </section>
    </Page>
  );
};

export default Template08;
