import { Box, Text } from "zmp-ui";

import FallingHearts from "@/templates/t01/components/falling-hearts";
import { useWeddingData } from "@/core/wedding-context";
import { dateParts } from "@/templates/_kit/date";

// "Minh Khôi" -> "K": the given name's first letter, for the wax seal
const initial = (name: string) =>
  (name.trim().split(/\s+/).pop() ?? "").charAt(0).toUpperCase();

interface EnvelopeIntroProps {
  opened: boolean;
  onOpen: () => void;
}

const EnvelopeIntro = ({ opened, onOpen }: EnvelopeIntroProps) => {
  const data = useWeddingData();
  const d = dateParts(data.weddingISO);

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
          <b>
            {data.groom} &amp; {data.bride}
          </b>
          <small>
            {d.day} . {d.month} . {d.year}
          </small>
        </Box>
        <Box className="wd-env-front" />
        <Box className="wd-flap" />
        <button
          type="button"
          className="wd-seal"
          aria-label="Mở thiệp"
          onClick={() => onOpen()}
        >
          {initial(data.groom)}&amp;{initial(data.bride)}
        </button>
      </Box>
      <Text className="wd-intro-hint">Chạm vào dấu sáp để mở thiệp</Text>
    </Box>
  );
};

export default EnvelopeIntro;
