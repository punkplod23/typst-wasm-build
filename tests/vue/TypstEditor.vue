<template>
  <div class="editor-container">
    <h1>Typst Live Editor</h1>
    
    <div class="controls">
      <button @click="compile" :disabled="!wasmLoaded">
        🎨 Compile
      </button>
      <select v-model="selectedTemplate" @change="loadTemplate" :disabled="!wasmLoaded">
        <option value="simple">📝 Simple Document</option>
        <option value="chart">📊 Chart Example</option>
        <option value="advanced">✨ Advanced Layout</option>
        <option value="periodic">🧪 Periodic Table</option>
        <option value="document">📄 Professional Document</option>
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
import init, { add_font, add_file, add_package_file, compile_to_pdf } from '../../src/wasm/my_typst_wasm.js';

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
#import "@preview/cetz:0.4.2": canvas, draw

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
#set text(font: ("Roboto", "New Computer Modern Math"))
#show math.equation: set text(font: "New Computer Modern Math")

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
})`,

        document: `// Google Logo (Base64 encoded PNG)
#import "@preview/based:0.1.0": base64
#import "@preview/cetz:0.4.2"
#import "@preview/cetz-plot:0.1.3": chart, plot

#let google_logo_data = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMCAgcGBggGBQcGBgUGCAgGBgYGBQUHBwYGBgYFBQYGBgYGBgYGBgYGBQYGBQoGBgcICQkJBgYLDQoIDQYICQgBAwQEBgUGCAYGCAgICAgKCggICggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICP/AABEIAi8EAAMBIgACEQEDEQH/xAAdAAEAAgMBAQEBAAAAAAAAAAAAAQgGBwkFBAID/8QAXhAAAgIBAgIGAggODQoFAwUAAAECAwQFERIhBgcIEzFBUWEUIjI1UnFzgRUjMzRCVXSRkqGys7TUCRgkJVNiY3KTlLHR0xdDVHWClaKjw9ImNkSEwRaDpGTh4/Dx/8QAHQEBAAIDAQEBAQAAAAAAAAAAAAYHBAUIAgMBCf/EAEwRAAIBAgMEBQcIBwcDAwUAAAABAgMRBBIhBQYxQRNRYXGBFCIycpGhsQczNDVCUoKyFSNic5LB0RZTorPC0vAkVOKj4fElQ2Nkk//aAAwDAQACEQMRAD8A6pJDYIkAjYbEgAjYEgAjYbEgAjYEgAjYbEgAjYbEgAgbEgAjYbEgAjYEgAgEgAjYbEgAgEgAjYbEgAjYbEgAgEgAjYEgAgbEgAjYbEgAjYbEgAgbEgAjYbEgAgbEgAjYEgAjYEgAjYbEgAgEgAgbEgAjYbEgAjYEgAgEgAgbEgAjYbEgAgbEgAjYbEgAgbEgAgbEgAjYEgAgbEgAjYbEgAjYEgAgEgAgEgAjYbEgAgEgAgEgAjYbEgAgbEgAjYbEgAjYbEgAjYbEgAjYbEgAjYbEgAjYbEgAjYbEgAjYbEgAjYbEgAjYbEgAjYEgAgbEgAgbEgAjYbEgAjYbEgAjYNEkMAIkhAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhkkMAIBAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhkkABAIAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEkMAIEIkAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgkgAIEIkAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhkkAERJIRIBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDJIYAQIRIBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBJAAQIR+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEMkhgEI/RCABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBJAAQIRIBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDJIACJIQAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIJIYBCJCABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBJAAiSflEgEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEkMAIEIkAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgkhgBEkIAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEMkgAIBAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgkgAIEI/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIJIAIRIRIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIZJABET9ERJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBJDACJITG4BII3G4BII3G4BII3G4BIIG4BII3G4BIIJAAI3ABII3G4BII3ABII3ABIBG4BIIABII3ABIIG4BIIJAAIABIBABIBABII3ABIBABII3G4BIIJAAI3ABII3JAAIG4BII3ABIBABIBABII3JAAIG4BII3ABII3G4BII3G4BII3ABII3G4BIIG4BII3JAAIG4BII3G4BII3JAAI3G4BII3G4BII3G4BIBABII3G4BII3G4BII3G4BII3ABII3G4BII3ABIIG4BIIG4BIIJAAIABIIJAAI3G4BIBABII3ABII3ABII3ABII3JAAIJABBJDAP/2Q=="
#let raw-image = base64.decode(google_logo_data)

#let google-palette = (rgb("#4285F4"), rgb("#EA4335"), rgb("#FBBC05"), rgb("#34A853"))

#set page(
  paper: "a4",
  margin: (x: 1in, y: 1.65in),
  header: context {
    let page_num = counter(page).get().first()
    if page_num == 1 {
      grid(
        columns: (1fr, 1fr),
        align(left + horizon)[#image(raw-image, format: "jpg", width: 100pt)],
        align(right + horizon)[
          #text(fill: gray, size: 9pt)[
            Internal Document \\
            #datetime.today().display("[month repr:long] [day], [year]")
          ]
        ]
      )
      v(5pt)
      line(length: 100%, stroke: 0.5pt + gray.lighten(50%))
    }
  }
)

