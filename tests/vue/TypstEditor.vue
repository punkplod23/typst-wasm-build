<template>
  <div class="editor-container">
    <h1>Typst Live Editor</h1>
    
    <div class="controls">
      <button @click="initializeWasm" :disabled="wasmLoaded">
        {{ wasmLoaded ? '✅ WASM Loaded' : 'Load WASM' }}
      </button>
      <button @click="compile" :disabled="!wasmLoaded">
        🎨 Compile
      </button>
      <select v-model="selectedTemplate" @change="loadTemplate" :disabled="!wasmLoaded">
        <option value="simple">📝 Simple Document</option>
        <option value="chart">📊 Chart Example</option>
        <option value="advanced">✨ Advanced Layout</option>
      </select>
      <button @click="downloadPDF" :disabled="!pdfUrl">
        📥 Download PDF
      </button>
    </div>

    <div v-if="status" :class="['status', statusClass]">
      {{ status }}
    </div>

    <div class="editor-layout">
      <div class="editor-section">
        <h2>Typst Source Code</h2>
        <textarea
          v-model="typstCode"
          class="code-editor"
          placeholder="Enter your Typst code here..."
          :disabled="!wasmLoaded"
        ></textarea>
      </div>

      <div class="preview-section">
        <h2>Preview</h2>
        <div v-if="!pdfUrl" class="preview-placeholder">
          <p>👉 Click "Compile" to see preview</p>
        </div>
      <div v-else class="preview-content">
        <div v-if="pdfUrl" class="pdf-success">
          <div class="success-icon">✨</div>
          <h3>PDF Created Successfully!</h3>
          <p>Your document has been compiled to PDF</p>
          <div class="download-section">
            <a :href="pdfUrl" download="document.pdf" class="download-btn">
              📥 Download PDF
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>

    <div class="templates-info">
      <h3>📚 Quick Reference</h3>
      <div class="reference-grid">
        <div class="reference-card">
          <strong>Headings</strong>
          <code>= Heading 1<br>== Heading 2</code>
        </div>
        <div class="reference-card">
          <strong>Text Styling</strong>
          <code>*bold* _italic_<br>#[colored text]</code>
        </div>
        <div class="reference-card">
          <strong>Lists</strong>
          <code>- Item 1<br>- Item 2</code>
        </div>
        <div class="reference-card">
          <strong>Code Block</strong>
          <code>```typst<br>code here<br>```</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import init, { add_font, add_file, compile_to_pdf } from '../../pkg/my_typst_wasm.js';

