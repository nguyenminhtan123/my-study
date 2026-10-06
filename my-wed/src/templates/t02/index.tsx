import { ReactNode } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t02/styles.scss";
import { WeddingData } from "@/core/types";
import anemonePair from "@/static/t02-anemone-purple.jpg";
import anemone from "@/static/t02-anemone-white.jpg";
import { Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Countdown,
  GiftCard,
  RsvpForm,
  VenueActions,
  photoShape,
  photoSrc,
} from "@/templates/_kit/sections";

// numbered section: hairline that draws in, number, label
const Part = ({
  no,
  label,
  children,
}: {
  no: string;
  label: string;
  children: ReactNode;
}) => (
  <section className="t02-part">
    <Reveal variant="fade">
      <header className="t02-part-head">
        <span>{no}</span>
        <h2>{label}</h2>
      </header>
    </Reveal>
    {children}
  </section>
);

const Template02 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t02-root">
      <section className="t02-hero">
        <img className="t02-hero-flower" src={anemone} alt="" />
        <div className="t02-hero-text">
          <p className="t02-small">Wedding invitation</p>
          <h1>
            <span>{data.groom}</span>
            <em>&amp;</em>
            <span>{data.bride}</span>
          </h1>
        </div>
        <div className="t02-hero-foot">
          <p>
            {d.day}.{d.month}
            <br />
            {d.year}
          </p>
          <p>
            {data.venueName}
            <br />
            {d.time}
          </p>
        </div>
      </section>

      <Part no="01" label="Lời mời">
        <Reveal>
          <p className="t02-lead">
            Trân trọng kính mời bạn đến dự lễ thành hôn của chúng mình.
          </p>
        </Reveal>
        <Reveal>
          <div className="t02-fam">
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
      </Part>

      <Part no="02" label="Thời gian">
        <Reveal>
          <div className="t02-date">
            <b>{d.day}</b>
            <div>
              <span>Tháng {d.month}</span>
              <span>{d.year}</span>
              <span>
                {d.weekday} · {d.time}
              </span>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
        <Reveal>
          <CalendarCard iso={data.weddingISO} />
        </Reveal>
      </Part>

      <Reveal variant="fade">
        <img className="t02-pair" src={anemonePair} alt="" />
      </Reveal>

      <Part no="03" label="Địa điểm">
        <Reveal>
          <h3 className="t02-venue">{data.venueName}</h3>
          <p className="t02-muted">{data.venueAddress}</p>
          <VenueActions data={data} />
        </Reveal>
      </Part>

      <Part no="04" label="Chương trình">
        <ol className="t02-steps">
          {data.timeline.map((s, i) => (
            <Reveal key={s.time} delay={i * 100}>
              <li>
                <b>{s.time}</b>
                <span>{s.label}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </Part>

      <Part no="05" label="Hình ảnh">
        <div className="t02-album k-album">
          {data.album.map((p, i) => (
            <Reveal key={p.key} delay={i * 80} className={photoShape(p)}>
              <img src={photoSrc(p)} alt="" />
            </Reveal>
          ))}
        </div>
      </Part>

      <Part no="06" label="Hồi âm">
        <Reveal>
          <RsvpForm data={data} variant="select" title="Xác nhận tham dự" />
        </Reveal>
      </Part>

      <Part no="07" label="Mừng cưới">
        <Reveal>
          <GiftCard data={data} />
        </Reveal>
      </Part>

      <footer className="t02-foot">
        <img src={anemone} alt="" />
        <p className="t02-small">Thank you</p>
        <h2>
          {data.groom} <em>&amp;</em> {data.bride}
        </h2>
      </footer>
    </Page>
  );
};

export default Template02;
