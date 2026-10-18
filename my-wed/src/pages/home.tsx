import { useState } from "react";

import { readParam } from "@/core/params";
import GalleryPage from "@/pages/index";
import InvitationPage from "@/pages/invitation";

/** Link with `?thiep=<code>` opens that couple's invitation; otherwise the template gallery. */
const HomePage = () => {
  const [code] = useState(() => readParam("thiep").toLowerCase());
  return code ? <InvitationPage code={code} /> : <GalleryPage />;
};

export default HomePage;
