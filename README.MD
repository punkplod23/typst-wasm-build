# Typst WASM Editor

A Vue 3 based Typst editor powered by a custom Rust WebAssembly engine.

## Description

This project provides a WebAssembly (WASM) build of the Typst typesetting system, allowing Typst documents to be compiled and rendered directly in the browser or Node.js environments. It includes a custom Rust implementation of the Typst world, enabling features like font loading, file access, and package management for preview packages such as CeTZ and CeTZ-Plot.

The project also includes a Vue 3 frontend for an interactive Typst editor, along with comprehensive Node.js tests for validating the WASM engine's functionality.

## Features

- **WebAssembly Typst Engine**: Compile Typst documents to PDF in the browser or server-side.
- **Font Support**: Load custom fonts (e.g., Roboto, STIX Two Math) for rendering.
- **Package Management**: Support for Typst preview packages like CeTZ for diagrams and CeTZ-Plot for charts.
- **Vue 3 Editor**: Interactive web-based editor for Typst documents.
- **Node.js Testing**: Comprehensive tests including basic compilation and advanced package usage.
- **Vendored Dependencies**: Local caching of Typst packages for offline development.

## Prerequisites

- [Rust](https://rustup.rs/) (latest stable version recommended)
- `wasm32-unknown-unknown` Rust target:
  ```bash
  rustup target add wasm32-unknown-unknown
  ```
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
- [Node.js](https://nodejs.org/) v18+
- [curl](https://curl.se/) (for downloading assets)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/typst-wasm-build.git
   cd typst-wasm-build
   ```

2. **Set up dependencies:**
   ```bash
   make setup_all
   ```
   This downloads and extracts Typst preview packages (CeTZ, CeTZ-Plot, Oxifmt) and required fonts (Roboto, STIX Two Math).

## Development

1. **Build the WASM Engine:**
   ```bash
   make all
   ```
   This performs:
   - Cleans previous builds (`make clean`)
   - Builds the WASM package with `wasm-pack build --target web --release`
   - Moves generated files (`my_typst_wasm.js`, `my_typst_wasm_bg.wasm`) to `src/wasm/`

2. **Run tests:**
   ```bash
   make test
   ```
   Runs Rust unit tests and WASM tests via Node.js.

3. **Generate and test JavaScript bridge:**
   ```bash
   make generate_js
   ```
   Builds the bridge and runs Node.js tests, including CeTZ diagram generation.

## Usage

### As a WASM Library

The built WASM package can be integrated into web applications:

```javascript
import init, { compile_to_pdf } from './pkg/my_typst_wasm.js';

await init();
const pdfBytes = compile_to_pdf(typstSource, {});
// Use pdfBytes as needed
```

### Vue 3 Editor

The `src/wasm/` files are consumed by the Vue 3 frontend. To run the editor:

1. Ensure the WASM is built: `make all`
2. Serve the Vue app (assuming a separate frontend setup or integrated build)

### Node.js Usage

See `tests/node/` for examples of using the WASM engine in Node.js, including font loading and package mounting.

## Testing

- **Unit Tests:** `cargo test`
- **WASM Tests:** `wasm-pack test --node`
- **Integration Tests:** `make generate_js` (runs Node.js bridge and CeTZ tests)
- **Manual Testing:** Check generated PDFs in `tests/node/output.pdf` and `tests/node/gallery.pdf`

## Project Structure

- `src/lib.rs`: Rust implementation of the Typst world and WASM bindings
- `pkg/`: Generated WASM package files
- `src/wasm/`: Moved WASM files for frontend consumption
- `public/fonts/`: Font files for rendering
- `vendor/`: Vendored Typst preview packages
- `tests/node/`: Node.js test scripts and examples
- `makefile`: Build automation

## Troubleshooting

- **Build Failures:** Ensure all prerequisites are installed. If Typst API changes cause errors, check `src/lib.rs` for correct usage of `Datetime::from_ymd()` and `Bytes::new()`.
- **Package Resolution:** If tests fail with missing files, re-run `make setup_all` to refresh vendored packages.
- **Font Issues:** Verify fonts are in `public/fonts/`. Use `make font_setup` to re-download.
- **Stale Artifacts:** Run `make clean` before rebuilding.
- **Node.js Errors:** Ensure Node.js v18+ and check for missing dependencies in test scripts.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes and run tests: `make test && make generate_js`
4. Commit and push: `git push origin feature/your-feature`
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Typst](https://typst.app/) for the typesetting system
- [wasm-pack](https://rustwasm.github.io/wasm-pack/) for WASM tooling
- Typst community packages: [CeTZ](https://github.com/johannes-wolf/cetz), [CeTZ-Plot](https://github.com/johannes-wolf/cetz-plot), [Oxifmt](https://github.com/johannes-wolf/oxifmt)
