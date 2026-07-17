import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/radeef/",
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  preview: {
    allowedHosts: ["terminal.local", "app.jawadk.me"],
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
