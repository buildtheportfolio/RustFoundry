# Rust Foundry

A hub for focused, self-contained Rust projects covering systems programming, performance, memory safety, networking, WebAssembly, and developer tooling.

## Structure

```text
RustFoundry/
├── index.html
├── style.css
├── script.js
├── Ideas.md
└── projects/
    ├── _template/
    │   ├── Cargo.toml
    │   ├── README.md
    │   └── src/main.rs
    └── ...
```

The hub discovers project folders under `projects/` automatically. A folder is listed when it contains `Cargo.toml`; `_template` is always excluded.

## Add a project

1. Copy `projects/_template/` to a URL-safe folder.
2. Rename the package in `Cargo.toml`.
3. Build a focused idea from `Ideas.md`.
4. Run `cargo run` and `cargo test`.
5. Push the folder. No registry update is needed.

## Project rules

- One project per directory, independently runnable and testable.
- Use Cargo, stable Rust, and the 2024 edition.
- Prefer the standard library; justify external crates.
- Keep unsafe Rust isolated and explain its safety invariants.
- Keep project assets and documentation local to each project.
- Deployment is manual. No GitHub Actions are required.
