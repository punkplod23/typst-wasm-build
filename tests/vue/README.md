# Vue Test for Typst WASM

This directory contains a Vue.js test for the typst-wasm module, similar to the Node.js test.

## Files

- **TypstTest.vue** - Vue component that demonstrates WASM initialization and Typst compilation
- **test.vue.mjs** - Headless test script (Node.js environment)
- **App.vue** - Root Vue component
- **main.js** - Vue app entry point
- **index.html** - HTML entry point for the web app
- **vite.config.js** - Vite configuration
- **package.json** - Project dependencies and scripts

## Usage

### Headless Test (Node.js)
```bash
npm install
npm test
```

This will run the test in Node.js and generate an `output.pdf` file.

### Interactive Web Test
```bash
npm install
npm run dev
```

This will start a development server and open the Vue application in your browser. You can then:
1. Click "Load WASM" to initialize the WebAssembly module
2. Click "Compile to PDF" to generate a PDF from Typst
3. Download the generated PDF

## How It Works

The Vue test mirrors the Node test functionality:
- Loads the WASM module from `../../pkg/my_typst_wasm_bg.wasm`
- Initializes the WASM environment
- Loads a font from `../../public/fonts/`
- Compiles a Typst document to PDF
- In the headless version, saves the PDF to disk
- In the interactive version, allows downloading the PDF
