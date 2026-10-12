/**
 * ═════════════════════════════════════════════════════════════
 * [SCRIPT] check-images.mjs — Remote Image Connectivity Audit Script
 * ─────────────────────────────────────────────────────────────
 * Purpose: Issues HTTP HEAD requests to remote asset URLs in
 *          src/data/images.ts to verify availability (200 OK).
 * Command: npm run check:images
 * ═════════════════════════════════════════════════════════════
 */

import fs from 'node:fs';
import path from 'node:path';

const imagesFile = path.resolve('src/data/images.ts');
if (!fs.existsSync(imagesFile)) {
  console.error('❌ src/data/images.ts not found.');
  process.exit(1);
}

const content = fs.readFileSync(imagesFile, 'utf-8');
const urlRegex = /src:\s*["'](https?:\/\/[^"']+)["']/g;
const urls = [];
let match;
while ((match = urlRegex.exec(content)) !== null) {
  urls.push(match[1]);
}

console.log('\n=============================================================');
console.log(` 🖼️  IMAGE REGISTRY URL CONNECTIVITY CHECK (${urls.length} remote URLs)`);
console.log('=============================================================\n');

if (urls.length === 0) {
  console.log('ℹ️  No remote URLs found (all local paths).');
  process.exit(0);
}

let hasError = false;

async function checkUrl(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, { method: 'HEAD', signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      console.log(`✅ [${res.status}] ${url}`);
    } else {
      console.warn(`⚠️  [${res.status}] ${url}`);
      hasError = true;
    }
  } catch (err) {
    console.error(`❌ [FAILED] ${url} (${err.message})`);
    hasError = true;
  }
}

async function run() {
  for (const url of urls) {
    await checkUrl(url);
  }
  console.log('\n─────────────────────────────────────────────────────────────');
  if (hasError) {
    console.log('⚠️  One or more image URLs could not be verified. Local fallbacks will activate.');
  } else {
    console.log('✅ All remote images are fully reachable and responding.');
  }
  console.log('');
}

run();
