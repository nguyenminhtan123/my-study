import { Box, Text } from "zmp-ui";

import Reveal from "@/templates/t01/components/reveal";
import PhotoFrame from "@/templates/t01/components/photo-frame";
import { useWeddingData } from "@/core/wedding-context";

const HeroSection = () => {
  const data = useWeddingData();

  return (
    <Box className="wd-hero">
      <PhotoFrame photo={data.photos.cover} className="wd-hero-photo">
        <Box className="wd-hero-names">
          <span className="wd-hero-name">{data.groom}</span>
          <span className="wd-script wd-hero-and">&</span>
          <span className="wd-hero-name">{data.bride}</span>
        </Box>
      </PhotoFrame>
      <Reveal immediate delay={1500} className="wd-story">
        <Box>
          <Text.Title className="wd-script wd-story-title">
            Chuyện tình
          </Text.Title>
          <Text className="wd-muted wd-story-text">
            Từ một lần gặp tình cờ đến lời hẹn cả đời, câu chuyện của chúng mình
            được viết bằng tin yêu, kiên nhẫn và niềm vui khi tìm thấy nhau.
          </Text>
        </Box>
        <Box className="wd-date-stack" aria-label="Ngày 30 tháng 10 năm 2026">
          <b>30</b>
          <i />
          <b>10</b>
          <i />
          <b>26</b>
        </Box>
      </Reveal>
    </Box>
  );
};

export default HeroSection;
