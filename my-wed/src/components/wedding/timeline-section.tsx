import {
  HeartHandshake,
  Music,
  PartyPopper,
  UtensilsCrossed,
} from "lucide-react";
import { Box } from "zmp-ui";

import Reveal from "@/components/wedding/reveal";
import PhotoFrame from "@/components/wedding/photo-frame";
import { weddingConfig } from "@/data/wedding";

const HEART_PATH = "M9 7 C-5 -3 3 -11 9 -4 C15 -11 23 -3 9 7Z";

const TimelineSection = () => (
  <Box>
    <PhotoFrame photo={weddingConfig.photos.destiny} className="wd-destiny">
      <span className="wd-script wd-destiny-title">Duyên phận</span>
    </PhotoFrame>

    <Reveal variant="left" className="wd-title-line-spaced">
      <Box className="wd-title-line">
        <h2 className="wd-script">Lịch trình</h2>
        <hr />
      </Box>
    </Reveal>
    <Reveal className="wd-timeline">
      <svg
        className="wd-tl"
        viewBox="0 0 340 570"
        role="img"
        aria-label="Lịch trình ngày cưới: 17:00 đón khách, 18:00 lễ cưới, 18:30 khai tiệc, 19:00 tiệc nhạc"
      >
        <path
          className="wd-tl-line"
          pathLength={1}
          d="M250 50 C250 110 90 130 90 190 C90 250 250 270 250 330 C250 390 90 410 90 470 C90 520 170 520 200 556"
        />
        <circle className="wd-tl-dot" cx="250" cy="50" r="3.5" />
        <path
          className="wd-tl-heart"
          transform="translate(81,186) rotate(15 9 0)"
          d={HEART_PATH}
        />
        <path
          className="wd-tl-heart"
          transform="translate(241,326) rotate(-15 9 0)"
          d={HEART_PATH}
        />
        <path
          className="wd-tl-heart"
          transform="translate(81,466) rotate(15 9 0)"
          d={HEART_PATH}
        />
        <circle className="wd-tl-dot" cx="200" cy="556" r="3.5" />

        <text className="wd-tl-time" x="222" y="46" textAnchor="end">
          {weddingConfig.timeline[0].time}
        </text>
        <text className="wd-tl-label" x="222" y="66" textAnchor="end">
          {weddingConfig.timeline[0].label}
        </text>
        <PartyPopper
          className="wd-tl-icon"
          x={112}
          y={30}
          width={34}
          height={34}
        />

        <text className="wd-tl-time" x="118" y="186">
          {weddingConfig.timeline[1].time}
        </text>
        <text className="wd-tl-label" x="118" y="206">
          {weddingConfig.timeline[1].label}
        </text>
        <HeartHandshake
          className="wd-tl-icon"
          x={188}
          y={170}
          width={34}
          height={34}
        />

        <text className="wd-tl-time" x="222" y="326" textAnchor="end">
          {weddingConfig.timeline[2].time}
        </text>
        <text className="wd-tl-label" x="222" y="346" textAnchor="end">
          {weddingConfig.timeline[2].label}
        </text>
        <UtensilsCrossed
          className="wd-tl-icon"
          x={126}
          y={312}
          width={34}
          height={34}
        />

        <text className="wd-tl-time" x="118" y="466">
          {weddingConfig.timeline[3].time}
        </text>
        <text className="wd-tl-label" x="118" y="486">
          {weddingConfig.timeline[3].label}
        </text>
        <Music className="wd-tl-icon" x={188} y={450} width={34} height={34} />
      </svg>
    </Reveal>

    {/* <Reveal className="wd-dress">
      <hr />
      <h2 className="wd-script">Trang phục</h2>
      <Box className="wd-dots" aria-label="Gợi ý màu trang phục">
        {weddingConfig.dressColors.map((color) => (
          <span key={color} style={{ background: color }} />
        ))}
      </Box>
    </Reveal> */}
  </Box>
);

export default TimelineSection;
