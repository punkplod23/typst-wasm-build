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
        <option value="periodic">🧪 Periodic Table</option>
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
        <iframe :src="pdfUrl" class="pdf-viewer"></iframe>
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

Typst WASM brings document creation to the web browser!`,

        periodic: `#import "@preview/cetz:0.4.2": canvas, draw

#set page(width: auto, height: auto, margin: 15pt)

// Element colors
#let colors = (
  alkali-metal: rgb("#8989ff"),
  alkaline-earth: rgb("#89a9ff"),
  metal: rgb("#89c9ff"),
  metalloid: rgb("#ffa959"),
  nonmetal: rgb("#59d9d9"),
  halogen: rgb("#ffff59"),
  noble-gas: rgb("#89ff89"),
  lanthanide: rgb("#ff8989"),
  synthetic: rgb("#525252"),
)

// Element data
#let elements = (
  // Period 1
  (
    ("1", "1.0079", "H", "Hydrogen"),
    none, none, none, none, none, none, none, none, none, none, none, none, none, none, none, none,
    ("2", "4.0025", "He", "Helium", colors.noble-gas),
  ),
  // Period 2
  (
    ("3", "6.941", "Li", "Lithium", colors.alkali-metal),
    ("4", "9.0122", "Be", "Beryllium", colors.alkaline-earth),
    none, none, none, none, none, none, none, none, none, none,
    ("5", "10.811", "B", "Boron", colors.metalloid),
    ("6", "12.011", "C", "Carbon", colors.nonmetal),
    ("7", "14.007", "N", "Nitrogen", colors.nonmetal),
    ("8", "15.999", "O", "Oxygen", colors.nonmetal),
    ("9", "18.998", "F", "Fluorine", colors.halogen),
    ("10", "20.180", "Ne", "Neon", colors.noble-gas),
  ),
  // Period 3
  (
    ("11", "22.990", "Na", "Sodium", colors.alkali-metal),
    ("12", "24.305", "Mg", "Magnesium", colors.alkaline-earth),
    none, none, none, none, none, none, none, none, none, none,
    ("13", "26.982", "Al", "Aluminium", colors.metal),
    ("14", "28.086", "Si", "Silicon", colors.metalloid),
    ("15", "30.974", "P", "Phosphorus", colors.nonmetal),
    ("16", "32.065", "S", "Sulphur", colors.nonmetal),
    ("17", "35.453", "Cl", "Chlorine", colors.halogen),
    ("18", "39.948", "Ar", "Argon", colors.noble-gas),
  ),
  // Period 4
  (
    ("19", "39.098", "K", "Potassium", colors.alkali-metal),
    ("20", "40.078", "Ca", "Calcium", colors.alkaline-earth),
    ("21", "44.956", "Sc", "Scandium", colors.metal),
    ("22", "47.867", "Ti", "Titanium", colors.metal),
    ("23", "50.942", "V", "Vanadium", colors.metal),
    ("24", "51.996", "Cr", "Chromium", colors.metal),
    ("25", "54.938", "Mn", "Manganese", colors.metal),
    ("26", "55.845", "Fe", "Iron", colors.metal),
    ("27", "58.933", "Co", "Cobalt", colors.metal),
    ("28", "58.693", "Ni", "Nickel", colors.metal),
    ("29", "63.546", "Cu", "Copper", colors.metal),
    ("30", "65.39", "Zn", "Zinc", colors.metal),
    ("31", "69.723", "Ga", "Gallium", colors.metal),
    ("32", "72.64", "Ge", "Germanium", colors.metalloid),
    ("33", "74.922", "As", "Arsenic", colors.metalloid),
    ("34", "78.96", "Se", "Selenium", colors.nonmetal),
    ("35", "79.904", "Br", "Bromine", colors.halogen),
    ("36", "83.8", "Kr", "Krypton", colors.noble-gas),
  ),
  // Period 5
  (
    ("37", "85.468", "Rb", "Rubidium", colors.alkali-metal),
    ("38", "87.62", "Sr", "Strontium", colors.alkaline-earth),
    ("39", "88.906", "Y", "Yttrium", colors.metal),
    ("40", "91.224", "Zr", "Zirconium", colors.metal),
    ("41", "92.906", "Nb", "Niobium", colors.metal),
    ("42", "95.94", "Mo", "Molybdenum", colors.metal),
    ("43", "96", "Tc", "Technetium", colors.metal),
    ("44", "101.07", "Ru", "Ruthenium", colors.metal),
    ("45", "102.91", "Rh", "Rhodium", colors.metal),
    ("46", "106.42", "Pd", "Palladium", colors.metal),
    ("47", "107.87", "Ag", "Silver", colors.metal),
    ("48", "112.41", "Cd", "Cadmium", colors.metal),
    ("49", "114.82", "In", "Indium", colors.metal),
    ("50", "118.71", "Sn", "Tin", colors.metal),
    ("51", "121.76", "Sb", "Antimony", colors.metalloid),
    ("52", "127.6", "Te", "Tellurium", colors.metalloid),
    ("53", "126.9", "I", "Iodine", colors.halogen),
    ("54", "131.29", "Xe", "Xenon", colors.noble-gas),
  ),
  // Period 6
  (
    ("55", "132.91", "Cs", "Caesium", colors.alkali-metal),
    ("56", "137.33", "Ba", "Barium", colors.alkaline-earth),
    ("57-71", "", text(size: 27pt)[La--Lu], "Lanthanide", colors.lanthanide),
    ("72", "178.49", "Hf", "Hafnium", colors.metal),
    ("73", "180.95", "Ta", "Tantalum", colors.metal),
    ("74", "183.84", "W", "Tungsten", colors.metal),
    ("75", "186.21", "Re", "Rhenium", colors.metal),
    ("76", "190.23", "Os", "Osmium", colors.metal),
    ("77", "192.22", "Ir", "Iridium", colors.metal),
    ("78", "195.08", "Pt", "Platinum", colors.metal),
    ("79", "196.97", "Au", "Gold", colors.metal),
    ("80", "200.59", "Hg", "Mercury", colors.metal),
    ("81", "204.38", "Tl", "Thallium", colors.metal),
    ("82", "207.2", "Pb", "Lead", colors.metal),
    ("83", "208.98", "Bi", "Bismuth", colors.metal),
    ("84", "209", "Po", "Polonium", colors.metalloid),
    ("85", "210", "At", "Astatine", colors.halogen),
    ("86", "222", "Rn", "Radon", colors.noble-gas),
  ),
  // Period 7
  (
    ("87", "223", "Fr", "Francium", colors.alkali-metal),
    ("88", "226", "Ra", "Radium", colors.alkaline-earth),
    ("89-103", "", text(size: 27pt)[Ac--#text(colors.synthetic)[Lr]], "Actinide", colors.lanthanide),
    ("104", "261", "Rf", "Rutherfordium", colors.metal),
    ("105", "262", "Db", "Dubnium", colors.metal),
    ("106", "266", "Sg", "Seaborgium", colors.metal),
    ("107", "264", "Bh", "Bohrium", colors.metal),
    ("108", "277", "Hs", "Hassium", colors.metal),
    ("109", "268", "Mt", "Meitnerium", colors.metal),
    ("110", "281", "Ds", "Darmstadtium", colors.metal),
    ("111", "280", "Rg", "Roentgenium", colors.metal),
    ("112", "285", "Cn", "Copernicium", colors.metal),
    ("113", "284", "Nh", "Nihonium", colors.metal),
    ("114", "289", "Fl", "Flerovium", colors.metal),
    ("115", "288", "Mc", "Moscovium", colors.metal),
    ("116", "293", "Lv", "Livermorium", colors.metal),
    ("117", "294", "Ts", "Tennessine", colors.halogen),
    ("118", "294", "Og", "Oganesson", colors.noble-gas),
  ),
)

// Lanthanide data
#let lanthanides = (
  ("57", "138.91", "La", "Lanthanum"),
  ("58", "140.12", "Ce", "Cerium"),
  ("59", "140.91", "Pr", "Praseodymium"),
  ("60", "144.24", "Nd", "Neodymium"),
  ("61", "145", "Pm", "Promethium"),
  ("62", "150.36", "Sm", "Samarium"),
  ("63", "151.96", "Eu", "Europium"),
  ("64", "157.25", "Gd", "Gadolinium"),
  ("65", "158.93", "Tb", "Terbium"),
  ("66", "162.50", "Dy", "Dysprosium"),
  ("67", "164.93", "Ho", "Holmium"),
  ("68", "167.26", "Er", "Erbium"),
  ("69", "168.93", "Tm", "Thulium"),
  ("70", "173.04", "Yb", "Ytterbium"),
  ("71", "174.97", "Lu", "Lutetium"),
)

