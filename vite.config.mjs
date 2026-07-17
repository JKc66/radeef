import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  preview: {
    allowedHosts: ["terminal.local", "radeef.lat", "www.radeef.lat"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
