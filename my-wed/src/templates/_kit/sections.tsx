import { FormEvent, ReactNode, useState } from "react";
import { useSnackbar } from "zmp-ui";

import { GiftSide, PhotoSlot, TimelineStep, WeddingData } from "@/core/types";
import { openLink } from "@/core/utils/open-link";
import {
  buildCalendarUrl,
  buildMapUrl,
  buildPlaceholder,
  copyText,
} from "@/core/utils/wedding";
import { Reveal, useSeconds } from "@/templates/_kit/anim";
import { IconPin, TIMELINE_ICONS } from "@/templates/_kit/icons";

export const photoSrc = (photo: PhotoSlot) =>
  photo.src || buildPlaceholder(photo.label, photo.ratio);

/** Month grid (Monday first) with the wedding day highlighted by a heart. */
export const CalendarCard = ({
  iso,
  monthClass = "",
}: {
  iso: string;
  monthClass?: string;
}) => {
  const date = new Date(iso);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const total = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];
  const monthName = date.toLocaleString("en-US", { month: "long" });

  return (
    <div className="k-cal">
      <div className={`k-cal-month ${monthClass}`}>{monthName}</div>
      <div className="k-cal-grid">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
          <span key={d} className="k-cal-dow">
            {d}
          </span>
        ))}
        {cells.map((value, i) => (
          <span
            key={i}
            className={`k-cal-day ${value === day ? "k-cal-hit" : ""}`}
          >
            {value === day ? <b>{value}</b> : value}
          </span>
        ))}
      </div>
    </div>
  );
};

export const Countdown = ({ iso }: { iso: string }) => {
  const t = useSeconds(iso);
  const units = [
    { v: t.days, l: "Ngày" },
    { v: t.hours, l: "Giờ" },
    { v: t.minutes, l: "Phút" },
    { v: t.seconds, l: "Giây" },
  ];
  return (
    <div className="k-count">
      {units.map((u) => (
        <div key={u.l}>
          <b>{u.v}</b>
          <span>{u.l}</span>
        </div>
      ))}
    </div>
  );
};

const POINTS = [
  { x: 232, y: 44 },
  { x: 86, y: 154 },
  { x: 222, y: 266 },
  { x: 100, y: 376 },
];
const PATH = "M232 44 C232 96 86 98 86 154 S222 212 222 266 S100 322 100 376";

/** Winding path that draws itself as it scrolls into view. */
export const WindingTimeline = ({ steps }: { steps: TimelineStep[] }) => (
  <Reveal variant="fade" className="k-wind-wrap">
    <div className="k-wind">
      <svg viewBox="0 0 300 430" aria-hidden="true">
        <path className="k-path" d={PATH} pathLength={1000} />
        {POINTS.map((p, i) => (
          <circle key={i} className="k-dot" cx={p.x} cy={p.y} r="5" />
        ))}
      </svg>
      {steps.slice(0, 4).map((step, i) => {
        const p = POINTS[i];
        const Icon = TIMELINE_ICONS[i];
        const right = p.x > 150;
        return (
          <div
            key={step.time}
            className={`k-wind-item ${right ? "k-r" : "k-l"}`}
            style={{
              top: p.y - 28,
              ...(right ? { right: 300 - (p.x - 18) } : { left: p.x + 18 }),
              transitionDelay: `${500 + i * 500}ms`,
            }}
          >
            <div className="k-wind-text">
              <b>{step.time}</b>
              <span>{step.label}</span>
            </div>
            <Icon />
          </div>
        );
      })}
    </div>
  </Reveal>
);

export const Dresscode = ({ colors }: { colors: string[] }) => (
  <div className="k-dress">
    {colors.map((color, i) => (
      <Reveal key={color} variant="zoom" delay={i * 120}>
        <span style={{ background: color }} />
      </Reveal>
    ))}
  </div>
);

