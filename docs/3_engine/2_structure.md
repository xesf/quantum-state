---
title: Engine Structure
layout: home
nav_order: 3
permalink: /engine/structure/
parent: Engine
---

# Engine Structure
{: .no_toc }

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Introduction

The Project is structured to facilitate the development of an action-adventure game using WebGPU and vanilla JavaScript. The engine is modular and uses ES6 modules for better organization and maintainability with a core restriction on having no external dependencies. The code follows functional programming principles and is designed to be easily extensible or even converted to a different programming language if needed, like C or Rust (probably not going to happen).

## Folder Structure

```plaintext
quantum-state/
├── src/
│   ├── core/
│   │   ├── camera.mjs
│   │   ├── game.mjs
│   │   ├── input.mjs
│   │   ├── object.mjs
│   │   ├── perspective-camera.mjs
│   │   ├── renderer.mjs
│   │   ├── ui.mjs
│   ├── math/
│   │   ├── matrix.mjs
│   │   ├── quaternion.mjs
│   │   ├── utils.mjs
│   │   ├── vector.mjs
│   ├── shaders/
│   │   ├── phong.wgsl
│   │── game/
│   │   ├── index.mjs
│   │── index.html
│   ├── manifest.json
│   ├── quantum-state.mjs
```

## Code Conventions

1. **File Naming**: Use kebab-case for file names (e.g., `my-module.mjs`).
2. **Folder Structure**: Follow the established folder structure for new files and modules.
3. **Code Style**: Adhere to the project's coding style guidelines, including indentation, spacing, and commenting.
4. **Documentation**: Document all public functions and modules using JSDoc comments.
5. **Error Handling**: console.error/warn/debug should be used for error handling and debugging purposes that will be capture by the engine.

