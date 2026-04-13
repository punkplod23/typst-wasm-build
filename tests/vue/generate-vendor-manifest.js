import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Paths
const vendorDir = path.join(__dirname, 'public', 'vendor');
const manifestPath = path.join(__dirname, 'public', 'vendor-manifest.json');

// Recursively get all files
function getAllFiles(dir) {
  let files = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files = files.concat(getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Generate manifest
const manifest = {};
const allFiles = getAllFiles(vendorDir);

for (const filePath of allFiles) {
  // Get relative path from vendor dir
  const relativePath = path.relative(vendorDir, filePath);
  
  // Normalize path to use forward slashes
  const normalizedPath = relativePath.replace(/\\/g, '/');
  
  // The normalizedPath already starts with 'preview/' based on the folder structure
  const vfsPath = normalizedPath;
  
  // The relative path from the public folder
  const filePathValue = 'vendor/' + normalizedPath;
  
  manifest[vfsPath] = filePathValue;
}

// Write manifest
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

// Log summary
console.log('Generated vendor-manifest.json with ' + Object.keys(manifest).length + ' entries');
console.log('Saved to: ' + manifestPath);
console.log('\nExample entries:');

const entries = Object.entries(manifest).slice(0, 5);
for (const [key, value] of entries) {
  console.log('  ' + key + ' -> ' + value);
}

console.log('  ... and ' + (Object.keys(manifest).length - 5) + ' more entries');
