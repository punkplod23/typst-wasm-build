const fs = require('fs');
const path = require('path');

const vendorDir = path.join(__dirname, 'tests', 'vue', 'public', 'vendor');
const manifestPath = path.join(__dirname, 'tests', 'vue', 'public', 'vendor-manifest.json');

function walkDir(dir, baseVfspath, basePhysicalPath, manifest) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const vfsPath = path.posix.join(baseVfspath, entry.name);
    const physicalPath = path.posix.join(basePhysicalPath, entry.name);
    
    if (entry.isDirectory()) {
      walkDir(fullPath, vfsPath, physicalPath, manifest);
    } else if (entry.isFile()) {
      manifest[vfsPath] = physicalPath;
    }
  }
}

try {
  const manifest = {};
  
  // Walk through each package directory
  const packages = fs.readdirSync(vendorDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
  
  for (const packageName of packages) {
    const packageDir = path.join(vendorDir, packageName);
    const versions = fs.readdirSync(packageDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
    
    for (const version of versions) {
      const versionDir = path.join(packageDir, version);
      const vfsBase = `preview/${packageName}/${version}`;
      const physicalBase = `vendor/${packageName}/${version}`;
      
      walkDir(versionDir, vfsBase, physicalBase, manifest);
    }
  }
  
  // Write manifest with sorted keys for consistency
  const sortedManifest = {};
  Object.keys(manifest).sort().forEach(key => {
    sortedManifest[key] = manifest[key];
  });
  
  fs.writeFileSync(manifestPath, JSON.stringify(sortedManifest, null, 2));
  console.log(`? Regenerated vendor-manifest.json with ${Object.keys(sortedManifest).length} entries`);
  console.log(`? VFS paths format: preview/{package}/{version}/...`);
  console.log(`? Physical paths format: vendor/{package}/{version}/...`);
  
} catch (err) {
  console.error('Error regenerating manifest:', err.message);
  process.exit(1);
}
