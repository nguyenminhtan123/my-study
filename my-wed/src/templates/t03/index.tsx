import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t03/styles.scss";
import { WeddingData } from "@/core/types";
import bridge from "@/static/t03-monet-bridge.jpg";
import lilies from "@/static/t03-monet-lilies.jpg";
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

// a picture hung like in a museum: gilt frame, mat, small plaque
const Framed = ({
  src,
  plaque,
  ratio = "4 / 5",
}: {
  src: string;
  plaque?: string;
  ratio?: string;
}) => (
  <figure className="t03-framed">
    <div className="t03-gilt">
      <img src={src} alt="" style={{ aspectRatio: ratio }} />
    </div>
    {plaque && <figcaption>{plaque}</figcaption>}
  </figure>
);

const Template03 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t03-root">
      <Drifters kind="petal" count={10} color="#e6b3bf" opacity={0.7} />

      <section className="t03-hero">
        <img src={lilies} alt="" />
        <div className="t03-hero-text">
          <p className="t03-small">Lễ thành hôn</p>
          <h1>
            {data.groom}
            <i>&amp;</i>
            {data.bride}
          </h1>
          <p className="t03-hero-date">
            {d.day} · {d.month} · {d.year}
          </p>
        </div>
      </section>

      <section className="t03-sec t03-center">
        <Reveal>
          <p className="t03-small">Trân trọng kính mời</p>
          <h2 className="t03-title">
            Như hoa súng nở trên mặt hồ yên,
            <br />
            chúng mình về chung một nhà
          </h2>
        </Reveal>
        <Reveal>
          <div className="t03-fam">
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
        <Reveal variant="zoom">
          <Framed
            src={photoSrc(data.photos.cover)}
            plaque={`${data.groom} & ${data.bride} · ${d.year}`}
          />
        </Reveal>
      </section>

      <section
        className="t03-band"
        style={{ backgroundImage: `url(${lilies})` }}
      >
        <Reveal>
          <div className="t03-glass">
            <p className="t03-small">Ngày chung đôi</p>
            <p className="t03-bigdate">
              {d.day}.{d.month}.{d.year}
            </p>
            <p className="t03-sub">
              {d.weekday} · {d.time}
            </p>
            <Countdown iso={data.weddingISO} />
          </div>
        </Reveal>
      </section>

      <section className="t03-sec">
        <Reveal>
          <div className="t03-card">
            <CalendarCard iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <Framed
            src={bridge}
            plaque="Claude Monet · Cây cầu Nhật Bản"
            ratio="4 / 3.4"
          />
        </Reveal>
        <Reveal>
          <div className="t03-center">
            <p className="t03-small">Địa điểm</p>
            <h2 className="t03-title">{data.venueName}</h2>
            <p className="t03-sub">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
      </section>

      <section className="t03-sec">
        <Reveal>
          <h2 className="t03-title t03-center">Chương trình</h2>
        </Reveal>
        <ol className="t03-steps">
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

      <section className="t03-sec t03-wall">
        <Reveal>
          <h2 className="t03-title t03-center">Phòng tranh của chúng mình</h2>
        </Reveal>
        <div className="t03-hang">
          {data.album.map((p, i) => (
            <Reveal key={p.key} variant="zoom" delay={i * 120}>
              <Framed src={photoSrc(p)} plaque={`No. ${i + 1}`} ratio="3 / 4" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="t03-sec">
        <Reveal>
          <div className="t03-card">
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <div className="t03-card">
            <h2 className="t03-title t03-center">Mừng cưới</h2>
            <GiftCard data={data} />
          </div>
        </Reveal>
      </section>

      <footer className="t03-foot">
        <img src={lilies} alt="" />
        <div>
          <p className="t03-small">Cảm ơn bạn</p>
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

export default Template03;
