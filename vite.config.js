import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  // Tomar repo-r nam 'ben-ten-static' tai ekhane sheta add kora holo
  base: "/ben-ten-static/",
  plugins: [react(), tailwindcss()],
});
