import { useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t11/styles.scss";
import { WeddingData } from "@/core/types";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  Countdown,
  Dresscode,
  GiftCard,
  RsvpForm,
  VenueActions,
  WindingTimeline,
  photoSrc,
} from "@/templates/_kit/sections";

const Template11 = ({ data }: { data: WeddingData }) => {
  const [open, setOpen] = useState(false);
  const d = dateParts(data.weddingISO);
  const mono = `${data.groom.charAt(0)}${data.bride.charAt(0)}`;

  return (
    <Page className="t11-root">
      <Drifters kind="petal" count={8} color="#8a1c2c" opacity={0.4} />

      <section className="t11-hero">
        <p className="t11-eyebrow">The wedding of</p>
        <h1>
          {data.groom}
          <i>&amp;</i>
          {data.bride}
        </h1>
        <div
          className={`t11-env ${open ? "t11-env-open" : ""}`}
          onClick={() => setOpen(true)}
        >
          <div className="t11-env-back" />
          <div className="t11-letter">
            <b>{d.day}</b>
            <span>
              {d.month} . {d.year}
            </span>
          </div>
          <div className="t11-env-front" />
          <div className="t11-env-flap" />
          <button type="button" className="t11-wax" aria-label="Mở thiệp">
            <span>{mono}</span>
          </button>
        </div>
        <p className="t11-hint">
          {open ? "Kính mời bạn đến chung vui" : "Chạm vào dấu sáp để mở thiệp"}
        </p>
      </section>

      <section className="t11-cream t11-invite">
        <Reveal>
          <p className="t11-eyebrow t11-dark">Trân trọng kính mời</p>
          <div className="t11-stamp">
            <img src={photoSrc(data.photos.couple)} alt="" />
          </div>
          <h2>
            {data.groom} <i>&amp;</i> {data.bride}
          </h2>
          <p className="t11-when">
            {d.weekday} · {d.time}
          </p>
          <p className="t11-big">
            {d.day}.{d.month}.{d.year}
          </p>
          <h3>{data.venueName}</h3>
          <p className="t11-addr">{data.venueAddress}</p>
          <VenueActions data={data} />
        </Reveal>
      </section>

      <section className="t11-wine t11-count">
        <Reveal>
          <p className="t11-eyebrow">Đếm ngược</p>
          <Countdown iso={data.weddingISO} />
        </Reveal>
      </section>

      <section className="t11-cream t11-story">
        <div className="t11-polas">
          {[data.album[0], data.album[1], data.album[2]].map((photo, i) => (
            <Reveal
              key={photo.key}
              variant={i % 2 ? "right" : "left"}
              delay={i * 140}
              className={`t11-pola t11-pola${i + 1}`}
            >
              <img src={photoSrc(photo)} alt="" />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <h2 className="t11-title">
            Our <i>story</i>
          </h2>
          <p className="t11-muted">
            Từ một cuộc gặp tình cờ đến lời hẹn ước trọn đời. Cảm ơn bạn đã là
            một phần trong câu chuyện của chúng mình.
          </p>
        </Reveal>
      </section>

      <section className="t11-wine t11-time">
        <Reveal>
          <h2 className="t11-title t11-light">Timeline</h2>
        </Reveal>
        <WindingTimeline steps={data.timeline} />
        <Reveal>
          <h2 className="t11-title t11-light">Dresscode</h2>
        </Reveal>
        <Dresscode colors={data.dressColors} />
      </section>

      <section className="t11-cream t11-rsvp">
        <Reveal>
          <RsvpForm data={data} variant="select" />
        </Reveal>
      </section>

      <section className="t11-wine t11-gift">
        <Reveal>
          <GiftCard data={data} />
        </Reveal>
        <Reveal variant="zoom">
          <p className="t11-thanks">Thank you</p>
        </Reveal>
      </section>
    </Page>
  );
};

export default Template11;
