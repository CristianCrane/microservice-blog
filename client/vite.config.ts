import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // https://stackoverflow.com/questions/70012970/running-a-vite-dev-server-inside-a-docker-container
    port: 8080,
  },
});