// Actinide data
#let actinides = (
  ("89", "227", "Ac", "Actinium"),
  ("90", "232.04", "Th", "Thorium"),
  ("91", "231.04", "Pa", "Protactinium"),
  ("92", "238.03", "U", "Uranium"),
  ("93", "237", "Np", "Neptunium"),
  ("94", "244", "Pu", "Plutonium"),
  ("95", "243", "Am", "Americium"),
  ("96", "247", "Cm", "Curium"),
  ("97", "247", "Bk", "Berkelium"),
  ("98", "251", "Cf", "Californium"),
  ("99", "252", "Es", "Einsteinium"),
  ("100", "257", "Fm", "Fermium"),
  ("101", "258", "Md", "Mendelevium"),
  ("102", "259", "No", "Nobelium"),
  ("103", "262", "Lr", "Lawrencium"),
)

// Helper function to create an element box
#let element(number, mass, symbol, name, fill: white, text-color: black) = {
  box(width: 3cm, height: 3cm, fill: fill, stroke: black, inset: 4pt)[
    #set align(center)
    #text(size: 18pt, weight: "bold")[#number #h(1fr) #mass]\\
    #v(1fr)
    #text(size: 40pt, weight: "bold", fill: text-color)[#symbol]\\
    #v(1fr)
    #text(size: 13pt)[#name]
  ]
}

