import { Box, Text } from "zmp-ui";

import FallingHearts from "@/templates/t01/components/falling-hearts";
import { useWeddingData } from "@/core/wedding-context";

interface EnvelopeIntroProps {
  opened: boolean;
  onOpen: () => void;
}

const EnvelopeIntro = ({ opened, onOpen }: EnvelopeIntroProps) => {
  const data = useWeddingData();

  return (
    <Box
      className={`wd-intro ${opened ? "wd-intro-open" : ""}`}
      style={
        data.introImage
          ? { backgroundImage: `url(${data.introImage})` }
          : undefined
      }
    >
      <FallingHearts />
      <Box textAlign="center" className="wd-intro-head">
        <Text className="wd-intro-pre">TRÂN TRỌNG KÍNH MỜI</Text>
        <h1 className="wd-intro-title">Lễ thành hôn</h1>
      </Box>
      <Box className="wd-env" onClick={() => onOpen()}>
        <Box className="wd-env-back" />
        <Box className="wd-letter">
          <b>Tân &amp; Trang</b>
          <small>30 . 10 . 2026</small>
        </Box>
        <Box className="wd-env-front" />
        <Box className="wd-flap" />
        <button
          type="button"
          className="wd-seal"
          aria-label="Mở thiệp"
          onClick={() => onOpen()}
        >
          T&amp;T
        </button>
      </Box>
      <Text className="wd-intro-hint">Chạm vào dấu sáp để mở thiệp</Text>
    </Box>
  );
};

export default EnvelopeIntro;
