// Regenerates src/lib/media-manifest.json: intrinsic dimensions for every
// image/video under public/, so pages can ship width/height (no CLS).
// Run after adding media: node scripts/media-manifest.mjs
import { execFileSync } from 'node:child_process';
import { readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = 'public';
const out = {};

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(jpe?g|png|webp|gif)$/i.test(entry.name)) {
      const o = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', p]).toString();
      out['/' + path.relative(root, p)] = {
        w: +o.match(/pixelWidth: (\d+)/)[1],
        h: +o.match(/pixelHeight: (\d+)/)[1],
      };
    } else if (/\.mp4$/i.test(entry.name)) {
      const o = execFileSync('ffprobe', [
        '-v', 'error', '-select_streams', 'v:0',
        '-show_entries', 'stream=width,height', '-of', 'csv=p=0', p,
      ]).toString().trim();
      const [w, h] = o.split(',').map(Number);
      out['/' + path.relative(root, p)] = { w, h };
    }
  }
}

walk(root);
writeFileSync('src/lib/media-manifest.json', JSON.stringify(out, null, 1));
console.log(`media-manifest.json: ${Object.keys(out).length} entries`);
