import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t20/styles.scss";
import { WeddingData } from "@/core/types";
import field from "@/static/t20-sunflower-sunset.jpg";
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

const Template20 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t20-root">
      <Drifters kind="sparkle" count={8} color="#ffd27a" opacity={0.6} />

      <section className="t20-hero">
        <img src={field} alt="" />
        <span className="t20-glow" aria-hidden="true" />
        <div className="t20-hero-text">
          <p className="t20-kicker">Save the date</p>
          <h1>
            {data.groom}
            <i>and</i>
            {data.bride}
          </h1>
        </div>
      </section>

      <section className="t20-sec t20-sun-sec">
        <Reveal variant="zoom">
          <div className="t20-sun">
            <span className="t20-rays" aria-hidden="true" />
            <div className="t20-sun-face">
              <small>{d.weekday}</small>
              <b>{d.day}</b>
              <span>
                Tháng {d.month} · {d.year}
              </span>
              <small>{d.time}</small>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <Countdown iso={data.weddingISO} />
        </Reveal>
      </section>

      <section className="t20-sec">
        <Reveal>
          <div className="t20-card t20-invite">
            <p className="t20-kicker">Trân trọng kính mời</p>
            <h2 className="t20-title">
              Ngày nắng đẹp nhất <i>của chúng mình</i>
            </h2>
            <div className="t20-fam">
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
          </div>
        </Reveal>
        <Reveal>
          <div className="t20-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
      </section>

      <section className="t20-venue">
        <img src={field} alt="" />
        <Reveal>
          <div className="t20-card">
            <p className="t20-kicker">Địa điểm</p>
            <h2 className="t20-title">{data.venueName}</h2>
            <p className="t20-muted">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
      </section>

      <section className="t20-sec">
        <Reveal>
          <h2 className="t20-title t20-center">Lịch trình</h2>
        </Reveal>
        <div className="t20-steps">
          {data.timeline.map((s, i) => (
            <Reveal key={s.time} variant="zoom" delay={i * 120}>
              <div>
                <em>{i + 1}</em>
                <b>{s.time}</b>
                <span>{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t20-sec t20-album">
        <Reveal>
          <h2 className="t20-title t20-center">
            <i>Những ngày nắng</i>
          </h2>
          <p className="t20-muted t20-center">Vuốt để xem thêm ›</p>
        </Reveal>
        <div className="t20-reel">
          {[data.photos.cover, ...data.album].map((p) => (
            <figure key={p.key}>
              <img src={photoSrc(p)} alt="" />
            </figure>
          ))}
        </div>
      </section>

      <section className="t20-sec">
        <Reveal>
          <div className="t20-card">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t20-card">
            <h2 className="t20-title t20-center">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t20-foot">
        <img src={field} alt="" />
        <div>
          <p className="t20-kicker">Cảm ơn bạn</p>
          <h2>
            {data.groom}
            <i>and</i>
            {data.bride}
          </h2>
        </div>
      </footer>
    </Page>
  );
};

export default Template20;
