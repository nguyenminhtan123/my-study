import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t05/styles.scss";
import { WeddingData } from "@/core/types";
import seaWave from "@/static/sea-wave.jpg";
import starfish from "@/static/starfish.jpg";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
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

const Waves = ({ className = "" }: { className?: string }) => (
  <div className={`t05-waves ${className}`} aria-hidden="true">
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="t05-w1">
      <path d="M0 40 C100 10 200 70 300 40 S500 10 600 40 S800 70 900 40 S1100 10 1200 40 V80 H0Z" />
    </svg>
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="t05-w2">
      <path d="M0 46 C100 76 200 16 300 46 S500 76 600 46 S800 16 900 46 S1100 76 1200 46 V80 H0Z" />
    </svg>
  </div>
);

const Template05 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);

  return (
    <Page className="t05-root">
      <Drifters kind="bubble" count={12} />

      <section className="t05-cover">
        <p className="t05-couple-script">{data.bride}</p>
        <div className="t05-frame">
          <img src={photoSrc(data.photos.cover)} alt="" />
          <Waves className="t05-frame-waves" />
        </div>
        <img className="t05-star t05-star-a" src={starfish} alt="" />
      </section>

      <section className="t05-std">
        <Reveal>
          <p className="t05-script">Save the Date</p>
        </Reveal>
        <Reveal variant="zoom">
          <div className="t05-cal">
            <CalendarCard iso={data.weddingISO} />
            <div className="t05-sea">
              <Waves />
            </div>
          </div>
        </Reveal>
        <Reveal>
          <h2 className="t05-names">
            {data.groom}
            <i>and</i>
            {data.bride}
          </h2>
        </Reveal>
      </section>

      <section className="t05-invite">
        <Reveal>
          <p className="t05-cap">
            Trân trọng kính mời bạn tới tham dự buổi
            <br />
            tiệc cưới cùng gia đình chúng tôi
          </p>
          <p className="t05-when">
            {d.time} . {d.weekday}
          </p>
          <p className="t05-when">
            {d.day} | {d.month} | {d.year}
          </p>
          <p className="t05-cap">Tại nhà hàng tiệc cưới</p>
          <h3>{data.venueName}</h3>
          <p className="t05-addr">{data.venueAddress}</p>
          <div className="t05-fam">
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
          </div>
          <VenueActions data={data} />
        </Reveal>
      </section>

      <section className="t05-pair">
        <div className="t05-pair-photos">
          <Reveal variant="left">
            <figure>
              <img src={photoSrc(data.photos.couple)} alt="" />
              <figcaption>CHÚ RỂ</figcaption>
            </figure>
          </Reveal>
          <Reveal variant="right" delay={160}>
            <figure>
              <img src={photoSrc(data.album[0])} alt="" />
              <figcaption>CÔ DÂU</figcaption>
            </figure>
          </Reveal>
        </div>
        <div className="t05-pair-names">
          <span>{data.groom}</span>
          <span>{data.bride}</span>
        </div>
        <div className="t05-wave-photo">
          <img src={seaWave} alt="" />
        </div>
      </section>

      <section className="t05-story">
        <img className="t05-star t05-star-b" src={starfish} alt="" />
        <Reveal variant="right">
          <h2 className="t05-script t05-story-title">Love Story</h2>
        </Reveal>
        <Reveal className="t05-story-list">
          <div>
            <b>2020</b>
            <h4>GẶP GỠ VÀ BẮT ĐẦU</h4>
            <p>Một cuộc gặp gỡ tình cờ đã mở ra câu chuyện của chúng mình.</p>
          </div>
          <div>
            <b>2022</b>
            <h4>ĐỒNG HÀNH VÀ YÊU THƯƠNG</h4>
            <p>Cùng nhau vượt qua thử thách, chia sẻ niềm vui và nỗi buồn.</p>
          </div>
        </Reveal>
      </section>

      <section className="t05-time">
        <Reveal variant="left">
          <h2 className="t05-script">Timeline</h2>
        </Reveal>
        <WindingTimeline steps={data.timeline} />
        <Reveal variant="left">
          <h2 className="t05-script">Dresscode</h2>
        </Reveal>
        <Dresscode colors={data.dressColors} />
      </section>

      <section className="t05-count">
        <Reveal>
          <h2 className="t05-script">Countdown</h2>
          <Countdown iso={data.weddingISO} />
        </Reveal>
      </section>

      <section className="t05-album">
        <Reveal>
          <h2 className="t05-script t05-light">Wedding Day</h2>
        </Reveal>
        <Mosaic photos={data.album} />
      </section>

      <section className="t05-form">
        <Reveal>
          <RsvpForm data={data} />
        </Reveal>
      </section>

      <section className="t05-gift">
        <Reveal>
          <GiftCard data={data} />
        </Reveal>
        <Reveal variant="zoom">
          <p className="t05-thanks">Thank you!</p>
        </Reveal>
      </section>
    </Page>
  );
};

export default Template05;
