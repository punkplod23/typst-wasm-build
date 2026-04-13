<template>
  <div class="chart-test-container">
    <h1>Typst WASM Vue Chart Test</h1>
    
    <div class="controls">
      <button @click="initializeWasm" :disabled="wasmLoaded">
        {{ wasmLoaded ? '✅ WASM Loaded' : 'Load WASM' }}
      </button>
      <button @click="compileCharts" :disabled="!wasmLoaded">
        Compile Charts
      </button>
    </div>

    <div v-if="status" :class="['status', statusClass]">
      {{ status }}
    </div>

    <div v-if="pdfUrl" class="result">
      <a :href="pdfUrl" download="gallery.pdf">
        📥 Download Chart Gallery PDF
      </a>
    </div>

    <div v-if="wasmLoaded" class="info">
      <h3>Chart Gallery Includes:</h3>
      <ul>
        <li>📊 Bar Chart - Revenue Distribution by Department</li>
        <li>🥧 Pie Chart - Market Share Distribution</li>
        <li>📄 Professional Report Template</li>
      </ul>
    </div>
  </div>
</template>

<script>
import init, { add_font, add_file, add_package_file, compile_to_pdf } from '../../pkg/my_typst_wasm.js';

export default {
  name: 'TypstChartTest',
  data() {
    return {
      wasmLoaded: false,
      status: '',
      statusClass: '',
      pdfUrl: null
    };
  },
  methods: {
    async initializeWasm() {
      this.status = '🚀 Loading WASM for charts...';
      this.statusClass = 'loading';

      try {
        // Fetch the WASM binary
        const baseUrl = import.meta.env.BASE_URL || './';
        const response = await fetch(`${baseUrl}my_typst_wasm_bg.wasm`);
        const wasmBuffer = await response.arrayBuffer();

        // Initialize WASM
        await init(wasmBuffer);
        this.status = '✅ WASM Initialized';
        this.statusClass = 'success';
        this.wasmLoaded = true;

        // Load fonts
        await this.loadFonts();
        
        // Load chart packages
        await this.loadChartPackages();
      } catch (error) {
        this.status = `❌ Error: ${error.message}`;
        this.statusClass = 'error';
        console.error(error);
      }
    },

    async loadFonts() {
      const baseUrl = import.meta.env.BASE_URL || './';
      try {
        const fonts = ['Roboto-Regular.ttf', 'NewCMMath-Regular.otf'];
        
        for (const fontFile of fonts) {
          try {
            const fontResponse = await fetch(`${baseUrl}fonts/${fontFile}`);
            if (fontResponse.ok) {
              const fontBuffer = await fontResponse.arrayBuffer();
              add_font(new Uint8Array(fontBuffer));
              console.log(`🔡 Loaded ${fontFile}`);
            }
          } catch (e) {
            console.warn(`Font ${fontFile} not available:`, e.message);
          }
        }
        this.status = '🔡 Fonts loaded';
      } catch (error) {
        console.warn('Font loading warning:', error.message);
      }
    },

    async loadChartPackages() {
      const baseUrl = import.meta.env.BASE_URL || './';
      try {
        const vendorResponse = await fetch(`${baseUrl}vendor-manifest.json`);
        if (!vendorResponse.ok) return;
        
        const manifest = await vendorResponse.json();

        // Group files by package (namespace/name/version)
        const packageGroups = new Map();
        for (const [vfsPath, filePath] of Object.entries(manifest)) {
          // Matches namespace/name/version/path
          const match = vfsPath.match(/^([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/);
          if (match) {
            const [, ns, name, ver, rel] = match;
            const key = `${ns}/${name}/${ver}`;
            if (!packageGroups.has(key)) packageGroups.set(key, []);
            packageGroups.get(key).push({ ns, name, ver, rel, filePath });
          }
        }

        // Process packages and discovery root prefix
        for (const [pkgKey, files] of packageGroups.entries()) {
          const [ns, name, ver] = pkgKey.split('/');
          
          let rootPrefix = "";
          if (!files.some(f => f.rel === 'typst.toml')) {
            const tomlFile = files.find(f => f.rel.endsWith('/typst.toml'));
            if (tomlFile) rootPrefix = tomlFile.rel.replace('typst.toml', '');
          }

          const results = await Promise.allSettled(
            files.filter(f => f.rel.startsWith(rootPrefix)).map(async (file) => {
              const fetchPath = file.filePath.startsWith('vendor/') ? file.filePath : `vendor/${file.filePath}`;
              const res = await fetch(`${baseUrl}${fetchPath}`);
              if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

              const buffer = await res.arrayBuffer();
              const finalRelPath = file.rel.slice(rootPrefix.length);
              
              const isText = finalRelPath.endsWith('.typ') || finalRelPath.endsWith('.toml');
              const data = isText 
                ? new TextEncoder().encode(new TextDecoder().decode(buffer))
                : new Uint8Array(buffer);

              add_package_file(ns, name, ver, finalRelPath, data);
              return { path: finalRelPath, data };
            })
          );

          const contentMap = new Map();
          results.forEach(result => {
            if (result.status === 'fulfilled' && result.value) {
              contentMap.set(result.value.path, result.value.data);
            }
          });

          const wasmPlugin = contentMap.get('cetz_core.wasm') || contentMap.get('src/cetz_core.wasm');
          if (name === 'cetz' && wasmPlugin) {
            add_package_file(ns, name, ver, "cetz-core/cetz_core.wasm", wasmPlugin);
          }
        }

        this.status = '📦 Chart packages loaded';
      } catch (e) {
        console.warn('Chart package loading failed:', e);
      }
    },

    compileCharts() {
      try {
        this.status = '🎨 Compiling Chart Gallery...';
        this.statusClass = 'loading';

        const source = `
#import "@preview/cetz:0.4.2"
#import "@preview/cetz-plot:0.1.3": chart

// 1. Establish the font stack globally so 'measure' always has access to Math tables
#set text(font: ("Roboto", "New Computer Modern Math"), size: 10pt)

// 2. Force all math environments to use the specific math font
#show math.equation: set text(font: "New Computer Modern Math")

#let project(title: "", authors: (), body) = {
  set document(author: authors, title: title)
  set page(paper: "us-letter", margin: 2cm)
  set text(font: ("Roboto", "New Computer Modern Math"), size: 11pt)
  
  align(center)[
    #block(text(weight: 700, 1.75em, title))
    #v(1em)
    #grid(
      columns: (1fr,) * calc.min(3, authors.len()),
      column-gutter: 1em,
      ..authors.map(author => align(center, strong(author)))
    )
  ]
  v(2em)
  body
}

#show: project.with(
  title: "Performance Report",
  authors: ("Vue.js Test",),
)

== Overview

This is a full chart demo compiled in the browser using the new world-class loader.

#align(center)[
  #cetz.canvas({
    let data = (("A", 10), ("B", 20), ("C", 15))
    chart.barchart(
      size: (10, 5),
      data,
      bar-width: 0.8,
      fill: true,
    )
  })
]

=== Benefits of Charts

Charts effectively communicate complex data:
- Make data patterns visible at a glance
- Enable audience engagement
- Support data-driven decision making
- Enhance professional presentations
`;

        const pdfBytes = compile_to_pdf(source);

        // Create blob and download URL
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        this.pdfUrl = URL.createObjectURL(blob);

        this.status = '🎉 Chart gallery compiled successfully!';
        this.statusClass = 'success';
      } catch (error) {
        this.status = `❌ Compilation error: ${error.message}`;
        this.statusClass = 'error';
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.chart-test-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-top: 0;
  color: #333;
}

h3 {
  color: #555;
  margin-top: 1.5rem;
}

.controls {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
}

button {
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.status {
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  font-weight: 500;
}

.status.loading {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.status.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.result {
  margin-top: 1.5rem;
  text-align: center;
}

.result a {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.result a:hover {
  background-color: #218838;
}

.info {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 4px;
  margin-top: 2rem;
  border-left: 4px solid #007bff;
}

.info ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info li {
  padding: 0.5rem 0;
  color: #555;
}
</style>
