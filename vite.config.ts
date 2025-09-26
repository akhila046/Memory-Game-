import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Memory-Game-/",   // 👈 use your exact repo name (case-sensitive!)
  build: {
    outDir: "docs",         // 👈 build into docs folder
  },
});
