import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/foo": "http://localhost:5173/",
      "/api": {
        target: "https://uth-api-boot.ut.edu.vn",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
