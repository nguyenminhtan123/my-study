import { Box, Text } from "zmp-ui";

import { useWeddingData } from "@/core/wedding-context";

const FooterSection = () => {
  const data = useWeddingData();
  return (
    <Box className="wd-footer">
      <div className="wd-script">
        {data.groom} &amp; {data.bride}
      </div>
      <Text className="wd-muted">
        Cảm ơn bạn đã là một phần trong ngày đặc biệt của chúng mình.
      </Text>
    </Box>
  );
};

export default FooterSection;
