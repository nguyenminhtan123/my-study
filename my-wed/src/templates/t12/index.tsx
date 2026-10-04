import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t12/styles.scss";
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
  CalendarCard,
  Dresscode,
  GiftCard,
  RsvpForm,
  VenueActions,
  photoSrc,
} from "@/templates/_kit/sections";

const Template12 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const steps = [
    { t: data.timeline[0], Icon: IconCamera },
    { t: data.timeline[1], Icon: IconRings },
    { t: data.timeline[2], Icon: IconDinner },
    { t: data.timeline[3], Icon: IconMusic },
  ];

  return (
    <Page className="t12-root">
      <Drifters kind="leaf" count={7} color="#e9e1c9" opacity={0.5} />

      <section className="t12-hero">
        <img src={photoSrc(data.photos.cover)} alt="" />
        <div className="t12-hero-text">
          <h1>
            {data.groom}
            <i>and</i>
            {data.bride}
          </h1>
        </div>
      </section>

      <section className="t12-cream t12-date">
        <Reveal>
          <div className="t12-frame">
            <img src={photoSrc(data.photos.couple)} alt="" />
          </div>
          <p className="t12-small">Save the date</p>
          <p className="t12-bigdate">
            {d.day} <span>{d.month}</span> {d.year}
          </p>
          <p className="t12-small">
            {d.weekday} · {d.time}
          </p>
        </Reveal>
      </section>

      <section className="t12-olive t12-place">
        <Reveal>
          <p className="t12-small t12-lightsmall">Địa điểm tổ chức</p>
          <h2>{data.venueName}</h2>
          <p className="t12-addr">{data.venueAddress}</p>
          <VenueActions data={data} />
          <div className="t12-cal">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
      </section>

      <section className="t12-cream t12-day">
        <Reveal>
          <h2 className="t12-title">The day</h2>
          <p className="t12-muted">Lịch trình trong ngày vui của chúng mình</p>
        </Reveal>
        <div className="t12-icons">
          {steps.map(({ t, Icon }, i) => (
            <Reveal key={t.time} variant="zoom" delay={i * 160}>
              <div>
                <Icon />
                <b>{t.time}</b>
                <span>{t.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Dresscode colors={data.dressColors} />
        <p className="t12-small t12-center">Dress code</p>
      </section>

      <section className="t12-olive t12-photos">
        <Reveal>
          <h2 className="t12-light">Our day</h2>
        </Reveal>
        <div className="t12-strip">
          {data.album.map((photo, i) => (
            <Reveal
              key={photo.key}
              variant={i % 2 ? "right" : "left"}
              delay={i * 120}
            >
              <img src={photoSrc(photo)} alt="" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t12-cream t12-rsvp">
        <Reveal>
          <RsvpForm data={data} variant="select" title="RSVP" />
        </Reveal>
      </section>

      <section className="t12-olive t12-gift">
        <Reveal>
          <GiftCard data={data} />
        </Reveal>
      </section>
      <div className="t12-bars" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} style={{ animationDelay: `${i * 90}ms` }} />
        ))}
      </div>
    </Page>
  );
};

export default Template12;
