import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  // define: {
  //   "process.env.VITE_API_BASE_URL": JSON.stringify(
  //     process.env.VITE_API_BASE_URL
  //   ),
  // },
  server: {
    proxy: {
      "/foo": "http://localhost:5173/",
      "/api": {
        target: process.env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