#set text(font: ("Roboto"), size: 11pt, weight: "light")
#show heading: set text(fill: rgb("#4285F4"), weight: "regular")

= Revenue Distribution
#align(center)[
  #block(inset: 10pt, radius: 4pt)[
    #cetz.canvas({
      let data = (("Tech", 25), ("Retail", 18), ("Health", 32), ("Finance", 21))
      chart.barchart(
        size: (12, 6),
        data,
        bar-width: 0.7,
        bar-style: cetz.palette.new(colors:google-palette), 
        x-label: "Department",
        y-label: "Revenue (USD Millions)"
      )
    })
  ]
]

#v(2em)

#align(center)[
  #block(stroke: 1pt + luma(200), inset: 10pt, radius: 4pt)[
    #cetz.canvas({
      let pie-data = (("Tech", 25), ("Retail", 18), ("Health", 32), ("Finance", 21))
      chart.piechart(
        pie-data,
        value-key: 1,
        label-key: 0,
        radius: 2.5,
        // For piecharts, some versions use 'fill' in 'style' or 'slice-style'
        slice-style: (google-palette),
        inner-label: (radius: 60%, content: (v, l) => text(white, weight: "bold")[#v]),
        outer-label: (radius: 120%, content: (v, l) => l),
      )
    })
  ]
]`
      }
    };
  },
  methods: {
    async initializeWasm() {
      this.status = '🚀 Loading WASM & Packages...';
      this.statusClass = 'loading';

      const baseUrl = import.meta.env.BASE_URL || './';

      try {
        // Fetch and initialize WASM
        const response = await fetch(`${baseUrl}my_typst_wasm_bg.wasm`);
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
      } catch (error) {
        console.warn('Font loading warning:', error.message);
      }
    },

    async loadVendorPackages() {
      const baseUrl = import.meta.env.BASE_URL || './';
      try {
        console.log('📦 Loading vendor packages...');
        
        // Try to fetch vendor manifest
        const vendorResponse = await fetch(`${baseUrl}vendor-manifest.json`);
        if (!vendorResponse.ok) {
          console.warn('Vendor packages not available');
          this.vendorLoaded = true; // Still allow compilation without vendor
          return;
        }
        
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

        let loadedFiles = 0;
        // Process each package group
        for (const [pkgKey, files] of packageGroups.entries()) {
          const [ns, name, ver] = pkgKey.split('/');
          
          // Discover the true package root (where typst.toml lives)
          let rootPrefix = "";
          const hasRootToml = files.some(f => f.rel === 'typst.toml');
          if (!hasRootToml) {
            const tomlFile = files.find(f => f.rel.endsWith('/typst.toml'));
            if (tomlFile) rootPrefix = tomlFile.rel.replace('typst.toml', '');
          }

          const packageResults = await Promise.allSettled(
            files.filter(f => f.rel.startsWith(rootPrefix)).map(async (file) => {
              const fetchPath = file.filePath.startsWith('vendor/') ? file.filePath : `vendor/${file.filePath}`;
              const res = await fetch(`${baseUrl}${fetchPath}`);
              if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

              const buffer = await res.arrayBuffer();
              const finalRelPath = file.rel.slice(rootPrefix.length);
              
              // Handle text vs binary
              const isText = finalRelPath.endsWith('.typ') || finalRelPath.endsWith('.toml');
              const data = isText 
                ? new TextEncoder().encode(new TextDecoder().decode(buffer))
                : new Uint8Array(buffer);

              // Use the standardized Rust loader
              add_package_file(ns, name, ver, finalRelPath, data);
              return { path: finalRelPath, data };
            })
          );

          const contentMap = new Map();
          packageResults.forEach(result => {
            if (result.status === 'fulfilled' && result.value) {
              contentMap.set(result.value.path, result.value.data);
              loadedFiles++;
            }
          });

          // CeTZ-specific fix for the WASM plugin location
          const wasmPlugin = contentMap.get('cetz_core.wasm') || contentMap.get('src/cetz_core.wasm');
          if (name === 'cetz' && wasmPlugin) {
            add_package_file(ns, name, ver, "cetz-core/cetz_core.wasm", wasmPlugin);
          }
        }

        this.vendorLoaded = true;
        console.log(`✅ Vendor packages loaded (${loadedFiles} files)`);
      } catch (error) {
        console.warn('Vendor loading warning:', error.message);
      }
    },

    loadTemplate() {
      this.typstCode = this.templates[this.selectedTemplate];
      this.pdfUrl = null;
      this.compile();
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
  async mounted() {
    this.typstCode = this.templates.simple;
    // Automatically initialize so the user can just start typing
    await this.initializeWasm();
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