export default {
  name: 'TypstEditor',
  data() {
    return {
      wasmLoaded: false,
      status: '',
      statusClass: '',
      pdfUrl: null,
      typstCode: '',
      selectedTemplate: 'simple',
      vendorLoaded: false,
      templates: {
        simple: `= Hello World

This is a simple Typst document created with Vue!

*Bold text* and _italic text_ can be used.

== Sections

You can create sections with double equals.

- This is a list
- With multiple items
- Very easy!`,
        
        chart: `= Charts & Graphs

This example shows how to use cetz for creating charts.

*Note: Charts with cetz-plot require the Node.js test.*

For now, this shows the power of Typst:

== Features

- *Professional Typography*: Industry-standard text rendering
- *Equations*: Full LaTeX math support
- *Scalability*: Vector-based graphics
- *Packages*: Extensible with packages like cetz
- *Performance*: Compiled to PDF efficiently

#set text(size: 12pt)

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna.`,
        
        advanced: `#set page(margin: 2.5cm)
#set text(font: "Roboto", size: 11pt, lang: "en")
#show heading: set text(font: "Roboto", weight: "bold")

= Professional Report

#set heading(numbering: "1.")

== Introduction

This is a more advanced template with custom styling and formatting.

#align(center)[
  _Generated with Typst WASM_
]

#v(1em)

== Key Sections

=== Data Presentation

Typst excels at creating professional documents with:

1. Structured layouts
2. Consistent styling
3. Dynamic content
4. Beautiful typography

=== Advanced Features

You can combine multiple features:

#box(
  fill: rgb("#e8f4f8"),
  stroke: 1pt + rgb("#0066cc"),
  inset: 15pt,
  radius: 5pt,
)[
  This is a styled box with a custom background and border.
  Perfect for highlighting important information.
]

#v(1em)

== Conclusion

Typst WASM brings document creation to the web browser!`
      }
    };
  },
  methods: {
    async initializeWasm() {
      this.status = '🚀 Loading WASM & Packages...';
      this.statusClass = 'loading';

      try {
        // Fetch and initialize WASM
        const response = await fetch('/my_typst_wasm_bg.wasm');
        const wasmBuffer = await response.arrayBuffer();
        await init(wasmBuffer);
        
        this.status = '✅ WASM Initialized - Loading packages...';
        
        // Load fonts
        await this.loadFonts();
        
        // Load vendor packages (cetz, cetz-plot, etc)
        await this.loadVendorPackages();
        
        this.status = '✅ WASM & Packages Loaded';
        this.statusClass = 'success';
        this.wasmLoaded = true;
      } catch (error) {
        this.status = `❌ Error: ${error.message}`;
        this.statusClass = 'error';
        console.error(error);
      }
    },

    async loadFonts() {
      try {
        const fonts = ['Roboto-Regular.ttf', 'NewCMMath-Regular.otf'];
        
        for (const fontFile of fonts) {
          try {
            const fontResponse = await fetch(`/fonts/${fontFile}`);
            if (fontResponse.ok) {
              const fontBuffer = await fontResponse.arrayBuffer();
              add_font(new Uint8Array(fontBuffer));
              console.log(`🔡 Loaded ${fontFile}`);
            }
          } catch (e) {
            console.warn(`Font ${fontFile} not available:`, e.message);
          }
        }
      } catch (error) {
        console.warn('Font loading warning:', error.message);
      }
    },

    async loadVendorPackages() {
      try {
        console.log('📦 Loading vendor packages...');
        
        // Try to fetch vendor manifest
        const vendorResponse = await fetch('/vendor-manifest.json');
        if (!vendorResponse.ok) {
          console.warn('Vendor packages not available');
          return;
        }
        
        const manifest = await vendorResponse.json();
        let loadedCount = 0;
        const contentCache = new Map(); // vfsPath -> data
        const packageFiles = {}; // Track files by package
        
        // First pass: load all files
        for (const [vfsPath, filePath] of Object.entries(manifest)) {
          try {
            const fileResponse = await fetch(`/${filePath}`);
            if (fileResponse.ok) {
              const buffer = await fileResponse.arrayBuffer();
              const isText = filePath.endsWith('.typ') || filePath.endsWith('.toml');
              const data = isText 
                ? new TextEncoder().encode(new TextDecoder().decode(buffer))
                : new Uint8Array(buffer);
              
              add_file(vfsPath, data);
              contentCache.set(vfsPath, data);
              loadedCount++;
              
              // Track files by package for special handling
              const match = vfsPath.match(/^preview\/([^\/]+)\/([^\/]+)\/(.+)$/);
              if (match) {
                const [, pkgName, version, relPath] = match;
                if (!packageFiles[pkgName]) packageFiles[pkgName] = { version, files: {} };
                packageFiles[pkgName].files[relPath] = { vfsPath, data };
              }
            }
          } catch (e) {
            console.debug(`Could not load ${filePath}:`, e.message);
          }
        }
        
        // Second pass: add special mappings for package compatibility
        for (const [pkgName, { version, files }] of Object.entries(packageFiles)) {
          if (pkgName === 'cetz') {
            // For cetz: lib.typ is at root but entrypoint expects src/lib.typ
            if (files['lib.typ']) {
              add_file(`preview/cetz/${version}/src/lib.typ`, files['lib.typ'].data);
            }
            
            // Add ALL root-level *.typ files also at the src/ level (for imports)
            for (const [relPath, { data }] of Object.entries(files)) {
              if (relPath.endsWith('.typ') && !relPath.includes('/')) {
                // This is a root-level .typ file
                add_file(`preview/cetz/${version}/src/${relPath}`, data);
              }
            }
            
            // Also add src/* files at root level
            for (const [relPath, { data }] of Object.entries(files)) {
              if (relPath.startsWith('src/')) {
                const rootPath = relPath.replace(/^src\//, '');
                add_file(`preview/cetz/${version}/${rootPath}`, data);
                add_file(rootPath, data);
              }
            }
            
            // Add cetz_core.wasm
            if (files['cetz_core.wasm']) {
              add_file(`preview/cetz/${version}/cetz-core/cetz_core.wasm`, files['cetz_core.wasm'].data);
            }
          } else if (pkgName === 'cetz-plot') {
            // For cetz-plot, map src/* to root level
            for (const [relPath, { data }] of Object.entries(files)) {
              if (relPath.startsWith('src/')) {
                add_file(relPath, data);
              }
            }
          }
        }
        
        this.vendorLoaded = true;
        console.log(`✅ Vendor packages loaded (${loadedCount} files)`);
      } catch (error) {
        console.warn('Vendor loading warning:', error.message);
      }
    },

    loadTemplate() {
      this.typstCode = this.templates[this.selectedTemplate];
      this.pdfUrl = null;
    },

    compile() {
      if (!this.typstCode.trim()) {
        this.status = '⚠️ Please enter Typst code';
        this.statusClass = 'error';
        return;
      }

      try {
        this.status = '🎨 Compiling...';
        this.statusClass = 'loading';

        // Ensure newlines are properly handled
        const normalizedCode = this.typstCode.replace(/\r\n/g, '\n');
        const pdfBytes = compile_to_pdf(normalizedCode);

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        this.pdfUrl = URL.createObjectURL(blob);

        this.status = '✅ Compiled successfully!';
        this.statusClass = 'success';
      } catch (error) {
        this.status = `❌ Compilation error: ${error.message}`;
        this.statusClass = 'error';
        console.error(error);
      }
    },

    downloadPDF() {
      if (this.pdfUrl) {
        const a = document.createElement('a');
        a.href = this.pdfUrl;
        a.download = 'document.pdf';
        a.click();
      }
    }
  },
  mounted() {
    this.typstCode = this.templates.simple;
  }
};
</script>

<style scoped>
.editor-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
}

