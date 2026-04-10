const fs = require('fs');
const path = require('path');

// wasm-pack defaults to the 'pkg' folder
const WASM_FILE = './pkg/my_typst_wasm_bg.wasm';
const JS_GLUE = './pkg/my_typst_wasm.js';

// We want the final handler to live in our Vue source
const OUTPUT_DIR = './src/wasm';
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'typst-handler.js');

function generate() {
    console.log("Checking pkg directory for wasm-pack output...");

    if (!fs.existsSync(WASM_FILE) || !fs.existsSync(JS_GLUE)) {
        console.error("❌ WASM artifacts not found in ./pkg/");
        console.log("Run 'wasm-pack build --target web' first.");
        return;
    }

    // Create src/wasm if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const content = `
/**
 * AUTO-GENERATED TYPST HANDLER
 * This file wraps the WASM glue code for Vue 3 integration.
 */
import init, { add_font, compile_to_pdf } from './my_typst_wasm.js';

export async function initTypst(fontUrl = null) {
    await init();
    
    if (fontUrl) {
        const res = await fetch(fontUrl);
        const buffer = await res.arrayBuffer();
        add_font(new Uint8Array(buffer));
    }

    return {
        compile: (text) => compile_to_pdf(text)
    };
}
`;

    // Copy the original pkg files to src/wasm so the import works
    fs.copyFileSync(JS_GLUE, path.join(OUTPUT_DIR, 'my_typst_wasm.js'));
    fs.copyFileSync(WASM_FILE, path.join(OUTPUT_DIR, 'my_typst_wasm_bg.wasm'));

    fs.writeFileSync(OUTPUT_FILE, content.trim());
    console.log(`✅ Successfully moved pkg files and generated ${OUTPUT_FILE}`);
}

generate();