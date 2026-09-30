import { useState } from "react";
import { Box, Button, Tabs, Text, useSnackbar } from "zmp-ui";

import { GiftSide, weddingConfig } from "@/data/wedding";
import { copyText } from "@/utils/wedding";

const SIDES: { key: GiftSide; label: string }[] = [
  { key: "groom", label: "Chú rể" },
  { key: "bride", label: "Cô dâu" },
];

const QR_PLACEHOLDER_SIZE = 25;

const buildQrCells = (seed: number) => {
  let state = seed;
  const next = () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
  const cells: { x: number; y: number }[] = [];
  for (let y = 0; y < QR_PLACEHOLDER_SIZE; y += 1) {
    for (let x = 0; x < QR_PLACEHOLDER_SIZE; x += 1) {
      const inFinder =
        (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16);
      if (!inFinder && next() > 0.52) cells.push({ x, y });
    }
  }
  return cells;
};

const FINDER_ORIGINS = [
  [0, 0],
  [18, 0],
  [0, 18],
];

const PlaceholderQr = ({ seed }: { seed: number }) => (
  <svg viewBox="0 0 25 25" shapeRendering="crispEdges" aria-label="Mã QR mẫu">
    {buildQrCells(seed).map(({ x, y }) => (
      <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#4A2A2A" />
    ))}
    {FINDER_ORIGINS.map(([x, y]) => (
      <g key={`${x}-${y}`}>
        <rect x={x} y={y} width="7" height="7" fill="#4A2A2A" />
        <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
        <rect x={x + 2} y={y + 2} width="3" height="3" fill="#4A2A2A" />
      </g>
    ))}
  </svg>
);

const GiftSection = () => {
  const [side, setSide] = useState<GiftSide>("groom");
  const { openSnackbar } = useSnackbar();
  const gift = weddingConfig.gifts[side];

  const handleCopy = async () => {
    const copied = await copyText(gift.account.replace(/\s/g, ""));
    openSnackbar({
      text: copied ? "Đã sao chép số tài khoản" : gift.account,
      type: copied ? "success" : "default",
      duration: 2000,
    });
  };

  return (
    <Box className="wd-card">
      <h2 className="wd-script">Mừng cưới</h2>
      <Text className="wd-muted wd-card-sub">
        Nếu bạn muốn gửi lời chúc từ xa, quét mã bên dưới.
      </Text>
      <Tabs
        activeKey={side}
        onChange={(key) => setSide(key as GiftSide)}
        items={SIDES.map(({ key, label }) => ({
          key,
          label,
          node: <span />,
        }))}
      />
      <Box className="wd-qr">
        {gift.qr ? (
          <img alt="Mã QR chuyển khoản" src={gift.qr} />
        ) : (
          <PlaceholderQr seed={side === "groom" ? 7 : 13} />
        )}
      </Box>
      <Box className="wd-bank">
        <span>{gift.bank}</span>
        <b>{gift.account}</b>
        <span>{gift.owner}</span>
      </Box>
      <Button variant="tertiary" size="small" onClick={handleCopy}>
        Sao chép số tài khoản
      </Button>
    </Box>
  );
};

export default GiftSection;
