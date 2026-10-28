import { defineConfig } from "vite";
import zaloMiniApp from "zmp-vite-plugin";
import react from "@vitejs/plugin-react";

import { remoteMedia } from "./scripts/remote-media.mjs";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    root: "./src",
    // env files live next to package.json (my-wed/.env, my-wed/.env.local); only VITE_* reach the app
    envDir: process.cwd(),
    base: "",
    // images and videos are served from the media site in a build, see scripts/remote-media.mjs
    plugins: [zaloMiniApp(), react(), remoteMedia()],
    build: {
      assetsInlineLimit: 0,
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  });
};
