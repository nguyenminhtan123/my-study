import { ReactNode } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t21/styles.scss";
import { WeddingData } from "@/core/types";
import peonyPainting from "@/static/t21-peony-painting.jpg";
import peonyPlate from "@/static/t21-peony-plate.jpg";
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

// a magazine "page" heading: running number, rule, title
const PageHead = ({ no, title }: { no: string; title: ReactNode }) => (
  <Reveal>
    <header className="t21-head">
      <span>{no}</span>
      <h2>{title}</h2>
    </header>
  </Reveal>
);

const Template21 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t21-root">
      {/* cover */}
      <section className="t21-cover">
        <p className="t21-issue">
          <span>Số đặc biệt</span>
          <span>
            {d.day}.{d.month}.{d.year}
          </span>
        </p>
        <h1 className="t21-mast">Love Story</h1>
        <div className="t21-cover-art">
          <img src={peonyPlate} alt="" />
        </div>
        <div className="t21-coverlines">
          <p>
            <b>{data.groom}</b>
            <span>&amp;</span>
            <b>{data.bride}</b>
          </p>
          <p className="t21-line">Câu chuyện tình yêu nở rộ như mẫu đơn</p>
          <p className="t21-line t21-line-r">
            Trang 04 · <em>Hẹn bạn ngày vui</em>
          </p>
        </div>
      </section>

      <section className="t21-page">
        <PageHead no="01" title="Lời mời" />
        <Reveal>
          <p className="t21-drop">
            Trân trọng kính mời bạn đến dự lễ thành hôn của {data.groom} và{" "}
            {data.bride}. Sự hiện diện của bạn là niềm vinh hạnh cho gia đình
            chúng tôi.
          </p>
        </Reveal>
        <Reveal>
          <div className="t21-fam">
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
        <Reveal>
          <figure className="t21-feature">
            <img src={photoSrc(data.photos.cover)} alt="" />
            <figcaption>
              {data.groom} &amp; {data.bride} · ảnh cưới
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="t21-page t21-blush">
        <PageHead no="02" title="Ngày trọng đại" />
        <Reveal>
          <div className="t21-dateline">
            <b>{d.day}</b>
            <div>
              <span>Tháng {d.month}</span>
              <span>{d.year}</span>
              <em>
                {d.weekday} · {d.time}
              </em>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
        <Reveal>
          <blockquote className="t21-quote">
            “Yêu là cùng nhau nhìn về một hướng.”
          </blockquote>
        </Reveal>
        <Reveal>
          <CalendarCard iso={data.weddingISO} />
        </Reveal>
      </section>

      <section className="t21-page">
        <PageHead no="03" title="Địa điểm & chương trình" />
        <Reveal>
          <div className="t21-venue">
            <h3>{data.venueName}</h3>
            <p>{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
        <div className="t21-cols">
          <Reveal>
            <img className="t21-side" src={peonyPainting} alt="" />
          </Reveal>
          <ol className="t21-steps">
            {data.timeline.map((s, i) => (
              <Reveal key={s.time} delay={i * 120}>
                <li>
                  <b>{s.time}</b>
                  <span>{s.label}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="t21-page t21-blush">
        <PageHead no="04" title="Album" />
        <div className="t21-album k-album">
          {data.album.map((p, i) => (
            <Reveal
              key={p.key}
              variant={i % 2 ? "right" : "left"}
              delay={i * 100}
              className={photoShape(p)}
            >
              <figure>
                <img src={photoSrc(p)} alt="" />
                <figcaption>0{i + 1}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t21-page">
        <PageHead no="05" title="Hồi âm" />
        <Reveal>
          <RsvpForm data={data} variant="select" title="Xác nhận tham dự" />
        </Reveal>
        <PageHead no="06" title="Mừng cưới" />
        <Reveal>
          <GiftCard data={data} />
        </Reveal>
      </section>

      <footer className="t21-foot">
        <img src={peonyPainting} alt="" />
        <div>
          <p>The end · and the beginning</p>
          <h2>
            {data.groom} <span>&amp;</span> {data.bride}
          </h2>
        </div>
      </footer>
    </Page>
  );
};

export default Template21;
