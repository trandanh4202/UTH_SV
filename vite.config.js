import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), "");

  console.log(env.VITE_API_BASE_URL);

  return {
    plugins: [react()],
    define: {
      "process.env": {
        VITE_API_BASE_URL: JSON.stringify(env.VITE_API_BASE_URL),
      },
    },
    server: {
      proxy: {
        "/foo": "http://localhost:5173/",
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      outDir: "dist",
    },
  };
});
