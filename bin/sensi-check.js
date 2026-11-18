#!/usr/bin/env node
'use strict';

/**
 * Sensi Builder Check — a tiny zero-dependency CLI.
 *
 * Usage:
 *   node bin/sensi-check.js            # prints the builder count
 *   node bin/sensi-check.js --help     # should print usage and exit 0
 *   node bin/sensi-check.js -h         # short form of the above
 */

const fs = require('fs');
const path = require('path');

const BUILDERS_DIR = path.join(__dirname, '..', 'builders');

function countBuilders() {
  return fs
    .readdirSync(BUILDERS_DIR)
    .filter((file) => file.endsWith('.json') && !file.startsWith('_'))
    .length;
}

const args = process.argv.slice(2);

// TODO(task-6): Right now ANY argument — including "--help" and "-h" — falls
// through to the "Unknown argument" error below. Handle the help flags
// gracefully: print the usage block and exit with code 0 instead of throwing.
if (args.length > 0) {
  console.error(`Unknown argument: ${args[0]}`);
  process.exit(1);
}

console.log(`Sensi builders: ${countBuilders()}`);
