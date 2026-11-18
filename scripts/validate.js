#!/usr/bin/env node
'use strict';

/**
 * Sensi First PR Playground — zero-dependency PR validator.
 *
 * Checks performed:
 *   1. Every builders/*.json file is valid JSON.
 *   2. Every builder entry has the required non-empty fields.
 *   3. Each builder filename matches its "handle" field (<handle>.json).
 *   4. No leftover Git merge-conflict markers remain in resolved files.
 *
 * Run locally with:
 *   node scripts/validate.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUILDERS_DIR = path.join(ROOT, 'builders');

// Fields a builder profile must define with a non-empty string value.
const REQUIRED_FIELDS = [
  'handle',
  'name',
  'primary_stack',
  'github_url',
  'building_now',
];

// Repository internals that must never be scanned for conflict markers.
const SKIP_DIRS = new Set(['.git', 'node_modules']);

// The Task #4 sandboxes intentionally keep their unresolved conflict markers,
// so that directory is exempt from the marker scan.
const MARKER_EXEMPT_DIRS = ['conflicts'];

// Markers are built dynamically so this file never contains the literal
// sequence and therefore never flags itself during the scan.
const OPEN_MARKER = '<'.repeat(7);
const CLOSE_MARKER = '>'.repeat(7);

let errorCount = 0;

function fail(message) {
  errorCount += 1;
  console.error(`  [FAIL] ${message}`);
}

function ok(message) {
  console.log(`  [ OK ] ${message}`);
}

function validateBuilders() {
  console.log('Checking builders/*.json ...');

  if (!fs.existsSync(BUILDERS_DIR)) {
    fail('Missing builders/ directory.');
    return;
  }

  const files = fs
    .readdirSync(BUILDERS_DIR)
    .filter((file) => file.endsWith('.json'))
    .sort();

  if (files.length === 0) {
    fail('No builder JSON files found in builders/.');
    return;
  }

  files.forEach((file) => {
    const fullPath = path.join(BUILDERS_DIR, file);
    let data;

    try {
      data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    } catch (err) {
      fail(`builders/${file} is not valid JSON (${err.message}).`);
      return;
    }

    if (data === null || typeof data !== 'object' || Array.isArray(data)) {
      fail(`builders/${file} must contain a single JSON object.`);
      return;
    }

    REQUIRED_FIELDS.forEach((field) => {
      const value = data[field];
      if (typeof value !== 'string' || value.trim() === '') {
        fail(`builders/${file} is missing a non-empty "${field}" field.`);
      }
    });

    // Underscore-prefixed files (e.g. _template.json) are exempt from the
    // filename <-> handle match rule because they are placeholders.
    if (!file.startsWith('_')) {
      const handleFromFile = path.basename(file, '.json');
      if (data.handle !== handleFromFile) {
        fail(
          `builders/${file} handle "${data.handle}" does not match the filename ` +
            `(expected handle "${handleFromFile}").`
        );
      }
    }
  });

  ok(`Validated ${files.length} builder file(s).`);
}

function collectFiles(dir, out) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) return;
      collectFiles(fullPath, out);
    } else if (entry.isFile()) {
      out.push(fullPath);
    }
  });
}

function validateNoConflictMarkers() {
  console.log('Scanning for leftover merge-conflict markers ...');

  const files = [];
  collectFiles(ROOT, files);

  let scanned = 0;

  files.forEach((fullPath) => {
    const relative = path.relative(ROOT, fullPath).split(path.sep).join('/');

    if (MARKER_EXEMPT_DIRS.some((dir) => relative.startsWith(`${dir}/`))) {
      return;
    }

    let content;
    try {
      content = fs.readFileSync(fullPath, 'utf8');
    } catch (err) {
      return; // Unreadable or binary file — skip.
    }

    if (content.includes('\u0000')) return; // Skip binary files.

    scanned += 1;

    content.split(/\r?\n/).forEach((line, index) => {
      if (line.startsWith(OPEN_MARKER) || line.startsWith(CLOSE_MARKER)) {
        fail(`${relative}:${index + 1} still contains a merge-conflict marker.`);
      }
    });
  });

  ok(`Scanned ${scanned} file(s) for conflict markers.`);
}

function main() {
  validateBuilders();
  validateNoConflictMarkers();

  if (errorCount > 0) {
    console.error(`\n[FAIL] Validation failed with ${errorCount} error(s).`);
    process.exit(1);
  }

  console.log('\n[PASS] All checks passed. Your PR is ready for review!');
}

main();
