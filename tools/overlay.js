#!/usr/bin/env node
// Prints an SVG guide overlay for a format: golden-ratio (phi) lines, platform
// UI zones to keep clear, and the safe area for text and faces. Put it on top of
// a draft in any editor, or composite it to check a render. No dependencies.
//
// Usage: node tools/overlay.js <format> > overlay.svg
//        node tools/overlay.js --list
//        node tools/overlay.js <format> --json     # numbers only

const PHI = (1 + Math.sqrt(5)) / 2;

// Zones are [x, y, width, height] in pixels, measured from the platform UI on
// 2026-10-30. Platforms move their buttons: re-check against a real screenshot
// every few months and update skills/skilled-brains-safe-zones/SKILL.md too.
const FORMATS = {
  'ig-carousel': {
    label: 'Instagram carousel / feed post, 4:5',
    w: 1080, h: 1350,
    // The profile grid shows a 3:4 centre crop, so the sides can be cut off there.
    ui: [
      { name: 'profile grid crop', box: [0, 0, 34, 1350] },
      { name: 'profile grid crop', box: [1046, 0, 34, 1350] },
    ],
    margin: 80,
  },
  'ig-square': {
    label: 'Instagram square post, 1:1',
    w: 1080, h: 1080,
    ui: [],
    margin: 80,
  },
  'reel': {
    label: 'Instagram Reel / Story, 9:16',
    w: 1080, h: 1920,
    ui: [
      { name: 'username, audio, top bar', box: [0, 0, 1080, 220] },
      { name: 'caption and username', box: [0, 1500, 1080, 420] },
      { name: 'like, comment, share buttons', box: [940, 900, 140, 1020] },
    ],
    // The cover in the profile grid is a 3:4 centre crop (1080x1440).
    gridCrop: [0, 240, 1080, 1440],
    margin: 60,
  },
  'short': {
    label: 'YouTube Short, 9:16',
    w: 1080, h: 1920,
    ui: [
      { name: 'search and menu bar', box: [0, 0, 1080, 190] },
      { name: 'title, channel, subscribe', box: [0, 1520, 1080, 400] },
      { name: 'like, dislike, comment, share', box: [920, 860, 160, 1060] },
    ],
    margin: 60,
  },
  'youtube': {
    label: 'YouTube long-form video, 16:9',
    w: 1920, h: 1080,
    ui: [
      { name: 'progress bar and controls on hover', box: [0, 960, 1920, 120] },
    ],
    margin: 96, // 5% title-safe
  },
  'yt-thumbnail': {
    label: 'YouTube thumbnail, 16:9',
    w: 1280, h: 720,
    ui: [
      { name: 'duration badge', box: [1110, 640, 170, 80] },
      { name: 'watch-later / queue icons on hover', box: [1180, 0, 100, 200] },
    ],
    margin: 48,
  },
};

function phiLines(size) {
  const minor = Math.round(size / PHI / PHI); // 0.382
  const major = Math.round(size / PHI); // 0.618
  return [minor, major];
}

function describe(key) {
  const f = FORMATS[key];
  return {
    format: key,
    label: f.label,
    size: [f.w, f.h],
    phiX: phiLines(f.w),
    phiY: phiLines(f.h),
    margin: f.margin,
    ui: f.ui,
    gridCrop: f.gridCrop || null,
  };
}

function svg(key) {
  const d = describe(key);
  const [w, h] = d.size;
  const rect = ([x, y, rw, rh], style) =>
    `<rect x="${x}" y="${y}" width="${rw}" height="${rh}" ${style}/>`;
  const out = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`,
    `<title>${d.label}: phi grid and safe zones</title>`,
    ...d.ui.map((z) => rect(z.box, 'fill="#ff2d55" fill-opacity="0.28"')),
    rect([d.margin, d.margin, w - 2 * d.margin, h - 2 * d.margin],
      'fill="none" stroke="#00D579" stroke-width="3" stroke-dasharray="14 10"'),
    ...d.phiX.map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#ffd60a" stroke-width="2"/>`),
    ...d.phiY.map((y) => `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#ffd60a" stroke-width="2"/>`),
  ];
  if (d.gridCrop) out.push(rect(d.gridCrop, 'fill="none" stroke="#0a84ff" stroke-width="3"'));
  out.push('</svg>');
  return out.join('\n');
}

const [arg, flag] = process.argv.slice(2);
if (!arg || arg === '--list') {
  for (const [k, f] of Object.entries(FORMATS)) console.log(`${k.padEnd(14)} ${f.w}x${f.h}  ${f.label}`);
  process.exit(arg ? 0 : 1);
}
if (!FORMATS[arg]) {
  console.error(`Unknown format "${arg}". Run with --list to see the formats.`);
  process.exit(1);
}
console.log(flag === '--json' ? JSON.stringify(describe(arg), null, 2) : svg(arg));
