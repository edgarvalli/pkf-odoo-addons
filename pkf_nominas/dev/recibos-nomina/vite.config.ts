import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const target = "http://localhost:8069";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "timesheet_build.js",
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/web": {
        changeOrigin: true,
        secure: false,
        target,
      },
      "/web/dataset/call_kw": {
        changeOrigin: true,
        secure: false,
        target,
      },
    },
  },
});
