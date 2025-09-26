import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Memory-Game-/",   // repo name
  build: {
    outDir: "dist",         // default build folder
  },
});

