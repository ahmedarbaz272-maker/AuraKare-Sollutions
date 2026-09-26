const fs = require('node:fs');
const path = require('node:path');

const outputDirectory = path.resolve(process.argv[2] || 'dist');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Set SUPABASE_URL and SUPABASE_ANON_KEY in the Vercel project environment.');
}

const publicFiles = [
  'about-AuraKare_Sollutions.html',
  'ai-ready-processing.html',
  'bpo-workflows.html',
  'data-security.html',
  'document-scanning.html',
  'get-in-touch.html',
  'index.html',
  'legacy-data-transformation.html',
  'privacy-policy.html',
  'sectors.html',
  'style.css',
  'script.js',
  'sitemap.xml',
  'robots.txt',
  'GoogleBrand.png',
  'ak-favicon.png',
  'ak-favicon.ico',
  'apple-touch-icon.png',
  'cta-banner.svg'
];

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });

for (const file of publicFiles) {
  fs.copyFileSync(file, path.join(outputDirectory, file));
}

fs.cpSync('Assets', path.join(outputDirectory, 'Assets'), { recursive: true });

const config = { url: supabaseUrl, anonKey: supabaseAnonKey };
fs.writeFileSync(
  path.join(outputDirectory, 'supabase-config.js'),
  `window.supabaseConfig = ${JSON.stringify(config)};\n`
);
