import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t06/styles.scss";
import { WeddingData } from "@/core/types";
import clover from "@/static/clover.jpg";
import hydrangea from "@/static/hydrangea-white.jpg";
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

const Template06 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const mono = `${data.groom.charAt(0)}${data.bride.charAt(0)}`;

  return (
    <Page className="t06-root">
      <Drifters kind="petal" count={10} color="#ffffff" opacity={0.9} />

      <section className="t06-cover">
        <div className="t06-flowers">
          <img src={hydrangea} alt="" />
        </div>
        <div className="t06-mono">{mono}</div>
        <div className="t06-torn">
          <img src={photoSrc(data.photos.cover)} alt="" />
        </div>
        <img className="t06-clover t06-c1" src={clover} alt="" />
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
        <img className="t06-clover t06-c2" src={clover} alt="" />
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
