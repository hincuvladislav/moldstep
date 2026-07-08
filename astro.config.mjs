// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://moldstep.com",
  vite: {
    plugins: [tailwindcss()],
  },
});