// Helper function to create a synthetic element (gray text)
#let synthetic-element(number, mass, symbol, name, fill: white) = {
  element(number, mass, symbol, name, fill: fill, text-color: colors.synthetic)
}

#canvas({
  import draw: line, content, rect

  let cell-size = 3.25 // Increased cell size
  let start-x = 0
  let start-y = 0
  let lanthanide-gap = 2.5 // Gap before lanthanides/actinides

  // Function to calculate element position
  let pos(group, period) = {
    let y-offset = if period > 7 { lanthanide-gap } else { 0 }
    (
      start-x + (group - 1) * cell-size,
      start-y - (period - 1) * cell-size - y-offset,
    )
  }

  // Function to calculate lanthanide/actinide position
  let special-pos(num, is-actinide: false) = {
    let row = if is-actinide { 9 } else { 8 }
    let col = num - (if is-actinide { 89 } else { 57 }) + 3
    let y-offset = lanthanide-gap
    (
      start-x + col * cell-size,
      start-y - (row - 1) * cell-size - y-offset,
    )
  }

  // Draw main table elements
  for period in range(1, elements.len() + 1) {
    for group in range(1, 19) {
      let data = elements.at(period - 1).at(group - 1)
      if data != none {
        if data.len() == 5 {
          let elem = if period == 7 and group >= 4 { synthetic-element } else { element }
          content(pos(group, period), elem(..data.slice(0, 4), fill: data.at(4)))
        } else {
          content(pos(group, period), element(..data))
        }
      }
    }
  }

  // Lanthanides
  for (idx, data) in lanthanides.enumerate() {
    content(special-pos(57 + idx), element(..data, fill: colors.lanthanide))
  }

  // Actinides
  for (idx, data) in actinides.enumerate() {
    content(
      special-pos(89 + idx, is-actinide: true),
      if idx <= 5 { element(..data, fill: colors.lanthanide) } else {
        synthetic-element(..data, fill: colors.lanthanide)
      },
    )
  }

  // Connect lanthanides and actinides to main table with dotted lines
  let la-pos = pos(3, 6)
  let ac-pos = pos(3, 7)
  let la-start = special-pos(57)
  let ac-start = special-pos(89, is-actinide: true)

  line(
    (la-pos.at(0), la-pos.at(1)),
    (la-start.at(0), la-start.at(1)),
    stroke: (dash: "dotted", thickness: 1.5pt),
  )
  line(
    (ac-pos.at(0), ac-pos.at(1)),
    (ac-start.at(0), ac-start.at(1)),
    stroke: (dash: "dotted", thickness: 1.5pt),
  )

  // Title
  content(
    (7 * cell-size, 0.2 * cell-size),
    text(size: 76pt, weight: "bold")[Periodic Table of Elements],
  )

  // Period labels
  for period in range(1, 8) {
    content(
      (start-x - cell-size * 0.6, start-y - (period - 1) * cell-size),
      text(size: 16pt, weight: "bold")[#period],
    )
  }

  // Group labels
  let groups = "IA IIA IIIB IVB VB VIB VIIB VIIIB VIIIB VIIIB IB IIB IIIA IVA VA VIA VIIA VIIIA".split(" ")

  // Find first element in each column
  for (num, label) in groups.enumerate(start: 1) {
    let first-period = if num == 1 or num == 18 { 1 } else if num == 2 or num > 12 { 2 } else { 4 }
    let (x, y) = pos(num, first-period)
    content(
      (x, y + cell-size * 0.7),
      box(width: 3cm)[
        #set align(center)
        #text(size: 14pt, weight: "bold")[#num #h(1fr) #label]
      ],
    )
  }

  // Legend
  let legend-start = (start-x - 0.5 * cell-size, start-y - 6.8 * cell-size)
  let legend-items = (
    ("Alkali Metal", colors.alkali-metal),
    ("Alkaline Earth Metal", colors.alkaline-earth),
    ("Transition Metal", colors.metal),
    ("Metalloid", colors.metalloid),
    ("Nonmetal", colors.nonmetal),
    ("Halogen", colors.halogen),
    ("Noble Gas", colors.noble-gas),
    ("Lanthanide/Actinide", colors.lanthanide),
  )

  for (idx, (label, color)) in legend-items.enumerate() {
    let y-offset = idx
    rect(
      (legend-start.at(0), legend-start.at(1) - y-offset),
      (legend-start.at(0) + 0.8, legend-start.at(1) - y-offset - 0.8),
      fill: color,
      stroke: black,
    )
    content(
      (legend-start.at(0) + 1, legend-start.at(1) - y-offset - 0.4),
      text(size: 14pt)[#label],
      anchor: "west",
    )
  }

  // Element key
  let key-pos = (12, -4)
  content(
    key-pos,
    element("Z", "mass", text("Symbol", size: 22pt), "Name"),
  )
  content(
    (key-pos.at(0) + 3.3, key-pos.at(1)),
    text(size: 12pt)[
      black: natural\\
      #text(fill: colors.synthetic)[gray: man-made]
    ],
  )
})`
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

.pdf-viewer {
  flex: 1;
  border: none;
  width: 100%;
  height: 100%;
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
