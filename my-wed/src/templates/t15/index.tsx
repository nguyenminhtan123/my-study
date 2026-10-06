import { useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t15/styles.scss";
import { WeddingData } from "@/core/types";
import lanterns from "@/static/t15-lanterns.jpg";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  CalendarCard,
  Countdown,
  GiftCard,
  RsvpForm,
  VenueActions,
  photoSrc,
} from "@/templates/_kit/sections";

const Seal = ({ small = false }: { small?: boolean }) => (
  <span className={`t15-seal ${small ? "t15-seal-sm" : ""}`}>囍</span>
);

const Template15 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const [opened, setOpened] = useState(false);

  return (
    <Page className={`t15-root ${opened ? "t15-opened" : ""}`}>
      {/* red brocade envelope */}
      <div className="t15-env" onClick={() => setOpened(true)}>
        <div className="t15-env-box">
          <div className="t15-env-back" />
          <div className="t15-env-letter">
            <p>Thiệp hồng</p>
            <h2>
              {data.groom}
              <i>&amp;</i>
              {data.bride}
            </h2>
          </div>
          <div className="t15-env-front" />
          <div className="t15-env-flap" />
          <button type="button" className="t15-env-seal">
            <Seal />
          </button>
        </div>
        <p className="t15-env-hint">Chạm để mở thiệp</p>
      </div>

      <Drifters kind="sparkle" count={9} color="#f1cf7e" opacity={0.7} />

      <section className="t15-hero">
        <img className="t15-hero-bg" src={lanterns} alt="" />
        <div className="t15-hero-text">
          <Seal />
          <p className="t15-kicker">Lễ thành hôn</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <p className="t15-hero-date">
            {d.day} · {d.month} · {d.year}
          </p>
        </div>
      </section>

      <section className="t15-paper">
        <Reveal>
          <div className="t15-frame t15-invite">
            <p className="t15-kicker">Trân trọng báo tin</p>
            <h2 className="t15-title">Lễ Vu Quy &amp; Thành Hôn</h2>
            <div className="t15-fam">
              <div>
                <b>Nhà trai</b>
                {data.families.groom.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </div>
              <Seal small />
              <div>
                <b>Nhà gái</b>
                {data.families.bride.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </div>
            </div>
            <p className="t15-muted">
              Hân hạnh báo tin lễ thành hôn của con chúng tôi
            </p>
            <div className="t15-couple">
              <div>
                <span>Chú rể</span>
                <b>{data.groom}</b>
              </div>
              <div>
                <span>Cô dâu</span>
                <b>{data.bride}</b>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="t15-brocade">
        <Reveal variant="zoom">
          <p className="t15-kicker t15-gold">Ngày chung đôi</p>
          <p className="t15-bigdate">
            {d.day}
            <span>/</span>
            {d.month}
            <span>/</span>
            {d.year}
          </p>
          <p className="t15-gold-line">
            {d.weekday} · {d.time}
          </p>
          <Countdown iso={data.weddingISO} />
        </Reveal>
      </section>

      <section className="t15-paper">
        <Reveal>
          <div className="t15-photo-frame">
            <img src={photoSrc(data.photos.couple)} alt="" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t15-frame">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <div className="t15-frame t15-venue">
            <p className="t15-kicker">Tiệc cưới tổ chức tại</p>
            <h2 className="t15-title">{data.venueName}</h2>
            <p className="t15-muted">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="t15-title t15-center">Chương trình</h2>
        </Reveal>
        <ol className="t15-steps">
          {data.timeline.map((s, i) => (
            <Reveal
              key={s.time}
              variant={i % 2 ? "right" : "left"}
              delay={i * 120}
            >
              <li>
                <b>{s.time}</b>
                <span>{s.label}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="t15-brocade t15-album">
        <Reveal>
          <h2 className="t15-title t15-gold">Khoảnh khắc</h2>
        </Reveal>
        <div className="t15-grid">
          {data.album.map((p, i) => (
            <Reveal key={p.key} variant="zoom" delay={i * 120}>
              <img src={photoSrc(p)} alt="" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t15-paper">
        <Reveal>
          <div className="t15-frame">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t15-frame">
            <h2 className="t15-title t15-center">Hộp mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t15-foot">
        <img src={lanterns} alt="" />
        <div>
          <Seal />
          <p>Hân hạnh đón tiếp</p>
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

export default Template15;
