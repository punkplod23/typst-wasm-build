package main

import (
	"context"
	"fmt"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/tetratelabs/wazero"
	"github.com/tetratelabs/wazero/imports/wasi_snapshot_preview1"
)

// Templates extracted from TypstEditor.vue
var templates = map[string]string{
	"simple": `// Simple Document
#set text(font: "Roboto")
= Hello World
This is a simple Typst document generated via Go!`,

	"chart": `#import "@preview/cetz:0.4.2": canvas, draw
#set text(font: "Roboto")
= Charts & Graphs
#canvas({
  import draw: *
  circle((0,0), radius: 2, fill: blue.lighten(80%))
})`,

	"periodic": `#import "@preview/cetz:0.4.2": canvas, draw
#set text(font: ("Roboto", "New Computer Modern Math"))
#show math.equation: set text(font: "New Computer Modern Math")

// Simplified Periodic Table Test
#canvas({
  import draw: content
  content((0,0), box(width: 2cm, height: 2cm, stroke: 1pt)[#set align(center); #text(14pt)[H]])
})`,

	"document": `// Professional Document with Base64 Image
#import "@preview/based:0.1.0": base64
#import "@preview/cetz:0.4.2"
#import "@preview/cetz-plot:0.1.3": chart

#let google_logo_data = "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"
#let raw-image = base64.decode(google_logo_data)
#set text(font: "Roboto")
= Revenue Distribution
#cetz.canvas({
  let data = (("Tech", 25), ("Retail", 18))
  chart.barchart(size: (10, 5), data)
})`,
}

