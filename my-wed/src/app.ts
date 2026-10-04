import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/vietnamese-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/vietnamese-500.css";
import "@fontsource/cormorant-garamond/latin-600.css";
import "@fontsource/cormorant-garamond/vietnamese-600.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/cormorant-garamond/vietnamese-400-italic.css";
import "@fontsource/great-vibes/latin-400.css";
import "@fontsource/great-vibes/vietnamese-400.css";
import "@fontsource/playfair-display/latin-700.css";
import "@fontsource/playfair-display/vietnamese-700.css";
import "@fontsource/be-vietnam-pro/latin-300.css";
import "@fontsource/be-vietnam-pro/vietnamese-300.css";
import "@fontsource/be-vietnam-pro/latin-400.css";
import "@fontsource/be-vietnam-pro/vietnamese-400.css";
import "@fontsource/be-vietnam-pro/latin-500.css";
import "@fontsource/be-vietnam-pro/vietnamese-500.css";
// ZaUI stylesheet
import "zmp-ui/zaui.css";
// Tailwind stylesheet
import "@/css/tailwind.scss";
// Your stylesheet
import "@/css/app.scss";


// React core
import React from "react";
import { createRoot } from "react-dom/client";

// Mount the app
import Layout from "@/components/layout";

// Expose app configuration
import appConfig from "../app-config.json";

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig as any;
}

const root = createRoot(document.getElementById("app")!);
root.render(React.createElement(Layout));
