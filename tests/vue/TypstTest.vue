<template>
  <div class="typst-test-container">
    <h1>Typst WASM Vue Test</h1>
    
    <div class="controls">
      <button @click="initializeWasm" :disabled="wasmLoaded">
        {{ wasmLoaded ? '✅ WASM Loaded' : 'Load WASM' }}
      </button>
      <button @click="compileAndDownload" :disabled="!wasmLoaded">
        Compile to PDF
      </button>
    </div>

    <div v-if="status" :class="['status', statusClass]">
      {{ status }}
    </div>

    <div v-if="pdfUrl" class="result">
      <a :href="pdfUrl" download="output.pdf">
        📥 Download PDF
      </a>
    </div>
  </div>
</template>

<script>
import init, { add_font, compile_to_pdf } from '../../pkg/my_typst_wasm.js';

export default {
  name: 'TypstTest',
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
      this.status = '🚀 Loading WASM...';
      this.statusClass = 'loading';

      try {
        // Fetch the WASM binary
        const response = await fetch('my_typst_wasm_bg.wasm');
        const wasmBuffer = await response.arrayBuffer();

        // Initialize WASM
        await init(wasmBuffer);
        this.status = '✅ WASM Initialized';
        this.statusClass = 'success';
        this.wasmLoaded = true;

        // Load font
        await this.loadFont();
      } catch (error) {
        this.status = `❌ Error: ${error.message}`;
        this.statusClass = 'error';
        console.error(error);
      }
    },

    async loadFont() {
      try {
        const fontResponse = await fetch('fonts/Roboto-Regular.ttf');
        const fontBuffer = await fontResponse.arrayBuffer();
        add_font(new Uint8Array(fontBuffer));
        this.status = '🔡 Font loaded successfully';
      } catch (error) {
        this.status = `⚠️ Font loading warning: ${error.message}`;
        console.warn(error);
      }
    },

    compileAndDownload() {
      try {
        this.status = '🎨 Compiling Typst...';
        this.statusClass = 'loading';

        const pdfBytes = compile_to_pdf(
          "= Success!\nVue.js loaded the web-target WASM successfully."
        );

        // Create blob and download URL
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        this.pdfUrl = URL.createObjectURL(blob);

        this.status = '🎉 PDF generated successfully!';
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
.typst-test-container {
  max-width: 600px;
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
</style>
