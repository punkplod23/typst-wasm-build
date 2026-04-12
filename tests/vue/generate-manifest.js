import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vendorDir = path.join(__dirname, 'public', 'vendor');
const manifestPath = path.join(__dirname, 'public', 'vendor-manifest.json');

function scanVendorDirectory(dir) {
  const manifest = {};
  
  function walk(currentPath, currentRelative) {
    try {
      const items = fs.readdirSync(currentPath);
      
      items.forEach(item => {
        const fullPath = path.join(currentPath, item);
        const relativePart = currentRelative ? `${currentRelative}/${item}` : item;
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          walk(fullPath, relativePart);
        } else {
          // Include .typ, .toml and other files
          const ext = path.extname(item);
          // Map VFS path (preview/...) to full relative path
          const vfsPath = `preview/${relativePart}`;
          manifest[vfsPath] = {
            filePath: path.join('vendor', relativePart),
            extension: ext,
            size: stat.size
          };
        }
      });
    } catch (err) {
      console.error(`Error scanning ${currentPath}:`, err.message);
    }
  }
  
  if (fs.existsSync(dir)) {
    walk(dir);
  } else {
    console.error(`Vendor directory not found: ${dir}`);
  }
  return manifest;
}

// Scan and generate manifest
console.log('Scanning vendor directory...');
const manifest = scanVendorDirectory(vendorDir);

// Sort by VFS path for consistency
const sortedManifest = {};
Object.keys(manifest).sort().forEach(key => {
  sortedManifest[key] = manifest[key];
});

// Write manifest file
fs.writeFileSync(manifestPath, JSON.stringify(sortedManifest, null, 2));
console.log(`Manifest generated with ${Object.keys(sortedManifest).length} files`);
console.log(`Saved to: ${manifestPath}`);

// Display sample entries
const entries = Object.entries(sortedManifest).slice(0, 5);
console.log('\nSample entries:');
entries.forEach(([vfsPath, data]) => {
  console.log(`  ${vfsPath} -> ${data.filePath}`);
});
