use wasm_bindgen::prelude::*;
use typst::diag::FileResult;
use typst::text::{Font, FontBook};
use typst::utils::LazyHash;
use typst::syntax::{Source, FileId, VirtualPath};
use typst::World;
use typst::Library;
use typst::foundations::{Bytes, Datetime}; 
use std::collections::HashMap;
use std::sync::Mutex;
use once_cell::sync::Lazy;

static FONT_HOLDER: Lazy<Mutex<Vec<Font>>> = Lazy::new(|| Mutex::new(Vec::new()));
static FILE_HOLDER: Lazy<Mutex<HashMap<String, Bytes>>> = Lazy::new(|| Mutex::new(HashMap::new()));

pub struct WasmWorld {
    library: LazyHash<Library>,
    book: LazyHash<FontBook>,
    source: Source,
}

impl WasmWorld {
    pub fn new(text: &str) -> Self {
        let fonts = FONT_HOLDER.lock().unwrap();
        let main_id = FileId::new(None, VirtualPath::new("main.typ"));
        
        Self {
            library: LazyHash::new(Library::default()),
            book: LazyHash::new(FontBook::from_fonts(fonts.iter())),
            source: Source::new(main_id, text.to_string()),
        }
    }
}

/// Standardizes FileId into a clean HashMap key: "namespace/name/version/path"
fn get_vfs_key(id: FileId) -> String {
    let vpath = id.vpath().as_rootless_path().to_string_lossy();
    let key = match id.package() {
        Some(pkg) => format!("{}/{}/{}/{}", pkg.namespace, pkg.name, pkg.version, vpath),
        None => vpath.into_owned(),
    };

    key.replace("\\", "/").replace("//", "/").trim_matches('/').to_string()
}

impl World for WasmWorld {
    fn library(&self) -> &LazyHash<Library> { &self.library }
    fn book(&self) -> &LazyHash<FontBook> { &self.book }
    fn main(&self) -> FileId { self.source.id() }
    
    fn source(&self, id: FileId) -> FileResult<Source> { 
        if id == self.source.id() { return Ok(self.source.clone()); }

        let path = get_vfs_key(id);
        let files = FILE_HOLDER.lock().unwrap();
        
        if let Some(bytes) = files.get(&path) {
            let text = std::str::from_utf8(bytes)
                .map_err(|_| typst::diag::FileError::InvalidUtf8)?;
            Ok(Source::new(id, text.to_string()))
        } else {
            // Logs to your terminal for debugging mismatches
            println!("❌ VFS MISSING: Requested Key ['{}']", path);
            Err(typst::diag::FileError::NotFound(id.vpath().as_rootless_path().to_path_buf()))
        }
    }
    
    fn file(&self, id: FileId) -> FileResult<Bytes> {
        let path = get_vfs_key(id);
        let files = FILE_HOLDER.lock().unwrap();
        if let Some(bytes) = files.get(&path) {
            Ok(bytes.clone())
        } else {
            println!("❌ VFS FILE MISSING: Requested Key ['{}']", path);
            Err(typst::diag::FileError::NotFound(id.vpath().as_rootless_path().to_path_buf()))
        }
    }

    fn font(&self, index: usize) -> Option<Font> {
        FONT_HOLDER.lock().unwrap().get(index).cloned()
    }
    
    fn today(&self, _: Option<i64>) -> Option<Datetime> {
        Datetime::from_ymd(2026, 4, 9)
    }
}

#[wasm_bindgen]
pub fn add_file(path: &str, data: &[u8]) {
    let mut files = FILE_HOLDER.lock().unwrap();
    // Ensure keys registered from JS are also cleaned
    let clean_path = path.replace("\\", "/").replace("//", "/").trim_matches('/').to_string();
    files.insert(clean_path, Bytes::new(data.to_vec()));
}

#[wasm_bindgen]
pub fn add_font(data: &[u8]) {
    let bytes = Bytes::new(data.to_vec());
    if let Some(font) = Font::iter(bytes).next() {
        FONT_HOLDER.lock().unwrap().push(font);
    }
}

#[wasm_bindgen]
pub fn compile_to_pdf(text: &str) -> Result<Vec<u8>, JsValue> {
    let world = WasmWorld::new(text);
    match typst::compile(&world).output {
        Ok(doc) => {
            let pdf = typst_pdf::pdf(&doc, &typst_pdf::PdfOptions::default())
                .map_err(|e| JsValue::from_str(&format!("PDF Error: {:?}", e)))?;
            Ok(pdf)
        },
        Err(err) => Err(JsValue::from_str(&format!("Typst Error: {:?}", err))),
    }
}