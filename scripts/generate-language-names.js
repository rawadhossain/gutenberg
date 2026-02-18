#!/usr/bin/env node
/**
 * Generates ui/src/data/languageNames.ts from locales/*.json.
 * Extracts autonyms (native language names) from each locale file.
 *
 * Run from repo root: node scripts/generate-language-names.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '..', 'locales');
const OUTPUT_FILE = path.join(__dirname, '..', 'ui', 'src', 'data', 'languageNames.ts');

const EXCLUDE = new Set(['qqq', 'mul']);

function generateLanguageNames() {
  const mappings = [];
  const files = fs.readdirSync(LOCALES_DIR).filter((f) => f.endsWith('.json'));

  for (const file of files) {
    const code = file.replace(/\.json$/, '');
    if (EXCLUDE.has(code)) continue;

    const filePath = path.join(LOCALES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    let data;
    try {
      data = JSON.parse(content);
    } catch (err) {
      console.warn(`Skipping ${file}: invalid JSON`);
      continue;
    }

    const autonym = data?.ui_strings?.autonym?.textContent;
    if (!autonym || typeof autonym !== 'string') {
      console.warn(`Skipping ${file}: no valid autonym`);
      continue;
    }

    mappings.push({ code, autonym });
  }

  mappings.sort((a, b) => a.code.localeCompare(b.code));

  const lines = mappings.map(
    ({ code, autonym }) => `  ${JSON.stringify(code)}: ${JSON.stringify(autonym)}`
  );

  const output = `/**
 * Language code to autonym (native name) mapping.
 * Generated from locales/*.json by scripts/generate-language-names.js
 * Do not edit manually. Re-run the script when locales change.
 */

export const LANGUAGE_NAMES: Record<string, string> = {
${lines.join(',\n')}
}
`;


  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, output + '\n', 'utf-8');
  console.log(`Wrote ${OUTPUT_FILE} (${mappings.length} languages)`);
}

generateLanguageNames();
