# Variables
CRATE_NAME = my_typst_wasm
WASM_OUT_DIR = ./src/wasm
PKG_DIR = ./pkg

# Versions
VENDOR_DIR = vendor
CETZ_VERSION = 0.4.2
PLOT_VERSION = 0.1.3
OXIFMT_VERSION = 1.0.0

# Target Directories
CETZ_TARGET_DIR = $(VENDOR_DIR)/preview/cetz/$(CETZ_VERSION)
PLOT_TARGET_DIR = $(VENDOR_DIR)/preview/cetz-plot/$(PLOT_VERSION)
OXIFMT_TARGET_DIR = $(VENDOR_DIR)/preview/oxifmt/$(OXIFMT_VERSION)

# Official Typst Package URLs (Note the structure)
CETZ_URL = https://packages.typst.org/preview/cetz-$(CETZ_VERSION).tar.gz
PLOT_URL = https://packages.typst.org/preview/cetz-plot-$(PLOT_VERSION).tar.gz
OXIFMT_URL = https://packages.typst.org/preview/oxifmt-$(OXIFMT_VERSION).tar.gz

# Font Variables
FONT_DIR = ./public/fonts
ROBOTO_URL = https://github.com/googlefonts/roboto/raw/main/src/v2/Roboto-Regular.ttf
MATH_URL = https://github.com/stipub/stixfonts/raw/master/fonts/static_ttf/STIXTwoMath-Regular.ttf

.PHONY: all build clean move test generate_js vendor_setup clean_vendor font_setup

# Default task: build and move
all: clean build move

# Build the WASM package using wasm-pack
build:
	wasm-pack build --target web --release

# Ensure the destination exists and move the generated files
move:
	mkdir -p $(WASM_OUT_DIR)
	cp $(PKG_DIR)/$(CRATE_NAME).js $(WASM_OUT_DIR)/
	cp $(PKG_DIR)/$(CRATE_NAME)_bg.wasm $(WASM_OUT_DIR)/
	@echo "WASM files moved to $(WASM_OUT_DIR)"

# Run Rust unit tests
test:
	cargo test
	wasm-pack test --node

# Clean build artifacts
clean:
	rm -rf $(PKG_DIR)
	rm -rf target
	@echo "Cleaned build artifacts"

generate_js:
	node tests/node/build-bridge.js && node tests/node/test.mjs && node tests/node/test-cetz.mjs

vendor_setup:
	@mkdir -p $(VENDOR_DIR)/temp
	
	@echo "📥 Downloading CeTZ..."
	curl -sSL $(CETZ_URL) | tar -xz -C $(VENDOR_DIR)/temp
	@mv $(VENDOR_DIR)/temp/*/* $(CETZ_TARGET_DIR) 2>/dev/null || mv $(VENDOR_DIR)/temp/* $(CETZ_TARGET_DIR)
	@rm -rf $(VENDOR_DIR)/temp/*

	@echo "📥 Downloading CeTZ-Plot..."
	curl -sSL $(PLOT_URL) | tar -xz -C $(VENDOR_DIR)/temp
	@mv $(VENDOR_DIR)/temp/*/* $(PLOT_TARGET_DIR) 2>/dev/null || mv $(VENDOR_DIR)/temp/* $(PLOT_TARGET_DIR)
	@rm -rf $(VENDOR_DIR)/temp/*

	@echo "📥 Downloading Oxifmt..."
	curl -sSL $(OXIFMT_URL) | tar -xz -C $(VENDOR_DIR)/temp
	@mv $(VENDOR_DIR)/temp/*/* $(OXIFMT_TARGET_DIR) 2>/dev/null || mv $(VENDOR_DIR)/temp/* $(OXIFMT_TARGET_DIR)
	@rm -rf $(VENDOR_DIR)/temp
	
	@echo "\n🔍 Final Verification:"
	@ls -1 $(CETZ_TARGET_DIR)/typst.toml && echo "✅ CeTZ: typst.toml exists"
	@ls -1 $(PLOT_TARGET_DIR)/typst.toml && echo "✅ Plot: typst.toml exists"
	@ls -1 $(OXIFMT_TARGET_DIR)/typst.toml && echo "✅ Oxifmt: typst.toml exists"

clean_vendor:
	rm -rf $(VENDOR_DIR)

# Downloads Roboto-Regular.ttf to the public folder
font_setup:
	@echo "📂 Creating font directory..."
	mkdir -p $(FONT_DIR)
	@echo "📥 Downloading Roboto-Regular.ttf..."
	curl -L $(ROBOTO_URL) -o $(FONT_DIR)/Roboto-Regular.ttf
	@echo "📥 Downloading STIXTwoMath-Regular.ttf..."
	curl -L $(MATH_URL) -o $(FONT_DIR)/STIXTwoMath-Regular.ttf
	@echo "✅ Font setup complete!"

# Update your main setup command to include everything
setup_all: vendor_setup font_setup
	@echo "🚀 All assets (Packages & Fonts) are ready."