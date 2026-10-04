import { FormEvent, useState } from "react";
import { Page, useSnackbar } from "zmp-ui";

import "@/templates/t02/styles.scss";
import { useCountdown } from "@/core/hooks/use-countdown";
import { GiftSide, PhotoSlot, WeddingData } from "@/core/types";
import { openLink } from "@/core/utils/open-link";
import {
  buildCalendarUrl,
  buildMapUrl,
  buildPlaceholder,
  copyText,
} from "@/core/utils/wedding";

const photoSrc = (photo: PhotoSlot) =>
  photo.src || buildPlaceholder(photo.label, photo.ratio);

const Hero = ({ data }: { data: WeddingData }) => (
  <section className="t02-hero">
    <img src={photoSrc(data.photos.cover)} alt="" />
    <div className="t02-hero-text">
      <p className="t02-eyebrow">Save the date</p>
      <h1>
        {data.groom}
        <span>&</span>
        {data.bride}
      </h1>
      <p className="t02-date">30 . 10 . 2026</p>
    </div>
  </section>
);

const Invitation = ({ data }: { data: WeddingData }) => {
  const countdown = useCountdown(data.weddingISO);
  const units = [
    { value: countdown.days, label: "ngày" },
    { value: countdown.hours, label: "giờ" },
    { value: countdown.minutes, label: "phút" },
  ];

  return (
    <section className="t02-section t02-center">
      <p className="t02-eyebrow">Trân trọng kính mời</p>
      <h2>Lễ thành hôn</h2>
      <p className="t02-muted">
        Chúng mình rất hạnh phúc được mời bạn đến chung vui trong ngày trọng
        đại.
      </p>
      <div className="t02-count">
        {units.map((unit) => (
          <div key={unit.label}>
            <b>{unit.value}</b>
            <span>{unit.label}</span>
          </div>
        ))}
      </div>
      <div className="t02-rule" />
      <p className="t02-eyebrow">Địa điểm</p>
      <h3>{data.venueName}</h3>
      <p className="t02-muted">{data.venueAddress}</p>
      <div className="t02-actions">
        <button
          type="button"
          onClick={() => openLink(buildMapUrl(data.venueQuery))}
        >
          Chỉ đường
        </button>
        <button
          type="button"
          onClick={() =>
            openLink(
              buildCalendarUrl(
                data.eventTitle,
                data.calendarDates,
                data.venueQuery,
              ),
            )
          }
        >
          Lưu vào lịch
        </button>
      </div>
    </section>
  );
};

const Families = ({ data }: { data: WeddingData }) => (
  <section className="t02-section t02-families">
    {(["groom", "bride"] as GiftSide[]).map((side) => (
      <div key={side}>
        <p className="t02-eyebrow">
          {side === "groom" ? "Nhà trai" : "Nhà gái"}
        </p>
        {data.families[side].map((parent) => (
          <p key={parent}>{parent}</p>
        ))}
      </div>
    ))}
  </section>
);

const Timeline = ({ data }: { data: WeddingData }) => (
  <section className="t02-section t02-center">
    <p className="t02-eyebrow">Chương trình</p>
    <h2>Ngày vui của chúng mình</h2>
    <ol className="t02-timeline">
      {data.timeline.map((step) => (
        <li key={step.time}>
          <b>{step.time}</b>
          <span>{step.label}</span>
        </li>
      ))}
    </ol>
  </section>
);

const Album = ({ data }: { data: WeddingData }) => (
  <section className="t02-section">
    <p className="t02-eyebrow t02-center">Album</p>
    <h2 className="t02-center">Khoảnh khắc</h2>
    <div className="t02-album">
      {data.album.map((photo) => (
        <img key={photo.key} src={photoSrc(photo)} alt={photo.label} />
      ))}
    </div>
  </section>
);

const Rsvp = ({ data }: { data: WeddingData }) => {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(true);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      setError(true);
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <section className="t02-section t02-center">
        <h2>Cảm ơn bạn</h2>
        <p className="t02-muted">Chúng mình đã nhận được phản hồi của bạn.</p>
      </section>
    );
  }

  return (
    <section className="t02-section t02-center">
      <p className="t02-eyebrow">RSVP</p>
      <h2>Xác nhận tham dự</h2>
      <p className="t02-muted">
        Vui lòng phản hồi trước ngày {data.rsvpDeadline}.
      </p>
      <form className="t02-form" onSubmit={submit} noValidate>
        <input
          value={name}
          placeholder="Họ và tên"
          onChange={(event) => {
            setName(event.target.value);
            setError(false);
          }}
        />
        {error && <small>Vui lòng nhập họ tên</small>}
        <div className="t02-choice">
          <button
            type="button"
            className={attending ? "on" : ""}
            onClick={() => setAttending(true)}
          >
            Sẽ tham dự
          </button>
          <button
            type="button"
            className={attending ? "" : "on"}
            onClick={() => setAttending(false)}
          >
            Rất tiếc, không đến được
          </button>
        </div>
        <button type="submit" className="t02-primary">
          Gửi xác nhận
        </button>
      </form>
    </section>
  );
};

const Gift = ({ data }: { data: WeddingData }) => {
  const [side, setSide] = useState<GiftSide>("groom");
  const { openSnackbar } = useSnackbar();
  const gift = data.gifts[side];

  const copy = async () => {
    const copied = await copyText(gift.account.replace(/\s/g, ""));
    openSnackbar({
      text: copied ? "Đã sao chép số tài khoản" : gift.account,
      type: "success",
      duration: 2500,
    });
  };

  return (
    <section className="t02-section t02-center">
      <p className="t02-eyebrow">Mừng cưới</p>
      <h2>Gửi lời chúc</h2>
      <div className="t02-choice">
        <button
          type="button"
          className={side === "groom" ? "on" : ""}
          onClick={() => setSide("groom")}
        >
          Chú rể
        </button>
        <button
          type="button"
          className={side === "bride" ? "on" : ""}
          onClick={() => setSide("bride")}
        >
          Cô dâu
        </button>
      </div>
      <div className="t02-card">
        {gift.qr && <img src={gift.qr} alt="QR chuyển khoản" />}
        <p className="t02-muted">{gift.bank}</p>
        <b>{gift.account}</b>
        <p>{gift.owner}</p>
        <button type="button" onClick={copy}>
          Sao chép số tài khoản
        </button>
      </div>
    </section>
  );
};

const Template02 = ({ data }: { data: WeddingData }) => (
  <Page className="t02-root">
    <Hero data={data} />
    <Invitation data={data} />
    <Families data={data} />
    <Timeline data={data} />
    <Album data={data} />
    <Rsvp data={data} />
    <Gift data={data} />
    <footer className="t02-foot">
      <h2>
        {data.groom} & {data.bride}
      </h2>
      <p className="t02-muted">
        Cảm ơn bạn đã là một phần trong ngày đặc biệt.
      </p>
    </footer>
  </Page>
);

export default Template02;
