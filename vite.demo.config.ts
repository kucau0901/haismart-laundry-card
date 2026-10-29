import { defineConfig } from "vite";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8")) as {
  version: string;
};

// `npm run demo`: serves demo/index.html, which mounts the card in several mocked scenarios.
// Local only; nothing here talks to Home Assistant or any other service.
export default defineConfig({
  root: "demo",
  define: { __CARD_VERSION__: JSON.stringify(pkg.version + "-demo") },
  server: { host: "127.0.0.1", port: 5180, fs: { allow: [".."] } },
  build: { outDir: "../demo-dist", emptyOutDir: true },
});
