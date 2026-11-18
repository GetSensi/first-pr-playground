'use strict';

/**
 * Task #3 — String Slugify Utility
 *
 * slugify("@Official Synor ") should return "official-synor".
 *
 * Curious builders: run this to see the bug for yourself:
 *   node -e "console.log(require('./src/slugify').slugify('@Official Synor '))"
 */
function slugify(input) {
  // TODO(task-3): This helper currently fails when the input has a leading "@"
  // symbol (e.g. "@officialsynor") or surrounding extra whitespace.
  //
  // Fix the regex and trimming logic so that:
  //   slugify("@Official Synor ") === "official-synor"
  //   slugify("  Hello  World  ") === "hello-world"
  //
  // Hint: strip the leading "@", trim the edges, lowercase, then collapse runs
  // of whitespace into a single "-".
  return input
    .toLowerCase()
    .replace(/\s+/g, '-');
}

module.exports = { slugify };
