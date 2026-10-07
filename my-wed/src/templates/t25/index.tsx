import { useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t25/styles.scss";
import { WeddingData } from "@/core/types";
import { Reveal, useSeconds } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import {
  Families,
  GiftCard,
  RsvpForm,
  VenueActions,
  photoSrc,
  useGuestName,
} from "@/templates/_kit/sections";

// month grid, Sunday first, with the wedding day filled in
const MonthGrid = ({ iso }: { iso: string }) => {
  const date = new Date(iso);
  const y = date.getFullYear();
  const m = date.getMonth();
  const offset = new Date(y, m, 1).getDay();
  const total = new Date(y, m + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: offset }, () => 0),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];
  return (
    <div className="t25-cal">
      {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d, i) => (
        <b key={d} className={i === 0 ? "t25-sun" : ""}>
          {d}
        </b>
      ))}
      {cells.map((v, i) => (
        <span
          key={i}
          className={`${v === date.getDate() ? "t25-hit" : ""} ${i % 7 === 0 ? "t25-sun" : ""}`}
        >
          {v || ""}
        </span>
      ))}
    </div>
  );
};

const Template25 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const t = useSeconds(data.weddingISO);
  const guest = useGuestName();
  const photos = [data.photos.cover, ...data.album, data.photos.destiny];
  const [current, setCurrent] = useState(0);
  const short = (n: string) => n.trim().split(/\s+/).pop();

  return (
    <Page className="t25-root">
      {/* black cover with huge type */}
      <section className="t25-cover">
        <h1 aria-label="forever">
          <span>for</span>
          <span>
            ever<i>.</i>
          </span>
        </h1>
        <div className="t25-cover-names">
          <span>{data.groom}</span>
          <span>{data.bride}</span>
        </div>
      </section>

      <section className="t25-sec t25-center">
        <Reveal>
          <p className="t25-kicker">Invitation</p>
          <h2 className="t25-title">
            {guest ? `Thân mời ${guest}` : "Lời mời chân thành"}
          </h2>
        </Reveal>
        <Reveal>
          <p className="t25-body">
            Hôm nay không chỉ là ngày cưới,
            <br />
            mà là ngày chúng mình viết tiếp hành trình đã bắt đầu từ rất lâu.
            <br />
            <br />
            Rất hân hạnh được chào đón {guest || "bạn"}.
          </p>
        </Reveal>
        <Reveal variant="zoom">
          <img
            className="t25-photo"
            src={photoSrc(data.photos.destiny)}
            alt=""
          />
        </Reveal>
      </section>

      <section className="t25-sec t25-center">
        <Reveal>
          <p className="t25-kicker">Wedding info</p>
          <h2 className="t25-title">Thông tin lễ cưới</h2>
        </Reveal>
        <Reveal>
          <Families data={data} className="t25-fam" />
        </Reveal>
        <Reveal>
          <p className="t25-caps">
            Trân trọng báo tin
            <br />
            lễ thành hôn của con chúng tôi
          </p>
          <p className="t25-names">
            {data.groom}
            <span>&amp;</span>
            {data.bride}
          </p>
        </Reveal>
        <Reveal>
          <p className="t25-kicker">Wedding invitation</p>
          <h2 className="t25-title">
            {guest ? `Trân trọng kính mời ${guest}` : "Trân trọng kính mời"}
          </h2>
          <p className="t25-caps t25-gap">Lễ thành hôn</p>
          <p className="t25-time">{d.time}</p>
          <div className="t25-date">
            <span>{d.weekday}</span>
            <b>{d.day}</b>
            <span>Tháng {d.month}</span>
          </div>
          <p className="t25-year">{d.year}</p>
        </Reveal>
      </section>

      {/* "Two hearts / one story" over the photo */}
      <section className="t25-story">
        <Reveal>
          <p className="t25-script">Two Hearts</p>
          <img src={photoSrc(data.photos.cover)} alt="" />
          <p className="t25-serif">ONE STORY</p>
          <div className="t25-years">
            <span>{Number(d.year) - 3}</span>
            <i />
            <span>{d.year}</span>
          </div>
        </Reveal>
        <Reveal>
          <p className="t25-stamp">
            {d.year}.{d.month}.{d.day}
          </p>
          <p className="t25-body">
            {d.weekday.toLowerCase().replace(/^./, (c) => c.toUpperCase())},{" "}
            {d.time}
          </p>
          <MonthGrid iso={data.weddingISO} />
          <div className="t25-count">
            {[
              [t.days, "ngày"],
              [t.hours, "giờ"],
              [t.minutes, "phút"],
              [t.seconds, "giây"],
            ].map(([v, l], i) => (
              <div key={l}>
                {i > 0 && <em>:</em>}
                <small>{l}</small>
                <b>{v}</b>
              </div>
            ))}
          </div>
          <p className="t25-body">
            Còn {t.days} ngày nữa là đến đám cưới của {short(data.groom)} và{" "}
            {short(data.bride)}.
          </p>
        </Reveal>
      </section>

      <section className="t25-sec t25-center">
        <Reveal>
          <p className="t25-kicker">Location</p>
          <h2 className="t25-title">Địa điểm tổ chức</h2>
          <p className="t25-place">{data.venueName}</p>
          <p className="t25-body">{data.venueAddress}</p>
          <VenueActions data={data} />
        </Reveal>
        <Reveal>
          <ol className="t25-steps">
            {data.timeline.map((s) => (
              <li key={s.time}>
                <b>{s.time}</b>
                <span>{s.label}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* gallery: one large photo + thumbnails to switch */}
      <section className="t25-gallery">
        <Reveal>
          <p className="t25-kicker">Gallery</p>
          <h2 className="t25-title">Khoảnh khắc của chúng mình</h2>
        </Reveal>
        <Reveal>
          <div className="t25-stage">
            {photos.map((p, i) => (
              <img
                key={p.key}
                src={photoSrc(p)}
                alt=""
                className={i === current ? "on" : ""}
              />
            ))}
          </div>
          <div className="t25-thumbs">
            {photos.map((p, i) => (
              <button
                key={p.key}
                type="button"
                className={i === current ? "on" : ""}
                onClick={() => setCurrent(i)}
                aria-label={`Ảnh ${i + 1}`}
              >
                <img src={photoSrc(p)} alt="" />
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="t25-sec">
        <Reveal>
          <p className="t25-kicker t25-center">R.S.V.P.</p>
          <RsvpForm data={data} variant="select" title="Xác nhận tham dự" />
        </Reveal>
        <Reveal>
          <p className="t25-kicker t25-center">Account</p>
          <h2 className="t25-title t25-center">Mừng cưới</h2>
          <GiftCard data={data} />
        </Reveal>
      </section>

      <footer className="t25-foot">
        <img src={photoSrc(data.album[0])} alt="" />
        <div>
          <p>Cảm ơn bạn đã ghé thăm tấm thiệp nhỏ này.</p>
          <p>
            Sự hiện diện và lời chúc của bạn
            <br />
            là món quà ý nghĩa nhất với chúng mình.
          </p>
          <p>
            With love,
            <br />
            {short(data.groom)} &amp; {short(data.bride)}
          </p>
        </div>
      </footer>
    </Page>
  );
};

export default Template25;
