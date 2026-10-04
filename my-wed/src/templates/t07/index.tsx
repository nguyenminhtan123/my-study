import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t07/styles.scss";
import { WeddingData } from "@/core/types";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import { IconCamera, IconDinner, IconRings } from "@/templates/_kit/icons";
import {
  CalendarCard,
  GiftCard,
  Mosaic,
  RsvpForm,
  VenueActions,
  photoSrc,
} from "@/templates/_kit/sections";

const Tag = () => (
  <div className="t07-tag" aria-hidden="true">
    <i />
    <span />
  </div>
);

const Template07 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const strip = [
    data.photos.couple,
    data.album[0],
    data.album[1],
    data.photos.destiny,
    data.album[2],
    data.album[3],
  ];
  const steps = [
    { t: data.timeline[0], Icon: IconCamera },
    { t: data.timeline[1], Icon: IconRings },
    { t: data.timeline[2], Icon: IconDinner },
  ];

  return (
    <Page className="t07-root">
      <Drifters kind="sparkle" count={8} color="#ffffff" opacity={0.9} />

      <section className="t07-cover">
        <div className="t07-arch">
          <img src={photoSrc(data.photos.cover)} alt="" />
        </div>
        <h1 className="t07-names">
          {data.groom}
          <i>and</i>
          {data.bride}
        </h1>
      </section>

      <div className="t07-film" aria-hidden="true">
        <div className="t07-film-track">
          {[...strip, ...strip].map((photo, i) => (
            <img key={i} src={photoSrc(photo)} alt="" />
          ))}
        </div>
      </div>

      <section className="t07-card">
        <Tag />
        <Reveal>
          <h2 className="t07-names t07-small">
            {data.groom}
            <i>and</i>
            {data.bride}
          </h2>
          <p className="t07-cap">
            Trân trọng kính mời bạn đến dự buổi tiệc chung vui cùng chúng tôi
          </p>
          <div className="t07-event">
            <span className="t07-chip">LỄ VU QUY</span>
            <b>
              {data.timeline[0].time} . {d.weekday}
            </b>
            <p>
              {d.day} | {d.month} | {d.year}
            </p>
            <small>Tại tư gia nhà gái</small>
          </div>
          <div className="t07-event">
            <span className="t07-chip">LỄ THÀNH HÔN</span>
            <b>
              {data.timeline[1].time} . {d.weekday}
            </b>
            <p>
              {d.day} | {d.month} | {d.year}
            </p>
            <small>{data.venueName}</small>
            <small>{data.venueAddress}</small>
          </div>
          <VenueActions data={data} />
        </Reveal>
      </section>

      <section className="t07-sd">
        <Reveal variant="zoom">
          <div className="t07-pola">
            <img src={photoSrc(data.album[1])} alt="" />
            <span>SAVE THE DATE</span>
          </div>
        </Reveal>
        <Reveal>
          <p className="t07-script">Happy Wedding</p>
          <CalendarCard iso={data.weddingISO} />
        </Reveal>
      </section>

      <section className="t07-time">
        <Tag />
        <Reveal variant="left">
          <h2 className="t07-script">Timeline</h2>
        </Reveal>
        <ul className="t07-steps">
          {steps.map(({ t, Icon }, i) => (
            <Reveal key={t.time} variant="right" delay={i * 220}>
              <li>
                <div>
                  <b>{t.time}</b>
                  <span>{t.label}</span>
                </div>
                <Icon />
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="t07-album">
        <Reveal>
          <h2 className="t07-script">Album</h2>
        </Reveal>
        <Mosaic photos={data.album} />
      </section>

      <section className="t07-form">
        <Reveal>
          <RsvpForm data={data} />
        </Reveal>
      </section>

      <section className="t07-gift">
        <Reveal>
          <GiftCard data={data} />
        </Reveal>
        <Reveal variant="zoom">
          <p className="t07-thanks">Thank you!</p>
        </Reveal>
      </section>
    </Page>
  );
};

export default Template07;
