import { useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t10/styles.scss";
import { WeddingData } from "@/core/types";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  Countdown,
  Dresscode,
  GiftCard,
  Mosaic,
  RsvpForm,
  VenueActions,
  WindingTimeline,
  photoSrc,
} from "@/templates/_kit/sections";

const Stamp = ({ className }: { className: string }) => (
  <i className={`t10-stamp ${className}`} aria-hidden="true" />
);

const Template10 = ({ data }: { data: WeddingData }) => {
  const [opened, setOpened] = useState(false);
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t10-root">
      <div className={`t10-intro ${opened ? "t10-open" : ""}`}>
        <Drifters kind="leaf" count={10} color="#d4b06a" opacity={0.7} />
        <Stamp className="t10-s1" />
        <Stamp className="t10-s2" />
        <p className="t10-welcome">
          WELCOME TO
          <span>Wedding</span>
        </p>
        <button
          type="button"
          className="t10-seal"
          aria-label="Mở thiệp"
          onClick={() => setOpened(true)}
        >
          <svg viewBox="0 0 40 40" aria-hidden="true">
            <path
              d="M20 6C28 12 28 24 20 34C12 24 12 12 20 6ZM20 10V34"
              fill="none"
              stroke="#5a3a14"
              strokeWidth="1.6"
            />
          </svg>
        </button>
        <p className="t10-invitee">
          TRÂN TRỌNG KÍNH MỜI
          <span>Bạn</span>
        </p>
        <p className="t10-hint">Chạm vào dấu sáp để mở thiệp</p>
      </div>

      <div className={`t10-body ${opened ? "t10-on" : ""}`}>
        <Drifters kind="leaf" count={9} color="#8fb59a" opacity={0.55} />

        <section className="t10-cover">
          <div className="t10-cover-photo">
            <img src={photoSrc(data.photos.cover)} alt="" />
          </div>
          <h1 className="t10-cover-names">
            {data.groom}
            <i>and</i>
            {data.bride}
          </h1>
          <div className="t10-story">
            <p className="t10-script">Love Story</p>
            <div className="t10-datecol">
              <b>{d.day}</b>
              <b>{d.month}</b>
              <b>{d.year.slice(2)}</b>
            </div>
          </div>
        </section>

        <section className="t10-invite">
          <Reveal>
            <p className="t10-cap">
              Trân trọng kính mời bạn tới tham dự buổi tiệc cưới cùng gia đình
              chúng tôi
            </p>
            <h2 className="t10-names">
              {data.groom}
              <i>and</i>
              {data.bride}
            </h2>
            <p className="t10-when">
              {d.time}, {d.weekday}
            </p>
            <p className="t10-when t10-sm">
              {d.day} | {d.month} | {d.year}
            </p>
            <div className="t10-rule" />
            <p className="t10-cap">Địa chỉ</p>
            <h3>{data.venueName}</h3>
            <p className="t10-addr">{data.venueAddress}</p>
            <div className="t10-fam">
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
            </div>
            <VenueActions data={data} />
          </Reveal>
        </section>

        <section className="t10-destiny">
          <Reveal variant="fade">
            <div className="t10-arch">
              <img src={photoSrc(data.photos.destiny)} alt="" />
              <p className="t10-script t10-big">Destiny</p>
            </div>
          </Reveal>
        </section>

        <section className="t10-time">
          <Reveal variant="left">
            <h2 className="t10-script">Timeline</h2>
          </Reveal>
          <WindingTimeline steps={data.timeline} />
          <Reveal variant="left">
            <h2 className="t10-script">Dresscode</h2>
          </Reveal>
          <Dresscode colors={data.dressColors} />
        </section>

        <section className="t10-album">
          <Reveal>
            <h2 className="t10-script">The Album</h2>
          </Reveal>
          <Mosaic photos={data.album} />
          <Countdown iso={data.weddingISO} />
        </section>

        <section className="t10-form">
          <Reveal>
            <RsvpForm data={data} />
          </Reveal>
        </section>

        <section className="t10-gift">
          <Reveal>
            <GiftCard data={data} />
          </Reveal>
          <Reveal variant="zoom">
            <p className="t10-thanks">Thank you!</p>
          </Reveal>
        </section>
      </div>
    </Page>
  );
};

export default Template10;
