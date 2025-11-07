# vue function plotter

A Vue 3 + TypeScript graph plotting application with interactive canvas features, built for learning and experimenting with modern frontend technologies and mathematical visualizations.

## About

This is a graph plotting application that allows users to create, visualize, and interact with mathematical functions and data plots. Built with Vue 3 and enhanced with canvas graphics capabilities using Konva, it provides an intuitive interface for mathematical visualization and exploration.

## Technologies Used

- **Vue 3** (3.5.22) - Progressive JavaScript framework
- **TypeScript** (5.9.0) - Typed superset of JavaScript
- **Vuetify** (3.9.0-beta.1) - Material Design UI framework for Vue
- **Pinia** (3.0.3) - Store for state management
- **Vue Router** (4.6.3) - Official router for Vue
- **Konva** (10.0.8) - 2D graphics library for canvas rendering
- **MathJS** (15.1.0) - Mathematical computations and expression parsing
- **Vite** (7.1.11) - Fast build tool
- **Vitest** (3.2.4) - Unit testing framework
- **Playwright** (1.56.1) - End-to-end testing framework

## Features

- 📊 **Graph Plotting** - Plot mathematical functions and data sets
- 🎨 **Interactive Canvas** - Zoom, pan, and interact with graphs using Konva
- 🧮 **Mathematical Engine** - Parse and evaluate expressions with MathJS
- ⚙ Dynamic component loading - see useDynamicComponent
- 🛠 Bundle building with Vite
- ⚡️ **Vite** - Fast build tool and dev server
- 🎯 **TypeScript** - Type safety and better developer experience
- 📱 **Responsive Design** - Material Design components with Vuetify
- 📦 **State Management** - Intuitive state management with Pinia
- 🛣️ **Routing** - Client-side routing with Vue Router
- 🧪 **Testing** - Unit tests with Vitest, E2E with Playwright
- 🎪 **Canvas Graphics** - High-performance 2D graphics rendering

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- **Chromium-based browsers** (Chrome, Edge, Brave, etc.):
    - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
    - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- **Firefox**:
    - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
    - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup


```sh npm install```


### Compile and Hot-Reload for Development

```sh npm run dev```
               
### Compile and Minify for Production

```sh
  npm run build:default
```

### Compile and Bundle all for Production

```sh
  npm run build:bundle
 ```


### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
  npm run test:unit
```


### Run End-to-End Tests with [Playwright](https://playwright.dev)

#### Install browsers for the first run
```npx playwright install```

#### When testing on CI, must build the project first
```npm run build```

#### Runs the end-to-end tests
```npm run test:e2e```
#### Runs the tests only on Chromium
```npm run test:e2e -- --project=chromium```
#### Runs the tests of a specific file
```npm run test:e2e -- tests/example.spec.ts```
#### Runs the tests in debug mode
```npm run test:e2e -- --debug```



## Project Structure
```


src/
├── components/     # Reusable Vue components (graph controls, UI elements)
├── views/         # Main pages/views (graph plotter, settings)
├── router/        # Route configuration
├── stores/        # Pinia stores for graph data and application state
├── assets/        # Static assets (images, styles)
├── utils/         # Utility functions for mathematical operations
└── main.ts        # Application entry point
```

# Usage

* Function Plotting: Enter mathematical expressions (e.g., x^2, sin(x), cos(x) + 2)


# License
This project is licensed under the MIT License.
