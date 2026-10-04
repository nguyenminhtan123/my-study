import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t03/styles.scss";
import { WeddingData } from "@/core/types";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import lotusPink from "@/static/lotus-pink.jpg";
import lotusWhite from "@/static/lotus-white.jpg";
import {
  CalendarCard,
  Countdown,
  Dresscode,
  GiftCard,
  Mosaic,
  RsvpForm,
  VenueActions,
  WindingTimeline,
  photoSrc,
} from "@/templates/_kit/sections";

const Template03 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t03-root">
      <Drifters kind="petal" count={12} color="#ffffff" opacity={0.85} />

      <div className="t03-head">
        <img src={lotusPink} alt="" />
      </div>

      <section className="t03-cover">
        <img src={photoSrc(data.photos.cover)} alt="" />
        <div className="t03-cover-names">
          <h1>
            {data.groom}
            <span>&</span>
            {data.bride}
          </h1>
        </div>
      </section>

      <section className="t03-std">
        <img className="t03-lotus-round" src={lotusWhite} alt="" />
        <Reveal variant="zoom">
          <div className="t03-envelope">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <p className="t03-script">Save the date</p>
          <p className="t03-small">
            {d.day} . {d.month} . {d.year}
          </p>
        </Reveal>
      </section>

      <section className="t03-invite">
        <Reveal>
          <p className="t03-cap">
            Trân trọng kính mời tham dự buổi tiệc cưới
            <br />
            cùng gia đình chúng tôi
          </p>
          <h2 className="t03-names">
            {data.groom}
            <i>&</i>
            {data.bride}
          </h2>
          <p className="t03-when">
            {d.time}, {d.weekday}
          </p>
          <div className="t03-bigdate">
            <span>THÁNG {d.month}</span>
            <b>{d.day}</b>
            <span>NĂM {d.year}</span>
          </div>
          <p className="t03-cap">Tại địa điểm</p>
          <h3 className="t03-venue">{data.venueName}</h3>
          <p className="t03-addr">{data.venueAddress}</p>
          <VenueActions data={data} />
        </Reveal>
      </section>

      <section className="t03-dark">
        <Reveal>
          <p className="t03-with">WITH YOU</p>
          <h2 className="t03-allover">All over again</h2>
        </Reveal>
        <div className="t03-pair">
          <Reveal variant="left">
            <figure>
              <img src={photoSrc(data.photos.couple)} alt="" />
              <figcaption>
                <i>Cô dâu</i>
                {data.bride}
              </figcaption>
            </figure>
          </Reveal>
          <Reveal variant="right" delay={160}>
            <figure>
              <img src={photoSrc(data.photos.destiny)} alt="" />
              <figcaption>
                <i>Chú rể</i>
                {data.groom}
              </figcaption>
            </figure>
          </Reveal>
        </div>
        <Reveal className="t03-parents">
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

      <section className="t03-time">
        <Reveal variant="left">
          <h2 className="t03-title">Timeline</h2>
        </Reveal>
        <WindingTimeline steps={data.timeline} />
        <Reveal variant="left">
          <h2 className="t03-title">Dresscode</h2>
        </Reveal>
        <Dresscode colors={data.dressColors} />
      </section>

      <section className="t03-count">
        <img src={photoSrc(data.photos.destiny)} alt="" />
        <Reveal className="t03-count-box">
          <h2 className="t03-count-title">Countdown</h2>
          <Countdown iso={data.weddingISO} />
        </Reveal>
      </section>

      <section className="t03-album">
        <Reveal>
          <h2 className="t03-title t03-light">Our Memories</h2>
        </Reveal>
        <Mosaic photos={data.album} />
        <p className="t03-full">FULL ALBUM</p>
      </section>

      <section className="t03-form">
        <Reveal>
          <RsvpForm data={data} />
        </Reveal>
      </section>

      <section className="t03-gift">
        <Reveal>
          <h2 className="t03-title">Wedding Gift</h2>
          <p className="t03-small">
            Thank you for being a part of our special day
          </p>
          <GiftCard data={data} />
        </Reveal>
        <Reveal variant="zoom">
          <p className="t03-thanks">Thank you!</p>
        </Reveal>
      </section>
    </Page>
  );
};

export default Template03;
