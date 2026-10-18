import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // template thumbnails are read from the mini app folder next door
  server: { fs: { allow: [".."] } },
});
