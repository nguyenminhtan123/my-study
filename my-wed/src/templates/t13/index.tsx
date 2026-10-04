import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t13/styles.scss";
import { WeddingData } from "@/core/types";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Countdown,
  Dresscode,
  GiftCard,
  RsvpForm,
  VenueActions,
  WindingTimeline,
  photoSrc,
} from "@/templates/_kit/sections";

const Template13 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const mono = `${data.groom.charAt(0)}${data.bride.charAt(0)}`;

  return (
    <Page className="t13-root">
      <Drifters kind="sparkle" count={8} color="#9db3dc" opacity={0.7} />

      <section className="t13-top">
        <p className="t13-small">{data.groom}</p>
        <div className="t13-mono">
          <span>{mono}</span>
        </div>
        <p className="t13-small">{data.bride}</p>
        <p className="t13-date">
          {d.month} · {d.day} · {d.year}
        </p>
      </section>

      <section className="t13-torn t13-torn-a">
        <img src={photoSrc(data.photos.cover)} alt="" />
      </section>

      <section className="t13-card">
        <Reveal>
          <p className="t13-small">Trân trọng kính mời</p>
          <h2>
            {data.groom}
            <i>and</i>
            {data.bride}
          </h2>
          <div className="t13-rule" />
          <p className="t13-when">
            {d.weekday} · {d.time}
          </p>
          <h3>{data.venueName}</h3>
          <p className="t13-addr">{data.venueAddress}</p>
          <VenueActions data={data} />
        </Reveal>
      </section>

      <section className="t13-torn t13-torn-b">
        <img src={photoSrc(data.album[1])} alt="" />
        <Reveal>
          <p className="t13-over">Our love story</p>
        </Reveal>
      </section>

      <section className="t13-cal">
        <Reveal variant="zoom">
          <CalendarCard iso={data.weddingISO} />
        </Reveal>
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
      </section>

      <section className="t13-torn t13-torn-a">
        <img src={photoSrc(data.album[0])} alt="" />
      </section>

      <section className="t13-time">
        <Reveal>
          <h2 className="t13-title">Timeline</h2>
        </Reveal>
        <WindingTimeline steps={data.timeline} />
        <Reveal>
          <h2 className="t13-title">Dresscode</h2>
        </Reveal>
        <Dresscode colors={data.dressColors} />
      </section>

      <section className="t13-album">
        <div className="t13-sheet">
          {[data.album[2], data.album[3], data.photos.destiny].map(
            (photo, i) => (
              <Reveal
                key={photo.key}
                variant={i % 2 ? "right" : "left"}
                delay={i * 140}
                className={`t13-ph t13-ph${i + 1}`}
              >
                <img src={photoSrc(photo)} alt="" />
              </Reveal>
            ),
          )}
        </div>
      </section>

      <section className="t13-rsvp">
        <Reveal>
          <RsvpForm data={data} variant="select" title="R.S.V.P" />
        </Reveal>
      </section>

      <section className="t13-gift">
        <Reveal>
          <GiftCard data={data} />
        </Reveal>
        <Reveal variant="zoom">
          <p className="t13-thanks">Thank you</p>
        </Reveal>
      </section>
    </Page>
  );
};

export default Template13;
