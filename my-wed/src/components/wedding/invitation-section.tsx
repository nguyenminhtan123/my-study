import { openOutApp } from "zmp-sdk";
import { Box, Button, Icon, Text } from "zmp-ui";

import Reveal from "@/components/wedding/reveal";
import PhotoFrame from "@/components/wedding/photo-frame";
import { useCountdown } from "@/hooks/use-countdown";
import { weddingConfig } from "@/data/wedding";
import { buildCalendarUrl, buildMapUrl } from "@/utils/wedding";

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
  const countdown = useCountdown(weddingConfig.weddingISO);

  const openLink = (url: string) => openOutApp({ url });

  return (
    <Box>
      <PhotoFrame photo={weddingConfig.photos.couple} />
      <Box className="wd-invite">
        <Reveal>
          <Text className="wd-lead">
            Kính mời bạn đến chung vui
            <br />
            lễ cưới của chúng mình
          </Text>
        </Reveal>
        <Reveal variant="zoom" delay={150}>
          <Box className="wd-big-names">
            <span className="wd-big-name">{weddingConfig.groom}</span>
            <span className="wd-script wd-big-and">&</span>
            <span className="wd-big-name">{weddingConfig.bride}</span>
          </Box>
        </Reveal>
        <Reveal delay={250}>
          <Text className="wd-when">17:00, THỨ SÁU</Text>
          <Text className="wd-date-line">
            30<span>|</span>10<span>|</span>2026
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
            <b>{weddingConfig.venueName}</b>
            <small>{weddingConfig.venueAddress}</small>
          </Box>
        </Reveal>
      </Box>
      <Reveal>
        <Box className="wd-families">
          <FamilyColumn
            title="Nhà trai"
            parents={weddingConfig.families.groom}
          />
          <FamilyColumn
            title="Nhà gái"
            parents={weddingConfig.families.bride}
          />
        </Box>
      </Reveal>
      <Reveal>
        <Box className="wd-actions">
          <Button
            variant="tertiary"
            size="small"
            prefixIcon={<Icon icon="zi-location" />}
            onClick={() => openLink(buildMapUrl(weddingConfig.venueQuery))}
          >
            Chỉ đường
          </Button>
          <Button
            variant="tertiary"
            size="small"
            prefixIcon={<Icon icon="zi-calendar" />}
            onClick={() =>
              openLink(
                buildCalendarUrl(
                  weddingConfig.eventTitle,
                  weddingConfig.calendarDates,
                  weddingConfig.venueQuery,
                ),
              )
            }
          >
            Lưu vào lịch
          </Button>
        </Box>
      </Reveal>
    </Box>
  );
};

export default InvitationSection;
