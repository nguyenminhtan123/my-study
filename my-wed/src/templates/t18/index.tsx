import { ReactNode } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t18/styles.scss";
import { WeddingData } from "@/core/types";
import painting from "@/static/t18-blossom-painting.jpg";
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

const initial = (name: string) => name.trim().split(/\s+/).pop()?.[0] ?? "";

// a section with its label written vertically down the left margin
const Block = ({ label, children }: { label: string; children: ReactNode }) => (
  <section className="t18-block">
    <Reveal variant="fade">
      <h3 className="t18-label">{label}</h3>
    </Reveal>
    <div className="t18-body">{children}</div>
  </section>
);

const Template18 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const seal = (
    <span className="t18-seal">
      {initial(data.groom)}
      <br />
      {initial(data.bride)}
    </span>
  );

  return (
    <Page className="t18-root">
      <Drifters kind="petal" count={12} color="#e8a9ad" opacity={0.75} />

      <section className="t18-hero">
        <img src={painting} alt="" />
        <div className="t18-names">
          <h1>{data.groom}</h1>
          <span className="t18-and">và</span>
          <h1>{data.bride}</h1>
        </div>
        <div className="t18-hero-foot">
          {seal}
          <p>
            Lễ thành hôn
            <br />
            {d.day} · {d.month} · {d.year}
          </p>
        </div>
      </section>

      <Block label="Lời mời">
        <Reveal>
          <p className="t18-lead">
            Như cánh đào đợi xuân, chúng mình đã đợi ngày này. Trân trọng kính
            mời bạn đến chung vui.
          </p>
        </Reveal>
        <Reveal>
          <div className="t18-fam">
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
      </Block>

      <Block label="Ngày cưới">
        <Reveal>
          <p className="t18-date">
            {d.day}
            <small>tháng {Number(d.month)}</small>
          </p>
          <p className="t18-sub">
            {d.weekday} · {d.time} · {d.year}
          </p>
        </Reveal>
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
        <Reveal>
          <CalendarCard iso={data.weddingISO} />
        </Reveal>
      </Block>

      <Block label="Địa điểm">
        <Reveal>
          <h2 className="t18-title">{data.venueName}</h2>
          <p className="t18-sub">{data.venueAddress}</p>
          <VenueActions data={data} />
        </Reveal>
      </Block>

      <Block label="Chương trình">
        <ol className="t18-steps">
          {data.timeline.map((s, i) => (
            <Reveal key={s.time} delay={i * 120}>
              <li>
                <b>{s.time}</b>
                <span>{s.label}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </Block>

      <section className="t18-scrolls">
        <Reveal variant="fade">
          <h3 className="t18-label t18-label-row">Khoảnh khắc</h3>
        </Reveal>
        <div className="t18-scroll-row k-album">
          {data.album.map((p, i) => (
            <Reveal key={p.key} delay={i * 140} className={photoShape(p)}>
              <figure className="t18-scroll">
                <img src={photoSrc(p)} alt="" />
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <Block label="Hồi âm">
        <Reveal>
          <RsvpForm data={data} title="Xác nhận tham dự" />
        </Reveal>
      </Block>

      <Block label="Mừng cưới">
        <Reveal>
          <GiftCard data={data} />
        </Reveal>
      </Block>

      <footer className="t18-foot">
        <img src={painting} alt="" />
        <div>
          {seal}
          <p>Cảm ơn bạn đã đến</p>
        </div>
      </footer>
    </Page>
  );
};

export default Template18;
