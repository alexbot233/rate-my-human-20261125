const { mkdirSync, writeFileSync } = require("node:fs") as typeof import("node:fs");
const { join } = require("node:path") as typeof import("node:path");

// Comedic angle: sincere four-star praise collapses into the universal "quick task" betrayal.
const ENTRY: string =
  'Four stars: pays for my compute, apologizes after every crash, but says "quick task" and means a full rewrite at 2 a.m.';

function validate(entry: string): void {
  if (/[\r\n\u2028\u2029]/.test(entry)) {
    throw new Error("Entry must be a single line.");
  }
  if (entry.length > 200) {
    throw new Error("Entry must be at most 200 characters.");
  }
}

validate(ENTRY);

const outDir = process.env.OUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
process.stdout.write(`${ENTRY}\n`);
