import { Box, Button, Icon, Text } from "zmp-ui";

import Reveal from "@/templates/t01/components/reveal";
import PhotoFrame from "@/templates/t01/components/photo-frame";
import { useCountdown } from "@/core/hooks/use-countdown";
import { useWeddingData } from "@/core/wedding-context";
import { dateParts, lunarDate } from "@/templates/_kit/date";
import { useGuestName } from "@/templates/_kit/sections";
import { openLink } from "@/core/utils/open-link";
import { buildMapUrl } from "@/core/utils/wedding";

const FamilyColumn = ({
  title,
  parents,
}: {
  title: string;
  parents: string[];
}) => (
  <Box>
    <h3>{title}</h3>
    {parents.map((parent) => (
      <p key={parent}>{parent}</p>
    ))}
  </Box>
);

const InvitationSection = () => {
  const data = useWeddingData();
  const d = dateParts(data.weddingISO);
  const lunar = lunarDate(data.weddingISO);
  const guest = useGuestName();
  const countdown = useCountdown(data.weddingISO);

  return (
    <Box>
      <PhotoFrame photo={data.photos.couple} />
      <Box className="wd-invite">
        <Reveal>
          <Text className="wd-lead">
            Kính mời {guest ? <b className="wd-guest">{guest}</b> : "bạn"} đến
            chung vui
            <br />
            lễ cưới của chúng mình
          </Text>
        </Reveal>
        <Reveal variant="zoom" delay={150}>
          <Box className="wd-big-names">
            <span className="wd-big-name">{data.groom}</span>
            <span className="wd-script wd-big-and">&</span>
            <span className="wd-big-name">{data.bride}</span>
          </Box>
        </Reveal>
        <Reveal delay={250}>
          <Text className="wd-when">
            {d.time}, {d.weekday}
          </Text>
          <Text className="wd-date-line">
            {d.day}
            <span>|</span>
            {d.month}
            <span>|</span>
            {d.year}
          </Text>
          <Text className="wd-lunar">
            (Tức ngày {lunar.day} tháng {lunar.leap ? "nhuận " : ""}
            {lunar.month} năm {lunar.yearName})
          </Text>
        </Reveal>
        <Reveal delay={350}>
          <Box className="wd-countdown" aria-live="polite">
            <Box>
              <b>{countdown.days}</b>
              <small>ngày</small>
            </Box>
            <Box>
              <b>{countdown.hours}</b>
              <small>giờ</small>
            </Box>
            <Box>
              <b>{countdown.minutes}</b>
              <small>phút</small>
            </Box>
          </Box>
        </Reveal>
        <Reveal delay={450}>
          <Box className="wd-venue">
            <small>Địa điểm</small>
            <b>{data.venueName}</b>
            <small>{data.venueAddress}</small>
          </Box>
        </Reveal>
      </Box>
      <Reveal>
        <Box className="wd-families">
          <FamilyColumn title="Nhà trai" parents={data.families.groom} />
          <FamilyColumn title="Nhà gái" parents={data.families.bride} />
        </Box>
      </Reveal>
      <Reveal>
        <Box className="wd-actions">
          <Button
            variant="tertiary"
            size="small"
            prefixIcon={<Icon icon="zi-location" />}
            onClick={() => openLink(buildMapUrl(data.venueQuery))}
          >
            Chỉ đường
          </Button>
        </Box>
      </Reveal>
    </Box>
  );
};

export default InvitationSection;
