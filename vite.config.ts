/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8")) as {
  name: string;
  version: string;
};

const banner = `/*! ${pkg.name} v${pkg.version} | MIT | https://github.com/kucau0901/haismart-laundry-card */`;

export default defineConfig({
  plugins: [
    {
      name: "banner",
      apply: "build",
      enforce: "post",
      generateBundle(_options, bundle) {
        for (const chunk of Object.values(bundle))
          if (chunk.type === "chunk" && chunk.isEntry) chunk.code = `${banner}\n${chunk.code}`;
      },
    },
  ],
  define: {
    __CARD_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2021",
    minify: "esbuild",
    sourcemap: false,
    // Single self-contained ES module (lit bundled in). Built in app mode rather than library
    // mode so the output is fully minified.
    modulePreload: false,
    copyPublicDir: false,
    rollupOptions: {
      input: "src/haismart-laundry-card.ts",
      preserveEntrySignatures: "strict",
      output: {
        format: "es",
        entryFileNames: "haismart-laundry-card.js",
        inlineDynamicImports: true,
      },
    },
  },
  test: {
    environment: "node",
    include: ["test/**/*.test.ts"],
  },
});
