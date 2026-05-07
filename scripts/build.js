const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');

// Define mapping of source files to dist files
const filesToCopy = {
  'index.html': 'index.html',
  'numerology-astrology-services.html': 'services.html', // Mapping long name to short
  'spiritual-store.html': 'store.html',                 // Mapping long name to short
  'free-alignment-report.html': 'tools.html',           // Mapping long name to short
  'contact-us.html': 'contact.html',                    // Mapping long name to short
  'about-diipeshh-barara.html': 'about.html',           // Mapping long name to short
  '404.html': '404.html',
  'robots.txt': 'robots.txt',
  'sitemap.xml': 'sitemap.xml',
  'favicon.ico': 'favicon.ico',
  '2-logo-dn.png': '2-logo-dn.png',
  '.htaccess': '.htaccess'
};

const dirsToCopy = [
  'assets',
  'api'
];

async function ensureDirectory(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function copyFile(srcFile, destFile) {
  const src = path.join(root, srcFile);
  const dest = path.join(distDir, destFile);
  await ensureDirectory(path.dirname(dest));
  await fs.promises.copyFile(src, dest);
}

async function copyDirectory(dir) {
  const src = path.join(root, dir);
  const dest = path.join(distDir, dir);
  await fs.promises.cp(src, dest, { recursive: true });
}

async function build() {
  console.log('Starting build process...');

  // 1. Generate product pages first
  console.log('Generating product pages...');
  execSync('node scripts/generate_pages.js', { stdio: 'inherit' });

  // 2. Clear and create dist directory
  await fs.promises.rm(distDir, { recursive: true, force: true });
  await ensureDirectory(distDir);

  // 3. Copy mapped files
  const missing = [];
  for (const [src, dest] of Object.entries(filesToCopy)) {
    const srcPath = path.join(root, src);
    if (!fs.existsSync(srcPath)) {
      missing.push(src);
      continue;
    }
    await copyFile(src, dest);
  }

  // 4. Copy directories
  for (const dir of dirsToCopy) {
    const src = path.join(root, dir);
    if (!fs.existsSync(src)) {
      missing.push(dir);
      continue;
    }
    await copyDirectory(dir);
  }

  // 5. Copy all product HTML files (they don't have mapping, just copy as is)
  const files = fs.readdirSync(root);
  const productFiles = files.filter(f => f.endsWith('.html') && !Object.keys(filesToCopy).includes(f) && f !== 'store.html');
  
  for (const file of productFiles) {
    await copyFile(file, file);
  }

  if (missing.length) {
    console.warn('Some expected paths were missing and skipped:', missing.join(', '));
  }

  console.log('Build complete. Dist folder created at', distDir);
}

build().catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});
