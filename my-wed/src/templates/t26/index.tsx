import { useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t26/styles.scss";
import { WeddingData } from "@/core/types";
import { Drifters, Reveal, useSeconds } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  Families,
  GiftCard,
  RsvpForm,
  VenueActions,
  photoSrc,
  useGuestName,
} from "@/templates/_kit/sections";

const MonthGrid = ({ iso }: { iso: string }) => {
  const date = new Date(iso);
  const y = date.getFullYear();
  const m = date.getMonth();
  const offset = (new Date(y, m, 1).getDay() + 6) % 7;
  const total = new Date(y, m + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: offset }, () => 0),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];
  return (
    <div className="t26-cal">
      {cells.map((v, i) => (
        <span key={i} className={v === date.getDate() ? "t26-hit" : ""}>
          {v || ""}
        </span>
      ))}
    </div>
  );
};

const Template26 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const t = useSeconds(data.weddingISO);
  const guest = useGuestName();
  const [opened, setOpened] = useState(false);
  const [a1, a2, a3, a4] = data.album;

  return (
    <Page className={`t26-root ${opened ? "t26-opened" : ""}`}>
      <Drifters kind="heart" count={7} color="#e8a3a8" opacity={0.6} />

      {/* cover: names either side of a red envelope holding the photo */}
      <section className="t26-cover">
        <p className="t26-spaced">Wedding invitation</p>
        <h1 className="t26-head">Thiệp mời cưới</h1>
        <div className="t26-cover-names">
          <i>{data.bride}</i>
          <i>{data.groom}</i>
        </div>
        <button
          type="button"
          className="t26-env"
          onClick={() => {
            setOpened(true);
            // let the card rise, then move on to the invitation
            window.setTimeout(() => {
              document
                .querySelector(".t26-invite")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 1300);
          }}
          aria-label="Mở thiệp"
        >
          <span className="t26-env-back" />
          <span className="t26-env-photo">
            <img src={photoSrc(data.photos.couple)} alt="" />
          </span>
          <span className="t26-env-front" />
          <span className="t26-env-flap" />
          <span className="t26-seal" />
        </button>
        <p className="t26-tap">
          <i>{opened ? "Cuộn xuống để xem thiệp" : "Chạm để mở thiệp"}</i>
        </p>
      </section>

      {/* invitation over a photo, with the countdown */}
      <section className="t26-invite">
        <img src={photoSrc(data.photos.cover)} alt="" />
        <Reveal>
          <div className="t26-count">
            {[
              [t.days, "ngày"],
              [t.hours, "giờ"],
              [t.minutes, "phút"],
              [t.seconds, "giây"],
            ].map(([v, l]) => (
              <div key={l}>
                <b>{v}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>
          <div className="t26-invite-card">
            <p className="t26-spaced t26-rose">Invitation</p>
            <p>
              Gửi đến {guest || "gia đình và bạn bè thân mến"},
              <br />
              cảm ơn {guest ? "bạn" : "mọi người"} đã dành thời gian quý báu để
              cùng chúng mình chung vui trong ngày đặc biệt này. Trân trọng kính
              mời {guest || "bạn"} đến dự lễ cưới của chúng mình.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="t26-sec">
        <Reveal>
          <div className="t26-ceremony">
            <span className="t26-vert">Lễ Thành Hôn</span>
            <p>
              <i>{data.groom}</i>
              <em>&amp;</em>
              <i>{data.bride}</i>
            </p>
          </div>
        </Reveal>
        <Reveal>
          <Families data={data} className="t26-fam" />
        </Reveal>
        <Reveal>
          <div className="t26-when">
            <p className="t26-cond">Tiệc mừng lễ thành hôn</p>
            <p className="t26-cond-sm">
              Vào lúc {d.time} · {d.weekday.toLowerCase()}
            </p>
            <div className="t26-bigdate">
              <span>Tháng {Number(d.month)}</span>
              <b>{d.day}</b>
              <span>Năm {d.year}</span>
            </div>
            <p className="t26-cond-sm">Địa điểm tổ chức</p>
            <p className="t26-cond">{data.venueName}</p>
            <p className="t26-muted">{data.venueAddress}</p>
            <VenueActions data={data} />
          </div>
        </Reveal>
      </section>

      {/* "marry me? / yes! I do" collage */}
      <section className="t26-marry">
        <p className="t26-spaced t26-rose">Sweet wedding</p>
        <div className="t26-marry-a">
          <Reveal variant="right">
            <img src={photoSrc(a1)} alt="" />
          </Reveal>
          <p className="t26-big">
            MARRY
            <br />
            <span>ME?</span>
          </p>
        </div>
        <div className="t26-marry-b">
          <Reveal variant="left">
            <img src={photoSrc(a2)} alt="" />
          </Reveal>
          <p className="t26-big t26-yes">
            YES!
            <br />I DO
          </p>
        </div>
      </section>

      {/* about the bride and the groom */}
      <section className="t26-sec">
        <Reveal>
          <p className="t26-about">About us</p>
        </Reveal>
        <Reveal variant="left">
          <div className="t26-person">
            <img src={photoSrc(data.photos.destiny)} alt="" />
            <div>
              <i>{data.bride}</i>
              <span>Cô dâu</span>
            </div>
            <span className="t26-side">Bride</span>
          </div>
        </Reveal>
        <Reveal variant="right">
          <div className="t26-person t26-person-r">
            <img src={photoSrc(a3)} alt="" />
            <div>
              <i>{data.groom}</i>
              <span>Chú rể</span>
            </div>
            <span className="t26-side">Groom</span>
          </div>
        </Reveal>
      </section>

      {/* save the date: calendar over a photo, then the timeline */}
      <section className="t26-save">
        <Reveal>
          <p className="t26-savetitle">
            Save the date
            <span>
              {d.year} / {d.month}
            </span>
          </p>
        </Reveal>
        <Reveal>
          <div className="t26-calwrap">
            <img src={photoSrc(a4)} alt="" />
            <MonthGrid iso={data.weddingISO} />
          </div>
        </Reveal>
        <Reveal>
          <ol className="t26-steps">
            {data.timeline.map((s) => (
              <li key={s.time}>
                <b>{s.time}</b>
                <i />
                <span>{s.label}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* framed photos with vertical words */}
      <section className="t26-framed">
        <p className="t26-spaced t26-rose">Invitation</p>
        <div className="t26-frame">
          <span className="t26-vert-l">love you forever</span>
          <span className="t26-vert-r">nice to meet you</span>
          {[data.photos.couple, a1, a2].map((p, i) => (
            <Reveal key={p.key + i} variant="zoom" delay={i * 120}>
              <img src={photoSrc(p)} alt="" />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="t26-muted t26-center">
            Đám cưới của chúng mình sẽ trọn vẹn hơn khi có thêm lời chúc phúc và
            sự hiện diện của {guest || "bạn"}.
          </p>
        </Reveal>
      </section>

      <section className="t26-sec">
        <Reveal>
          <div className="t26-arch">
            <p className="t26-spaced">R.S.V.P.</p>
            <RsvpForm data={data} title="Xác nhận tham dự" />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="t26-gift-title">Gửi quà mừng</h2>
          <GiftCard data={data} />
        </Reveal>
      </section>

      <footer className="t26-foot">
        <img src={photoSrc(data.photos.cover)} alt="" />
        <p>Thank you</p>
      </footer>
    </Page>
  );
};

export default Template26;
