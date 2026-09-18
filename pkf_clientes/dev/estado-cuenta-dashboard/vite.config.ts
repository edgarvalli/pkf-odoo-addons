import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

const target = "http://localhost:8069";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    modulePreload: false,
    rollupOptions: {
      output: {
        entryFileNames: "estado_cuenta_dashboard_build.js",
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
      "/web/session/get_session_info": {
        changeOrigin: true,
        secure: false,
        target,
      },
    },
  },
});
