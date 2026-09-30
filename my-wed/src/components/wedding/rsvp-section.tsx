import { FormEvent, useState } from "react";
import { Box, Button, Input, Radio, Text } from "zmp-ui";

import { weddingConfig } from "@/data/wedding";

// const MIN_GUESTS = 1;
// const MAX_GUESTS = 10;

type Attendance = "yes" | "no";

// const clampGuests = (value: number) =>
//   Math.min(MAX_GUESTS, Math.max(MIN_GUESTS, value));

const RsvpSection = () => {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("yes");
  // const [guests, setGuests] = useState(MIN_GUESTS);
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      setShowError(true);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Box className="wd-card wd-thanks">
        <h3 className="wd-script">Cảm ơn bạn</h3>
        <Text className="wd-muted">
          Đã ghi nhận phản hồi của bạn. Hẹn gặp bạn ngày 30.10.
        </Text>
      </Box>
    );
  }

  return (
    <Box className="wd-card">
      <h2 className="wd-script">Xác nhận tham dự</h2>
      <Text className="wd-muted wd-card-sub">
        Rất mong được đón bạn. Phản hồi giúp gia đình chuẩn bị chu đáo, trước
        ngày {weddingConfig.rsvpDeadline}.
      </Text>
      <form className="wd-form" onSubmit={handleSubmit} noValidate>
        <Input
          label="Tên của bạn"
          placeholder="Nguyễn Văn A"
          value={name}
          status={showError ? "error" : undefined}
          errorText="Nhập tên để gia đình biết bạn là ai."
          onChange={(event) => {
            setName(event.target.value);
            setShowError(false);
          }}
        />
        <Radio.Group
          className="wd-choice"
          name="attend"
          value={attendance}
          onChange={(value) => setAttendance(value as Attendance)}
          options={[
            { value: "yes", label: "Mình đến" },
            { value: "no", label: "Không đến được" },
          ]}
        />
        {/* {attendance === "yes" && (
          <Box>
            <Text size="xSmall" className="wd-muted">
              Số người đi cùng (tính cả bạn)
            </Text>
            <Box className="wd-stepper">
              <Button
                type="neutral"
                variant="tertiary"
                size="small"
                aria-label="Bớt một người"
                onClick={() => setGuests((current) => clampGuests(current - 1))}
              >
                −
              </Button>
              <output>{guests}</output>
              <Button
                type="neutral"
                variant="tertiary"
                size="small"
                aria-label="Thêm một người"
                onClick={() => setGuests((current) => clampGuests(current + 1))}
              >
                +
              </Button>
            </Box>
          </Box>
        )} */}
        <Input.TextArea
          label="Lời chúc"
          placeholder="Gửi đôi lời đến cô dâu chú rể"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <Button htmlType="submit" variant="primary" className="wd-submit">
          Gửi xác nhận
        </Button>
      </form>
    </Box>
  );
};

export default RsvpSection;
