import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t09/styles.scss";
import { WeddingData } from "@/core/types";
import hydrangea from "@/static/hydrangea-blue.jpg";
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
        <div className="t09-hydra">
          <img src={hydrangea} alt="" />
        </div>
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
