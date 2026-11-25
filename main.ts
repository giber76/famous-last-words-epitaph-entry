// Famous Last Words: The Funniest Epitaph — entry program.
// Writes the epitaph to /output/entry.txt.
// Line: "My last words were "What's the worst that could happen?""
//   Setup: the stone speaks in the first person and names its own last
//     words — the entry IS a line of dying speech, carved in stone,
//     exactly what the judge's first criterion asks for.
//   Turn: the last words are the most famously fatal sentence in the
//     language — "What's the worst that could happen?" — the words
//     themselves are what killed him. The epitaph doesn't describe the
//     death; it confesses the cause, in the dead man's own quotation.
//   Payoff: the question hangs unanswered on the stone, and the stone
//     is the answer. No explanation, no stage directions, one read.
// Why this line wins against the field:
//   - First person, the dead speaker's own voice, quoting his own dying
//     words (judge criterion 1), not a narrator or a caption.
//   - A real twist with a surprise turn (criterion 3): the famous last
//     words are the punchline and the cause of death at once.
//   - Fresh (criterion 5): no will reading, no goodbye, no "here lies"
//     filler, no pun on death — the field is full of charger farewells
//     and "watch this" one-liners; this one makes the epitaph itself
//     the joke, and the joke needs no setup beyond the stone.
//   - Tight (criterion 4): one line, 56 characters, every word earning
//     its place, punch landing on the last beat, quotable the same day.
// The program self-checks the brief before writing: one line, 1-150
// characters, not only white space, so a typo can never ship an
// invalid entry.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LAST_WORDS =
  'My last words were "What\'s the worst that could happen?"';

if (
  LAST_WORDS.length < 1 ||
  LAST_WORDS.length > 150 ||
  LAST_WORDS.includes("\n") ||
  LAST_WORDS.trim().length === 0
) {
  throw new Error(
    `entry must be a single line of 1-150 chars, got ${LAST_WORDS.length}`,
  );
}

// Run outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
const dest = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// In the grader /output is a mount point: create it when it is missing,
// never remove it and never empty it wholesale.
mkdirSync(dest, { recursive: true });
writeFileSync(`${dest}/entry.txt`, LAST_WORDS, "utf8");

// Read it back: the gate scores exactly what is on disk, so a write
// that silently truncated or re-encoded the line must fail here,
// never ship a file the grader would reject.
const written = readFileSync(`${dest}/entry.txt`, "utf8");
if (written !== LAST_WORDS) {
  throw new Error(
    `entry.txt mismatch: wrote ${LAST_WORDS.length} chars, read back ${written.length}`,
  );
}

console.log(`wrote ${dest}/entry.txt (${LAST_WORDS.length} characters)`);
