# Variables
CRATE_NAME = my_typst_wasm
WASM_OUT_DIR = ./src/wasm
PKG_DIR = ./pkg

# Versions
VENDOR_DIR = vendor
CETZ_VERSION = 0.4.2
PLOT_VERSION = 0.1.3
OXIFMT_VERSION = 1.0.0
BASED_VERSION = 0.1.0

# Target Directories
CETZ_TARGET_DIR = $(VENDOR_DIR)/preview/cetz/$(CETZ_VERSION)
PLOT_TARGET_DIR = $(VENDOR_DIR)/preview/cetz-plot/$(PLOT_VERSION)
OXIFMT_TARGET_DIR = $(VENDOR_DIR)/preview/oxifmt/$(OXIFMT_VERSION)
BASED_TARGET_DIR = $(VENDOR_DIR)/preview/based/$(BASED_VERSION)

# Official Typst Package URLs (Note the structure)
CETZ_URL = https://packages.typst.org/preview/cetz-$(CETZ_VERSION).tar.gz
PLOT_URL = https://packages.typst.org/preview/cetz-plot-$(PLOT_VERSION).tar.gz
OXIFMT_URL = https://packages.typst.org/preview/oxifmt-$(OXIFMT_VERSION).tar.gz
BASED_URL = https://packages.typst.org/preview/based-$(BASED_VERSION).tar.gz

# Font Variables
FONT_DIR = ./public/fonts
ROBOTO_URL = https://github.com/googlefonts/roboto/raw/main/src/v2/Roboto-Regular.ttf
NEWCM_URL = https://github.com/m-g-h/newcomputermodern/raw/master/NewCMMath-Regular.otf

# Vue Asset Syncing
VUE_PUBLIC_DIR = ./tests/vue/public

.PHONY: all build clean move test generate_js vendor_setup clean_vendor font_setup sync_assets

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
	@echo "📂 Creating vendor directory..."
	mkdir -p $(VENDOR_DIR)
	mkdir -p $(VENDOR_DIR)/preview
	
	mkdir -p $(CETZ_TARGET_DIR)
	mkdir -p $(PLOT_TARGET_DIR)
	mkdir -p $(OXIFMT_TARGET_DIR)
	mkdir -p $(BASED_TARGET_DIR)

	@echo "📥 Downloading CeTZ..."
	curl -sSL $(CETZ_URL) | tar -xz --strip-components=1 -C $(CETZ_TARGET_DIR)

	@echo "📥 Downloading CeTZ-Plot..."
	curl -sSL $(PLOT_URL) | tar -xz --strip-components=1 -C $(PLOT_TARGET_DIR)

	@echo "📥 Downloading Oxifmt..."
	curl -sSL $(OXIFMT_URL) | tar -xz --strip-components=1 -C $(OXIFMT_TARGET_DIR)

	@echo "📥 Downloading based..."
	curl -sSL $(BASED_URL) | tar -xz --strip-components=1 -C $(BASED_TARGET_DIR)
	
	@echo "\n🔍 Final Verification:"
	@ls -1 $(CETZ_TARGET_DIR)/typst.toml 2>/dev/null && echo "✅ CeTZ: typst.toml exists" || echo "❌ CeTZ: Missing typst.toml"
	@ls -1 $(PLOT_TARGET_DIR)/typst.toml && echo "✅ Plot: typst.toml exists"
	@ls -1 $(OXIFMT_TARGET_DIR)/typst.toml && echo "✅ Oxifmt: typst.toml exists"
	@ls -1 $(BASED_TARGET_DIR)/typst.toml && echo "✅ based: typst.toml exists"

clean_vendor:
	rm -rf $(VENDOR_DIR)

# Downloads Roboto-Regular.ttf to the public folder
font_setup:
	@echo "📂 Creating font directory..."
	mkdir -p $(FONT_DIR)
	@echo "📥 Downloading Roboto-Regular.ttf..."
	curl -L $(ROBOTO_URL) -o $(FONT_DIR)/Roboto-Regular.ttf
	@echo "📥 Downloading NewCMMath-Regular.otf..."
	curl -L $(NEWCM_URL) -o $(FONT_DIR)/NewCMMath-Regular.otf

# Syncs assets from root to the Vue public directory
sync_assets:
	@echo "🔄 Syncing assets to Vue public directory..."
	mkdir -p $(VUE_PUBLIC_DIR)/fonts
	mkdir -p $(VUE_PUBLIC_DIR)/vendor
	cp -r $(FONT_DIR)/* $(VUE_PUBLIC_DIR)/fonts/
	cp -r $(VENDOR_DIR)/* $(VUE_PUBLIC_DIR)/vendor/
	cp $(PKG_DIR)/$(CRATE_NAME).js $(VUE_PUBLIC_DIR)/
	cp $(PKG_DIR)/$(CRATE_NAME)_bg.wasm $(VUE_PUBLIC_DIR)/
	cd tests/vue && node generate-vendor-manifest.js
	@echo "✅ Assets synced to $(VUE_PUBLIC_DIR)"

# Update your main setup command to include everything
setup_all: vendor_setup font_setup sync_assets
	@echo "🚀 All assets (Packages & Fonts) are ready."