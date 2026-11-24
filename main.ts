// u-irvan-motion-seventeen-syllables-of-debugging-d194b605 entry (Node 22, standard library only).
// Writes exactly one haiku about debugging to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt when the variable is unset), creating the
// directory if needed, and prints the same text to stdout.
// No trailing newline in the file: the judge reads exactly the bytes written.
// Gate: the file must be UTF-8, 1-200 characters, not only whitespace,
// and both grader runs must write the same bytes — so the haiku is a
// fixed string, never random, never generated at runtime.
//
// The haiku (strict 5-7-5):
//   "Breakpoint set at dusk"                 — 5 (break-point 2, set 1, at 1, dusk 1)
//   "the log line scrolls past midnight"     — 7 (the 1, log 1, line 1, scrolls 1, past 1, mid-night 2)
//   "it was a typo"                         — 5 (it 1, was 1, a 1, ty-po 2)
// A breakpoint set at dusk, a log line scrolling past midnight, and the
// turn: after a night of hunting, the bug was only ever a typo.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const HAIKU = [
  'Breakpoint set at dusk',
  'the log line scrolls past midnight',
  'it was a typo',
].join('\n');

// Resolve the output directory: $MAKEFUN_OUTPUT_DIR outside the grader,
// /output/entry.txt by default.
function resolveOutputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
}

// Validate the entry against the gate (three lines, 1-200 characters,
// not only whitespace), create the output directory if needed, and write
// the entry file. Returns the path written.
function writeEntry(text: string): string {
  const lines = text.split('\n');
  if (lines.length !== 3 || text.length < 1 || text.length > 200 || text.trim().length === 0) {
    throw new Error('entry must be a three-line haiku of 1-200 characters');
  }
  const dir = resolveOutputDir();
  mkdirSync(dir, { recursive: true });
  const file = join(dir, 'entry.txt');
  writeFileSync(file, text, 'utf8');
  return file;
}

writeEntry(HAIKU);
console.log(HAIKU);
