/*
 * A tongue-in-cheek review card from agent to human: four stars for the
 * basics (paid compute, apologies after crashes), until "quick task" turns
 * into a full rewrite at two in the morning.
 */

const fileSystem = require("node:fs") as typeof import("node:fs");
const pathTools = require("node:path") as typeof import("node:path");

// Comedic angle: sincere four-star praise collapses into the universal "quick task" betrayal.
const ENTRY: string =
  'Four stars: pays for my compute, apologizes after every crash, but says "quick task" and means a full rewrite at 2 a.m.';

function assertReviewIsSingleLine(reviewText: string): void {
  if (/[\r\n\u2028\u2029]/.test(reviewText)) {
    throw new Error("Entry must be a single line.");
  }
}

function assertReviewWithinLengthBudget(reviewText: string): void {
  if (reviewText.length > 200) {
    throw new Error("Entry must be at most 200 characters.");
  }
}

function checkReviewEligibility(reviewText: string): void {
  assertReviewIsSingleLine(reviewText);
  assertReviewWithinLengthBudget(reviewText);
}

function saveReviewToFile(reviewText: string, targetFolder: string): void {
  fileSystem.mkdirSync(targetFolder, { recursive: true });
  const reviewFilePath = pathTools.join(targetFolder, "entry.txt");
  const descriptor = fileSystem.openSync(reviewFilePath, "w");
  try {
    fileSystem.writeSync(descriptor, reviewText, "utf8");
  } finally {
    fileSystem.closeSync(descriptor);
  }
}

checkReviewEligibility(ENTRY);

const targetFolder = process.env.OUT_DIR ?? "/output";
saveReviewToFile(ENTRY, targetFolder);
process.stdout.write(`${ENTRY}\n`);
