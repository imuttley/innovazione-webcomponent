# Web Components "innovazione" for ENEA

a smart web component for ENEA to search and filter TECs (Technical and Engineering Competencies) and show results

the main idea is to use webcomponents with integrate logics, to create a search and filter system for TECs (Technical and Engineering Competencies) and show results in a grid on a custom html page, using public APIs of ENEA, with a frontend only approach and a semantic enriched html page.

Authoring of webcomponents is done with react and typescript ( TODO migrate to react uikit from [designers-italia.it](https://github.com/italia/design-react-kit/) ), and the build process is done with bun.
Data is fetched from public APIs of ENEA for managing autority of produced data.

## Features

- search and filter TECs (Technical and Engineering Competencies) and show results in a grid on a custom html page
- manage events and states with custom events and custom elements
- use tailwindcss for styling
- use react and typescript for authoring
- use bun for build process
- use authorized public APIs of ENEA for managing autority of produced data

## ide

vscode with antigravity extension

## Installation

load and use webcomponents in a semantic enriched html

```html
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Test innovazione-webcomp</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/imuttley/innovazione-webcomponent@latest/dist/innovazione-webcomp.css"
    />
    <script
      type="module"
      crossorigin
      src="https://cdn.jsdelivr.net/gh/imuttley/innovazione-webcomponent@latest/dist/innovazione-webcomp.js"
    ></script>
  </head>
  <body>
    <!-- ... -->
    <!-- search events innovazione-search for data source -->
    <section id="search-bar">
      <div class="container h-150">
        <innovazione-search
          baseurl="https://ricerca-innovazione.enea.it"
        ></innovazione-search>
      </div>
    </section>
    <!-- ... -->

    <!-- ... -->
    <section id="pdf-render">
      <div class="container h-50">
        <innovazione-pdf-button id="8740"></innovazione-pdf-button>
      </div>
    </section>
    <!-- ... -->

    <!-- results events innovazione-results for click -->
    <section id="results-list">
      <div class="container h-400">
        <innovazione-results
          baseurl="https://ricerca-innovazione.enea.it"
        ></innovazione-results>
      </div>
    </section>

    <!-- ... -->
    <section id="event-logger">
      <div class="container h-50">
        <innovazione-event-logger></innovazione-event-logger>
      </div>
    </section>
    <!-- ... -->
  </body>
</html>
```

## specs italian version

[specs](./COMPONENTS.md)

## security aspect

the webcomponents are loaded from a global cdn, and rendered in client side, more that, the data is fetched from public apis of ENEA with a backend API gateway with policies of authorization and rate limiting.
CORS policies are set to allow only the origin where webcomponents are loaded. es: https://localhost:3000/ or https://generic-site.it/

## examples

- [examples](./examples)
- [static-en](https://imuttley.github.io/innovazione-webcomponent/pure-static-en.html)
- [static-it](https://imuttley.github.io/innovazione-webcomponent/pure-static-it.html)
- [rebrand-designer-italia-kit multilingual](https://imuttley.github.io/innovazione-webcomponent/rebrand-designer-italia-kit.html)

## TODO

- add zero-trust reserved access
- add bootstrap css from [bootstrap-italia](https://italia.github.io/bootstrap-italia/)
- add more features

## License

BSD 3-Clause License
