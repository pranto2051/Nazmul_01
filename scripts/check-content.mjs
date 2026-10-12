/**
 * ═════════════════════════════════════════════════════════════
 * [SCRIPT] check-content.mjs — Academic Content & Integrity Audit
 * ─────────────────────────────────────────────────────────────
 * Purpose: Scans for draft flags, unverified publications, demo images,
 *          empty scholarly links, or malformed DOIs with line-level accuracy.
 * Modes  : Default (warn mode), Strict (--strict flag)
 * Command: npm run check:content or npm run check:content:strict
 * ═════════════════════════════════════════════════════════════
 */

import fs from 'node:fs';
import path from 'node:path';

const isStrict = process.argv.includes('--strict');
const baseDir = path.resolve('src/content');
const imagesFile = path.resolve('src/data/images.ts');

const findings = [];

function checkFileLines(filePath) {
  const relPath = path.relative(process.cwd(), filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // 1. Placeholder tokens
    if (/REPLACE_|TODO|PLACEHOLDER/i.test(line)) {
      findings.push({
        file: relPath,
        line: lineNum,
        type: 'PLACEHOLDER_TOKEN',
        message: `Found unresolved placeholder token: "${line.trim()}"`,
      });
    }

    // 2. Unverified flags
    if (/verified:\s*false/i.test(line)) {
      findings.push({
        file: relPath,
        line: lineNum,
        type: 'UNVERIFIED_DATA',
        message: `Item has verified: false (Verify details before submission)`,
      });
    }

    if (/resultsVerified:\s*false/i.test(line)) {
      findings.push({
        file: relPath,
        line: lineNum,
        type: 'UNVERIFIED_RESULTS',
        message: `Research results marked as resultsVerified: false`,
      });
    }

    // 3. Demo images
    if (/demo:\s*true/i.test(line)) {
      findings.push({
        file: relPath,
        line: lineNum,
        type: 'DEMO_IMAGE',
        message: `Image entry marked as demo: true (Replace with verified real image)`,
      });
    }

    // 4. Empty scholarly profile links
    if (/googleScholar:\s*""|orcid:\s*""|github:\s*""/i.test(line)) {
      findings.push({
        file: relPath,
        line: lineNum,
        type: 'EMPTY_SCHOLARLY_LINK',
        message: `Scholarly profile URL is empty: "${line.trim()}"`,
      });
    }

    // 5. DOI validation (must match 10.xxxx/...)
    const doiMatch = line.match(/doi:\s*["']([^"']+)["']/i);
    if (doiMatch && doiMatch[1].trim()) {
      const doi = doiMatch[1].trim();
      if (!/^10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+$/i.test(doi)) {
        findings.push({
          file: relPath,
          line: lineNum,
          type: 'INVALID_DOI',
          message: `Malformed DOI string: "${doi}"`,
        });
      }
    }
  });
}

function traverseDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      traverseDirectory(fullPath);
    } else if (/\.(yaml|yml|md|ts)$/i.test(entry.name)) {
      checkFileLines(fullPath);
    }
  }
}

// Run checks on src/content and src/data/images.ts
traverseDirectory(baseDir);
if (fs.existsSync(imagesFile)) {
  checkFileLines(imagesFile);
}

// Group findings by file
const grouped = {};
findings.forEach((item) => {
  if (!grouped[item.file]) grouped[item.file] = [];
  grouped[item.file].push(item);
});

console.log('\n=============================================================');
console.log(' 🔍 ACADEMIC CONTENT & INTEGRITY AUDIT REPORT');
console.log('=============================================================\n');

if (findings.length === 0) {
  console.log('✅ ALL ITEMS VERIFIED! Zero placeholders or demo flags found.\n');
  process.exit(0);
}

console.log(`Found ${findings.length} item(s) requiring attention or verification:\n`);

for (const [file, items] of Object.entries(grouped)) {
  console.log(`📁 ${file}`);
  items.forEach((item) => {
    console.log(`   L${item.line} [${item.type}] ${item.message}`);
  });
  console.log('');
}

console.log('─────────────────────────────────────────────────────────────');
console.log(`📋 Summary: ${findings.length} item(s) pending confirmation.`);
console.log('👉 Review content files in "src/content/" for step-by-step resolution.\n');

if (isStrict) {
  console.error('❌ STRICT MODE FAILED: Unverified items exist in content layer.\n');
  process.exit(1);
} else {
  console.log('ℹ️  WARN MODE: Build continuing. Run with --strict before submission.\n');
  process.exit(0);
}