h1 {
  color: #333;
  margin-bottom: 1.5rem;
}

h2 {
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #007bff;
  padding-bottom: 0.5rem;
}

h3 {
  color: #666;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.controls button,
.controls select {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.controls button {
  background-color: #007bff;
  color: white;
}

.controls button:hover:not(:disabled) {
  background-color: #0056b3;
}

.controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.controls select {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  cursor: pointer;
}

.controls select:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.status {
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
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

.editor-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  min-height: 600px;
}

.editor-section,
.preview-section {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fafafa;
}

.code-editor {
  flex: 1;
  padding: 1rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  border: none;
  resize: none;
  background-color: #fff;
  color: #333;
  line-height: 1.5;
}

.code-editor:focus {
  outline: none;
  background-color: #fafbff;
}

.code-editor:disabled {
  background-color: #f0f0f0;
  color: #999;
}

.preview-placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1.1rem;
}

.preview-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.pdf-success {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 8px;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.pdf-success h3 {
  color: white;
  border: none;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.pdf-success p {
  margin: 0 0 1.5rem 0;
  opacity: 0.9;
}

.download-section {
  padding: 1rem;
  border-top: 1px solid #ddd;
  text-align: center;
  background-color: #f9f9f9;
}

.download-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.download-btn:hover {
  background-color: #218838;
}

.reference-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.reference-card {
  padding: 1rem;
  background-color: #f5f5f5;
  border-left: 4px solid #007bff;
  border-radius: 4px;
}

.reference-card strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

.reference-card code {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.85rem;
  background-color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  color: #e83e8c;
  display: block;
  white-space: pre-wrap;
  word-break: break-word;
}

@media (max-width: 1024px) {
  .editor-layout {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}
</style>
