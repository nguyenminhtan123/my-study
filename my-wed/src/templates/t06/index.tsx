import { Page } from "zmp-ui";

import "@/templates/_kit/kit.scss";
import "@/templates/t06/styles.scss";
import { WeddingData } from "@/core/types";
import reliefImg from "@/static/hydrangea-paper.jpg";
import { Drifters, Reveal } from "@/templates/_kit/anim";
import { dateParts } from "@/templates/_kit/date";
import { IconPin } from "@/templates/_kit/icons";
import { GiftCard, RsvpForm, photoSrc } from "@/templates/_kit/sections";
import { openLink } from "@/core/utils/open-link";
import { buildMapUrl } from "@/core/utils/wedding";

/** Fine line-art olive sprig used as a divider: leaves are placed along a cubic curve. */
const Sprig = ({ className = "" }: { className?: string }) => {
  const P = [
    [6, 24],
    [60, 6],
    [130, 40],
    [194, 16],
  ];
  const at = (t: number) => {
    const u = 1 - t;
    const x =
      u ** 3 * P[0][0] +
      3 * u * u * t * P[1][0] +
      3 * u * t * t * P[2][0] +
      t ** 3 * P[3][0];
    const y =
      u ** 3 * P[0][1] +
      3 * u * u * t * P[1][1] +
      3 * u * t * t * P[2][1] +
      t ** 3 * P[3][1];
    return [x, y];
  };
  const leaf = "M0 0 C4 -3 10 -3 14 0 C10 3 4 3 0 0Z";
  return (
    <svg
      className={`t06-sprig ${className}`}
      viewBox="0 0 200 48"
      aria-hidden="true"
    >
      <path
        d="M6 24 C60 6 130 40 194 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      {Array.from({ length: 9 }, (_, i) => {
        const t = 0.1 + i * 0.1;
        const [x, y] = at(t);
        const a = -30 + i * 4;
        return (
          <g key={i}>
            <path
              d={leaf}
              transform={`translate(${x} ${y}) rotate(${a - 55})`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
            />
            <path
              d={leaf}
              transform={`translate(${x} ${y}) rotate(${a + 55})`}
              fill="currentColor"
              opacity="0.18"
              stroke="currentColor"
              strokeWidth="0.6"
            />
          </g>
        );
      })}
    </svg>
  );
};

const Template06 = ({ data }: { data: WeddingData }) => {
  const d = dateParts(data.weddingISO);
  const mono = `${data.groom.charAt(0)}${data.bride.charAt(0)}`;
  const album = [data.album[0], data.album[1], data.album[2], data.album[3]];

  return (
    <Page className="t06-root">
      <Drifters kind="petal" count={7} color="#ffffff" opacity={0.95} />

      {/* cover: white relief, monogram, photo band with diagonal torn edges */}
      <section className="t06-cover">
        <div className="t06-relief">
          <img src={reliefImg} alt="" />
        </div>
        <div className="t06-mono">
          <span>{mono}</span>
          <i />
        </div>
        <div className="t06-torn-wrap">
          <div className="t06-torn">
            <img src={photoSrc(data.photos.cover)} alt="" />
          </div>
        </div>
        <p className="t06-cover-names">
          {data.groom} <em>&amp;</em> {data.bride}
          <span>
            {d.day} . {d.month} . {d.year}
          </span>
        </p>
      </section>

      {/* invitation */}
      <section className="t06-invite">
        <Reveal>
          <p className="t06-eyebrow">
            Thân mời đến dự lễ thành hôn của chúng tôi
          </p>
          <h2>
            {data.groom}
            <em>&amp;</em>
            {data.bride}
          </h2>
          <Sprig />
          <p className="t06-eyebrow">Được tổ chức vào lúc</p>
          <div className="t06-card">
            <b>{d.time}</b>
            <span>{d.weekday}</span>
            <small>
              {d.day} . {d.month} . {d.year}
            </small>
          </div>
          <p className="t06-eyebrow">Địa điểm</p>
          <h3>{data.venueName}</h3>
          <p className="t06-addr">{data.venueAddress}</p>
          <button
            type="button"
            className="t06-direction"
            onClick={() => openLink(buildMapUrl(data.venueQuery))}
          >
            <IconPin /> Chỉ đường
          </button>
        </Reveal>
      </section>

      {/* envelope with polaroids and wax seal */}
      <section className="t06-env">
        <Reveal variant="fade">
          <div className="t06-envelope">
            <div className="t06-back" />
            <div className="t06-flap" />
            <img
              className="t06-pola t06-pola1"
              src={photoSrc(data.photos.couple)}
              alt=""
            />
            <img
              className="t06-pola t06-pola2"
              src={photoSrc(data.album[0])}
              alt=""
            />
            <div className="t06-front" />
            <div className="t06-wax">
              <span>{mono}</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* wide photo */}
      <section className="t06-wide">
        <img src={photoSrc(data.album[1])} alt="" />
        <Reveal>
          <p className="t06-save">
            Save the <em>date</em>
          </p>
        </Reveal>
      </section>

      {/* couple frames */}
      <section className="t06-frames">
        <Reveal variant="left" className="t06-fr t06-fr-groom">
          <img src={photoSrc(data.photos.couple)} alt="" />
          <p>
            <em>Chú rể</em>
            {data.groom}
          </p>
        </Reveal>
        <Reveal variant="right" delay={160} className="t06-fr t06-fr-bride">
          <img src={photoSrc(data.photos.destiny)} alt="" />
          <p>
            <em>Cô dâu</em>
            {data.bride}
          </p>
        </Reveal>
      </section>

      {/* album */}
      <section className="t06-album">
        <Reveal>
          <h2 className="t06-album-title">
            The <em>album</em>
          </h2>
        </Reveal>
        <div className="t06-collage">
          <div className="t06-col">
            {album.map((photo, i) => (
              <Reveal key={photo.key} variant="left" delay={i * 120}>
                <img
                  src={photoSrc(photo)}
                  alt=""
                  className={`t06-ph t06-ph${i + 1}`}
                />
              </Reveal>
            ))}
          </div>
          <Reveal variant="right" className="t06-big">
            <img src={photoSrc(data.photos.cover)} alt="" />
            <p>
              Whispers
              <span>of affection</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="t06-form">
        <Sprig className="t06-sprig-sm" />
        <Reveal>
          <RsvpForm data={data} variant="select" title="Xác nhận tham dự" />
        </Reveal>
      </section>

      <section className="t06-gift">
        <Reveal>
          <GiftCard data={data} />
        </Reveal>
      </section>
      <section className="t06-end">
        <img src={photoSrc(data.album[3])} alt="" />
        <p>Thank you</p>
      </section>
    </Page>
  );
};

export default Template06;