/** Four photos in a mosaic. Layout comes from each template's CSS (.k-m1 to .k-m4). */
export const Mosaic = ({ photos }: { photos: PhotoSlot[] }) => (
  <div className="k-mosaic">
    {photos.slice(0, 4).map((photo, i) => (
      <Reveal
        key={photo.key}
        variant={i % 2 ? "right" : "left"}
        delay={i * 140}
        className={`k-m${i + 1}`}
      >
        <img src={photoSrc(photo)} alt={photo.label} />
      </Reveal>
    ))}
  </div>
);

export const VenueActions = ({ data }: { data: WeddingData }) => (
  <div className="k-actions">
    <button
      type="button"
      onClick={() => openLink(buildMapUrl(data.venueQuery))}
    >
      <IconPin /> Chỉ đường
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
);

const Chips = ({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="k-chips">
    {options.map((option) => (
      <button
        key={option}
        type="button"
        className={option === value ? "on" : ""}
        onClick={() => onChange(option)}
      >
        {option}
      </button>
    ))}
  </div>
);

export const RsvpForm = ({
  data,
  title = "Xác nhận tham dự",
  variant = "chips",
}: {
  data: WeddingData;
  title?: ReactNode;
  variant?: "chips" | "select";
}) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attend, setAttend] = useState("Sẽ tham dự");
  const [plus, setPlus] = useState("Đi một mình");
  const [side, setSide] = useState("Khách của chú rể");
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
      <div className="k-form k-thanks">
        <h3>Cảm ơn bạn</h3>
        <p>Chúng mình đã nhận được phản hồi của bạn.</p>
      </div>
    );
  }

  return (
    <form className="k-form" onSubmit={submit} noValidate>
      <h3>{title}</h3>
      <p>
        Vui lòng xác nhận sự tham dự của bạn trước ngày {data.rsvpDeadline} để
        chúng mình chuẩn bị đón tiếp chu đáo nhất. Trân trọng cảm ơn!
      </p>
      <input
        value={name}
        placeholder="Tên của bạn"
        onChange={(event) => {
          setName(event.target.value);
          setError(false);
        }}
      />
      {error && <small>Vui lòng nhập tên của bạn</small>}
      <textarea
        rows={3}
        value={message}
        placeholder="Gửi lời chúc đến cô dâu chú rể"
        onChange={(event) => setMessage(event.target.value)}
      />
      {variant === "select" ? (
        <>
          <select value={attend} onChange={(e) => setAttend(e.target.value)}>
            <option>Sẽ tham dự</option>
            <option>Không thể tham dự</option>
          </select>
          <select value={plus} onChange={(e) => setPlus(e.target.value)}>
            <option>Đi một mình</option>
            <option>Đi cùng người thân</option>
          </select>
          <select value={side} onChange={(e) => setSide(e.target.value)}>
            <option>Khách của chú rể</option>
            <option>Khách của cô dâu</option>
          </select>
        </>
      ) : (
        <>
          <Chips
            options={["Sẽ tham dự", "Không thể tham dự"]}
            value={attend}
            onChange={setAttend}
          />
          <Chips
            options={["Đi một mình", "Đi cùng người thân"]}
            value={plus}
            onChange={setPlus}
          />
          <Chips
            options={["Khách của chú rể", "Khách của cô dâu"]}
            value={side}
            onChange={setSide}
          />
        </>
      )}
      <button type="submit" className="k-submit">
        Xác nhận
      </button>
    </form>
  );
};

export const GiftCard = ({ data }: { data: WeddingData }) => {
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
    <div className="k-gift">
      <Chips
        options={["Chú rể", "Cô dâu"]}
        value={side === "groom" ? "Chú rể" : "Cô dâu"}
        onChange={(v) => setSide(v === "Chú rể" ? "groom" : "bride")}
      />
      <div className="k-gift-card">
        {gift.qr && <img src={gift.qr} alt="QR chuyển khoản" />}
        <span>{gift.bank}</span>
        <b>{gift.account}</b>
        <em>{gift.owner}</em>
        <button type="button" onClick={copy}>
          Sao chép số tài khoản
        </button>
      </div>
    </div>
  );
};

/** "Nhà trai / Nhà gái" columns. Styling comes from the template via `className`. */
export const Families = ({
  data,
  className,
}: {
  data: WeddingData;
  className: string;
}) => (
  <div className={className}>
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
);
