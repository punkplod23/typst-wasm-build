import init, { add_font, add_file, compile_to_pdf } from '../../pkg/my_typst_wasm.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseEntrypoint(rootPath) {
    const tomlPath = path.join(rootPath, 'typst.toml');
    if (!fs.existsSync(tomlPath)) return null;

    const content = fs.readFileSync(tomlPath, 'utf8');
    const match = content.match(/^\s*entrypoint\s*=\s*"([^"]+)"/m);
    let entrypoint = match ? match[1] : null;
    if (entrypoint && !fs.existsSync(path.join(rootPath, entrypoint))) {
        if (fs.existsSync(path.join(rootPath, 'lib.typ'))) {
            entrypoint = 'lib.typ';
        } else {
            entrypoint = null;
        }
    }
    return entrypoint;
}

async function run() {
    const wasmBuffer = fs.readFileSync(path.join(__dirname, '../../pkg/my_typst_wasm_bg.wasm'));
    await init({ module_or_path: wasmBuffer });

    // Inside your run() function in test-cetz.mjs
    const fonts = ['Roboto-Regular.ttf', 'NewCMMath-Regular.otf'];

    fonts.forEach(fontFile => {
        const fontPath = path.join(__dirname, '../../public/fonts', fontFile);
        if (fs.existsSync(fontPath)) {
            add_font(new Uint8Array(fs.readFileSync(fontPath)));
            console.log(`🔡 VFS: Loaded ${fontFile}`);
        }
    });
    const vendorPath = path.join(__dirname, '../../vendor/preview');
    const packageNames = fs.readdirSync(vendorPath).filter(name => fs.statSync(path.join(vendorPath, name)).isDirectory());

    for (const name of packageNames) {
        const pkgDir = path.join(vendorPath, name);
        const versions = fs.readdirSync(pkgDir).filter(ver => fs.statSync(path.join(pkgDir, ver)).isDirectory());

        for (const ver of versions) {
            const fullPkgPath = path.join(pkgDir, ver);
            const entrypoint = parseEntrypoint(fullPkgPath);
            const filesAdded = new Set();
            const contentByPath = new Map();

            const walk = (dir, rel) => {
                fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
                    const subPath = path.join(dir, entry.name);
                    const vfsRel = rel ? `${rel}/${entry.name}` : entry.name;

                    if (entry.isDirectory()) {
                        walk(subPath, vfsRel);
                        return;
                    }

                    const raw = fs.readFileSync(subPath);
                    const data = entry.name.endsWith('.typ')
                        ? new TextEncoder().encode(raw.toString('utf8'))
                        : new Uint8Array(raw);

                    const vfsKey = `preview/${name}/${ver}/${vfsRel}`;
                    add_file(vfsKey, data);
                    filesAdded.add(vfsRel);
                    contentByPath.set(vfsRel, data);
                });
            };

            walk(fullPkgPath, '');

            if (name === 'cetz-plot' && contentByPath.has('src/chart.typ')) {
                add_file(`preview/${name}/${ver}/chart.typ`, contentByPath.get('src/chart.typ'));
                add_file(`chart.typ`, contentByPath.get('src/chart.typ'));
            }

            // Also mount chart/ and src/ files in root for imports
            if (name === 'cetz-plot') {
                for (const [rel, content] of contentByPath) {
                    if (rel.startsWith('chart/') || rel.startsWith('src/')) {
                        let modifiedContent = content;
                        if (rel.startsWith('chart/')) {
                            // Fix imports in chart files
                            const str = new TextDecoder().decode(content);
                            modifiedContent = new TextEncoder().encode(str.replace(/#import "\/src\/cetz\.typ": .*\n/g, ''));
                        }
                        add_file(rel, modifiedContent);
                    }
                }
                if (contentByPath.has('cetz.typ')) {
                    add_file(`src/cetz.typ`, contentByPath.get('cetz.typ'));
                    add_file(`cetz.typ`, contentByPath.get('cetz.typ'));
                }
            }

            // For cetz, also mount src/ in root
            if (name === 'cetz') {
                for (const [rel, content] of contentByPath) {
                    if (rel.startsWith('src/')) {
                        add_file(rel, content);
                    }
                }
            }

            for (const rel of filesAdded) {
                if (rel.startsWith('src/')) {
                    const rootRel = rel.replace(/^src\//, '');
                    if (!filesAdded.has(rootRel)) {
                        add_file(`preview/${name}/${ver}/${rootRel}`, contentByPath.get(rel));
                    }
                } else {
                    const srcRel = `src/${rel}`;
                    if (!filesAdded.has(srcRel) && (rel.endsWith('.typ') || rel === 'typst.toml')) {
                        add_file(`preview/${name}/${ver}/${srcRel}`, contentByPath.get(rel));
                    }
                }
            }

            if (name === 'cetz' && filesAdded.has('cetz_core.wasm') && !filesAdded.has('cetz-core/cetz_core.wasm')) {
                add_file(`preview/${name}/${ver}/cetz-core/cetz_core.wasm`, contentByPath.get('cetz_core.wasm'));
            }

            if (entrypoint && filesAdded.has('lib.typ')) {
                add_file(`preview/${name}/${ver}/${entrypoint}`, contentByPath.get('lib.typ'));
            }
        }
    }

const source = `
// 1. Establish the font stack globally so 'measure' always has access to Math tables
#set text(font: ("Roboto", "New Computer Modern Math"), size: 10pt)

// 2. Force all math environments to use the specific math font
#show math.equation: set text(font: "New Computer Modern Math")

#import "@preview/cetz:0.4.2"
#import "@preview/cetz-plot:0.1.3": chart

#let project(title: "", authors: (), body) = {
  set document(author: authors, title: title)
  set page(paper: "us-letter", margin: 2cm)
  
  // Use the same stack here to prevent the template from breaking the math link
  set text(font: ("Roboto", "New Computer Modern Math"), size: 11pt)
  
  align(center)[
    #block(text(weight: 700, 1.75em, title))
    #v(1em)
    #grid(
      columns: (1fr,) * calc.min(3, authors.len()),
      column-gutter: 1em,
      ..authors.map(author => align(center, strong(author)))
    )
  ]
  v(2em)
  body
}

#show: project.with(
  title: "Quarterly Performance Report",
  authors: ("Alex Rivers",),
)

== Revenue Distribution (Bar Chart)

#align(center)[
  #block(stroke: 1pt + luma(200), inset: 10pt, radius: 4pt)[
    #cetz.canvas({
      let data = (
        ("Tech", 25),
        ("Retail", 18),
        ("Health", 32),
        ("Finance", 21),
      )

      chart.barchart(
        size: (12, 6),
        data,
        bar-width: 0.7,
        x-label: "Department",
        y-label: "Revenue (USD Millions)"
      )
    })
  ]
]

#v(2em)

== Market Share (Pie Chart)

#align(center)[
 #block(stroke: 1pt + luma(200), inset: 10pt, radius: 4pt)[
    #cetz.canvas({
      // In 0.1.3, it is safest to pass data where the value is easily indexable
      let pie-data = (
        ("Tech", 25),
        ("Retail", 18),
        ("Health", 32),
        ("Finance", 21),
      )

      chart.piechart(
        pie-data,
        value-key: 1,    // Use the 2nd item (index 1) as the value
        label-key: 0,    // Use the 1st item (index 0) as the label
        radius: 2.5,
        slice-style: (blue, red, green, yellow), // Optional: set custom colors
        inner-label: (radius: 60%, content: (v, l) => text(white, weight: "bold")[#v%]),
        outer-label: (radius: 120%, content: (v, l) => l),
      )
    })
  ]
]
`;
    try {
        console.log("🎨 Compiling Chart Gallery...");
        add_file("main.typ", new TextEncoder().encode(source));
        const pdf = compile_to_pdf(source);
        fs.writeFileSync(path.join(__dirname, 'gallery.pdf'), pdf);
        console.log("🎉 SUCCESS: gallery.pdf generated.");
    } catch (err) {
        console.error("❌ Compilation Failed:");
        console.error(err);
    }
}

run();