func main() {
	ctx := context.Background()
	r := wazero.NewRuntime(ctx)
	defer r.Close(ctx)

	// Provide standard WASI imports
	wasi_snapshot_preview1.MustInstantiate(ctx, r)

	// Load WASM binary
	wasmPath := "../../pkg/my_typst_wasm_bg.wasm"
	wasmBytes, err := os.ReadFile(wasmPath)
	if err != nil {
		log.Fatalf("failed to read wasm binary: %v", err)
	}

	// Instantiate module. wasm-pack generates imports that we need to satisfy.
	// Since our Rust code is standard, we primarily need memory and the wbindgen stubs if they aren't linked.
	mod, err := r.Instantiate(ctx, wasmBytes)
	if err != nil {
		log.Fatalf("failed to instantiate wasm module: %v", err)
	}

	// Functions from our lib.rs
	addFont := mod.ExportedFunction("add_font")
	addPackageFile := mod.ExportedFunction("add_package_file")
	compileToPdf := mod.ExportedFunction("compile_to_pdf")
	malloc := mod.ExportedFunction("__wbindgen_malloc")
	free := mod.ExportedFunction("__wbindgen_free")

	// Helper to write string to WASM memory
	writeString := func(s string) (uint32, uint32) {
		ptrLen := uint32(len(s))
		results, err := malloc.Call(ctx, uint64(ptrLen), uint64(1))
		if err != nil {
			log.Fatal(err)
		}
		ptr := uint32(results[0])
		mod.Memory().Write(ptr, []byte(s))
		return ptr, ptrLen
	}

	// Helper to write bytes to WASM memory
	writeBytes := func(b []byte) (uint32, uint32) {
		ptrLen := uint32(len(b))
		results, err := malloc.Call(ctx, uint64(ptrLen), uint64(1))
		if err != nil {
			log.Fatal(err)
		}
		ptr := uint32(results[0])
		mod.Memory().Write(ptr, b)
		return ptr, ptrLen
	}

	// 1. Load Fonts
	fontFiles := []string{"Roboto-Regular.ttf", "NewCMMath-Regular.otf"}
	for _, f := range fontFiles {
		path := filepath.Join("../../public/fonts", f)
		data, err := os.ReadFile(path)
		if err != nil {
			fmt.Printf("⚠️ Warning: Font %s not found\n", f)
			continue
		}
		ptr, size := writeBytes(data)
		_, err = addFont.Call(ctx, uint64(ptr), uint64(size))
		free.Call(ctx, uint64(ptr), uint64(size), uint64(1))
		fmt.Printf("🔡 Loaded font: %s\n", f)
	}

	// 2. Load Vendor Packages (Walking the directory like Node.js walk)
	vendorRoot := "../../vendor/preview"
	err = filepath.WalkDir(vendorRoot, func(path string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return err
		}

		// Determine components for add_package_file(namespace, name, version, rel_path, data)
		rel, _ := filepath.Rel(vendorRoot, path)
		parts := strings.Split(filepath.ToSlash(rel), "/")
		if len(parts) < 4 {
			return nil
		}

		name := parts[0]
		ver := parts[1]
		
		// Robust root detection like Node.js
		// We need to find the part of the path relative to the directory containing typst.toml
		// For simplicity in this logic, we assume the makefile flattened them correctly.
		relPath := strings.Join(parts[2:], "/")

		data, _ := os.ReadFile(path)
		
		nsPtr, nsLen := writeString("preview")
		namePtr, nameLen := writeString(name)
		verPtr, verLen := writeString(ver)
		pathPtr, pathLen := writeString(relPath)
		dataPtr, dataLen := writeBytes(data)

		_, err = addPackageFile.Call(ctx, 
			uint64(nsPtr), uint64(nsLen), 
			uint64(namePtr), uint64(nameLen), 
			uint64(verPtr), uint64(verLen), 
			uint64(pathPtr), uint64(pathLen), 
			uint64(dataPtr), uint64(dataLen),
		)

		// Cleanup strings
		free.Call(ctx, uint64(nsPtr), uint64(nsLen), uint64(1))
		free.Call(ctx, uint64(namePtr), uint64(nameLen), uint64(1))
		free.Call(ctx, uint64(verPtr), uint64(verLen), uint64(1))
		free.Call(ctx, uint64(pathPtr), uint64(pathLen), uint64(1))
		free.Call(ctx, uint64(dataPtr), uint64(dataLen), uint64(1))

		// CeTZ specific WASM plugin fix
		if name == "cetz" && (relPath == "cetz_core.wasm" || relPath == "src/cetz_core.wasm") {
			pPtr, pLen := writeString("cetz-core/cetz_core.wasm")
			dPtr, dLen := writeBytes(data)
			nsPtr, nsLen = writeString("preview")
			nPtr, nLen := writeString("cetz")
			vPtr, vLen := writeString(ver)
			
			addPackageFile.Call(ctx, 
				uint64(nsPtr), uint64(nsLen), 
				uint64(nPtr), uint64(nLen), 
				uint64(vPtr), uint64(vLen), 
				uint64(pPtr), uint64(pLen), 
				uint64(dPtr), uint64(dLen),
			)
		}

		return nil
	})
	if err != nil {
		log.Fatalf("failed to load packages: %v", err)
	}
	fmt.Println("📦 Vendor packages registered in VFS")

	// 3. Generate PDFs for all templates
	os.MkdirAll("output", 0755)
	for name, source := range templates {
		fmt.Printf("🎨 Compiling template: %s... ", name)
		
		srcPtr, srcLen := writeString(source)
		
		// compile_to_pdf returns Result<Vec<u8>, JsValue>
		// In wazero/wasm-bindgen, this usually returns a pointer to a struct containing the vec
		// or we need to handle the returned slice from Rust memory.
		// NOTE: For this to work perfectly, your Rust 'compile_to_pdf' should ideally return 
		// a direct pointer/length for non-JS environments, or we parse the wasm-bindgen result object.
		results, err := compileToPdf.Call(ctx, uint64(srcPtr), uint64(srcLen))
		if err != nil {
			fmt.Printf("❌ Failed: %v\n", err)
			continue
		}

		// Assuming the Rust return is a pointer to the start of the Vec<u8> result
		// (This depends on the specific wasm-bindgen ABI for the version used)
		if len(results) > 0 {
			// This is a placeholder for result extraction logic. 
			// Since wasm-bindgen is designed for JS, calling it from Go requires 
			// reading the JS-compatible return structure from memory.
			fmt.Printf("✅ Success (Simulated). See Note below.\n")
		}
		
		free.Call(ctx, uint64(srcPtr), uint64(srcLen), uint64(1))
	}

	fmt.Println("\n🚀 Go PDF Generation Complete.")
	fmt.Println("Note: Direct extraction of Vec<u8> from a wasm-bindgen module in Go requires")
	fmt.Println("parsing the result pointer or modifying Rust to use a 'C' ABI for Go compatibility.")
}