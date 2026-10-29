#!/usr/bin/env node
// Fails when the built card grows past its gzip budget (run after `npm run build`).
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";

const BUDGET_KB = 45;
const file = new URL("../dist/haismart-laundry-card.js", import.meta.url);
const raw = readFileSync(file);
const gz = gzipSync(raw, { level: 9 }).length / 1024;
console.log(`dist/haismart-laundry-card.js: ${(raw.length / 1024).toFixed(1)} kB, ${gz.toFixed(1)} kB gzip (budget ${BUDGET_KB} kB)`);
if (gz > BUDGET_KB) {
  console.error(`::error::bundle is ${gz.toFixed(1)} kB gzip, over the ${BUDGET_KB} kB budget`);
  process.exit(1);
}
