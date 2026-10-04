import { openOutApp, openWebview } from "zmp-sdk";

// Open an external link: Zalo's browser first, then the in-app webview,
// then a plain browser tab.
export const openLink = async (url: string) => {
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
