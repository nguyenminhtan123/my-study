import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t06/styles.scss";
import { WeddingData } from "@/core/types";
import hydrangea from "@/static/hydrangea-white.jpg";
import { Drifters, Reveal } from "@/templates/_kit/anim";
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

const Template06 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t06-root">
      <Drifters kind="petal" count={9} color="#ffffff" opacity={0.9} />

      {/* cover: white hydrangeas on top, an emerald band cut on the diagonal, the couple below */}
      <section className="t06-cover">
        <img className="t06-flowers" src={hydrangea} alt="" />
        <div className="t06-band">
          <p className="t06-small">Save the date</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <p className="t06-band-date">
            {d.day} · {d.month} · {d.year}
          </p>
        </div>
        <img className="t06-couple" src={photoSrc(data.photos.couple)} alt="" />
      </section>

      <section className="t06-sec t06-center">
        <Reveal>
          <p className="t06-small t06-green">Trân trọng kính mời</p>
          <h2 className="t06-title">Lễ thành hôn của chúng mình</h2>
        </Reveal>
        <Reveal>
          <div className="t06-fam">
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

      <section className="t06-emerald">
        <img src={hydrangea} alt="" />
        <Reveal>
          <p className="t06-small">Ngày chung đôi</p>
          <p className="t06-bigdate">
            {d.day}
            <em>.</em>
            {d.month}
            <em>.</em>
            {d.year}
          </p>
          <p className="t06-sub">
            {d.weekday} · {d.time}
          </p>
        </Reveal>
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
      </section>

      <section className="t06-sec">
        <Reveal>
          <div className="t06-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t06-card">
            <p className="t06-small t06-green">Địa điểm</p>
            <h2 className="t06-title">{data.venueName}</h2>
            <p className="t06-muted">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="t06-title t06-center">Chương trình</h2>
        </Reveal>
        <ol className="t06-steps">
          {data.timeline.map((s, i) => (
            <Reveal key={s.time} delay={i * 120}>
              <li>
                <b>{s.time}</b>
                <span>{s.label}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="t06-slant">
        <Reveal>
          <h2 className="t06-title t06-center">Khoảnh khắc</h2>
        </Reveal>
        <div className="t06-album k-album">
          {data.album.map((p, i) => (
            <Reveal
              key={p.key}
              variant={i % 2 ? "right" : "left"}
              delay={i * 100}
              className={photoShape(p)}
            >
              <img src={photoSrc(p)} alt="" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t06-sec">
        <Reveal>
          <div className="t06-card">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t06-card">
            <h2 className="t06-title t06-center">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t06-foot">
        <img src={hydrangea} alt="" />
        <div>
          <p className="t06-small">Thank you</p>
          <h2>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h2>
        </div>
      </footer>
    </Page>
  );
};

export default Template06;
