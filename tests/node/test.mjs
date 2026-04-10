import init, { add_font, compile_to_pdf } from '../../pkg/my_typst_wasm.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
    console.log("🚀 Manually loading WASM bytes for Node...");

    // 1. Locate the WASM binary
    const wasmPath = path.join(__dirname, '../../pkg/my_typst_wasm_bg.wasm');
    
    // 2. Read the file into a buffer
    const wasmBuffer = fs.readFileSync(wasmPath);

    // 3. Pass the buffer to init() 
    // This bypasses the 'fetch' call that Node is failing on
    await init(wasmBuffer); 
    
    console.log("✅ WASM Initialized with local buffer");

    // 4. Load Font
    const fontPath = path.join(__dirname, '../../public/fonts/Roboto-Regular.ttf');
    if (!fs.existsSync(fontPath)) {
        throw new Error(`Font not found at ${fontPath}. Put a .ttf there!`);
    }
    const fontBuffer = fs.readFileSync(fontPath);
    add_font(new Uint8Array(fontBuffer));

    // 5. Compile
    console.log("🎨 Compiling Typst...");
    const pdfBytes = compile_to_pdf("= Success!\nNode.js loaded the web-target WASM successfully.");

    // 6. Save
    const outputPath = path.join(__dirname, 'output.pdf');
    fs.writeFileSync(outputPath, pdfBytes);
    console.log(`🎉 PDF generated: ${outputPath}`);
}

run().catch(console.error);