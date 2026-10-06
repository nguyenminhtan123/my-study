import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t24/styles.scss";
import { WeddingData } from "@/core/types";
import plantPink from "@/static/t24-plate-pink.jpg";
import plantYellow from "@/static/t24-plate-yellow.jpg";
import { Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Countdown,
  GiftCard,
  RsvpForm,
  VenueActions,
  photoSrc,
} from "@/templates/_kit/sections";

// a botanical plate printed on the paper, held by two strips of tape
const Specimen = ({
  src,
  label,
  tilt,
}: {
  src: string;
  label: string;
  tilt: number;
}) => (
  <figure className="t24-specimen" style={{ rotate: `${tilt}deg` }}>
    <img src={src} alt="" />
    <figcaption>{label}</figcaption>
  </figure>
);

const Template24 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t24-root">
      <section className="t24-hero">
        <div className="t24-postmark" aria-hidden="true">
          <span>
            {d.day}·{d.month}
            <br />
            {d.year}
          </span>
        </div>
        <Reveal variant="fade">
          <Specimen src={plantPink} label="No. 01 · Chamaenerion" tilt={-3} />
        </Reveal>
        <div className="t24-hero-text">
          <p className="t24-type">Thư mời cưới</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <p className="t24-type">
            {d.weekday} · {d.day}.{d.month}.{d.year}
          </p>
        </div>
      </section>

      <section className="t24-letter">
        <Reveal>
          <p className="t24-hand t24-dear">Thân gửi bạn,</p>
        </Reveal>
        <Reveal>
          <p className="t24-hand">
            Có những điều giản dị như một nhành cỏ ép trong trang sách cũ, mà
            giữ mãi không phai. Chúng mình muốn ngày vui này cũng có bạn ở đó.
          </p>
        </Reveal>
        <Reveal>
          <p className="t24-hand">
            Trân trọng mời bạn đến dự lễ thành hôn của chúng mình.
          </p>
          <p className="t24-hand t24-sign">
            {data.groom} &amp; {data.bride}
          </p>
        </Reveal>
        <Reveal>
          <div className="t24-fam">
            <div>
              <b>Nhà trai</b>
              {data.families.groom.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
            <div>
              <b>Nhà gái</b>
              {data.families.bride.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="t24-sec">
        <Reveal variant="zoom">
          <figure className="t24-photo" style={{ rotate: "2deg" }}>
            <img src={photoSrc(data.photos.couple)} alt="" />
            <figcaption>chúng mình, một chiều nào đó</figcaption>
          </figure>
        </Reveal>
        <Reveal>
          <div className="t24-ticket">
            <div>
              <p className="t24-type">Ngày</p>
              <b>
                {d.day}.{d.month}
              </b>
              <span>{d.year}</span>
            </div>
            <div>
              <p className="t24-type">Giờ</p>
              <b>{d.time}</b>
              <span>{d.weekday}</span>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
        <Reveal>
          <div className="t24-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
      </section>

      <section className="t24-sec t24-two">
        <Reveal variant="left">
          <Specimen src={plantYellow} label="No. 02 · Pulicaria" tilt={-2} />
        </Reveal>
        <Reveal variant="right">
          <div className="t24-venue">
            <p className="t24-type">Địa chỉ</p>
            <h2>{data.venueName}</h2>
            <p>{data.venueAddress}</p>
          </div>
        </Reveal>
      </section>
      <section className="t24-sec t24-tight">
        <Reveal>
          <VenueActions data={data} />
        </Reveal>
        <Reveal>
          <h2 className="t24-title">Chương trình</h2>
        </Reveal>
        <ol className="t24-steps">
          {data.timeline.map((s, i) => (
            <Reveal key={s.time} delay={i * 120}>
              <li>
                <b>{s.time}</b>
                <i />
                <span>{s.label}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="t24-sec">
        <Reveal>
          <h2 className="t24-title">Album nhỏ</h2>
        </Reveal>
        <div className="t24-album">
          {data.album.map((p, i) => (
            <Reveal key={p.key} delay={i * 120}>
              <figure
                className="t24-photo"
                style={{ rotate: `${[-3, 2.5, 2, -2.5][i % 4]}deg` }}
              >
                <img src={photoSrc(p)} alt="" />
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t24-sec">
        <Reveal>
          <div className="t24-card">
            <RsvpForm data={data} title="Hồi âm" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t24-card">
            <h2 className="t24-title">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t24-foot">
        <Specimen src={plantPink} label="Hẹn gặp bạn" tilt={3} />
        <p className="t24-hand">
          Thương mến,
          <br />
          {data.groom} &amp; {data.bride}
        </p>
      </footer>
    </Page>
  );
};

export default Template24;
