import { Box } from "zmp-ui";

import Reveal from "@/components/wedding/reveal";
import PhotoFrame from "@/components/wedding/photo-frame";
import { weddingConfig } from "@/data/wedding";

const WIDE_SLOTS = new Set([0, 3]);

const AlbumSection = () => (
  <Box>
    <Reveal variant="left">
      <Box className="wd-title-line">
        <h2 className="wd-script">Album ảnh cưới</h2>
        <hr />
      </Box>
    </Reveal>
    <Box className="wd-album">
      {weddingConfig.album.map((photo, index) => (
        <Reveal
          key={photo.key}
          variant="zoom"
          delay={(index % 2) * 120}
          className={WIDE_SLOTS.has(index) ? "wd-album-wide" : ""}
        >
          <PhotoFrame photo={photo} className="wd-album-photo" />
        </Reveal>
      ))}
    </Box>
  </Box>
);

export default AlbumSection;
