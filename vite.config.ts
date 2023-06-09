import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://data.irozhlas.cz/dezinfo-kalkulacka/",
  plugins: [preact()],
});
