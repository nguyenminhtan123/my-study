import { openOutApp, openWebview } from "zmp-sdk";
import { Box, Button, Icon, Text } from "zmp-ui";

import Reveal from "@/templates/t01/components/reveal";
import PhotoFrame from "@/templates/t01/components/photo-frame";
import { useCountdown } from "@/core/hooks/use-countdown";
import { useWeddingData } from "@/core/wedding-context";
import { buildCalendarUrl, buildMapUrl } from "@/core/utils/wedding";

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
  const countdown = useCountdown(data.weddingISO);

  const openLink = async (url: string) => {
    try {
      await openOutApp({ url });
    } catch {
      try {
        await openWebview({ url });
      } catch {
        window.open(url, "_blank");
      }
    }
  };

  return (
    <Box>
      <PhotoFrame photo={data.photos.couple} />
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
            <span className="wd-big-name">{data.groom}</span>
            <span className="wd-script wd-big-and">&</span>
            <span className="wd-big-name">{data.bride}</span>
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
          <Button
            variant="tertiary"
            size="small"
            prefixIcon={<Icon icon="zi-calendar" />}
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
          </Button>
        </Box>
      </Reveal>
    </Box>
  );
};

export default InvitationSection;
