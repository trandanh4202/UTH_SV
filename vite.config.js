import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/foo": "http://localhost:5173/",
      "/api": {
        target: "https://uth-api-boot.ut.edu.vn/api/v1",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/viettelapi": {
        target: "https://partner.viettelpost.vn/v2/categories",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/viettelapi/, ""),
      },
      "/ts24": {
        target: "https://ts24.ut.edu.vn/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/ts24/, ""),
      },
    },
    host: "0.0.0.0", // Cho phép truy cập từ tất cả các địa chỉ IP
    port: 5173, // Đảm bảo cổng này là cổng bạn đang sử dụng
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
});
