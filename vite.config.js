import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
console.log(process.env.VITE_API_BASE_URL);
console.log(process.env);
console.log(import.meta.env);
export default defineConfig({
  plugins: [react(), envCompatible()],
  define: {
    "process.env": process.env, // Add this line to define environment variables
  },
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
