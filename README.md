# Web Components "innovazione" for ENEA

a smart web component for ENEA to search and filter TECs (Technical and Engineering Competencies) and show results

the main idea is to use webcomponents to create a smart search and filter system for TECs (Technical and Engineering Competencies) and show results in a grid on a custom html page, without any backend or database but using only public APIs of ENEA, with a frontend only approach and a semantic enriched html page, managing events and states with custom events and custom elements, and using tailwindcss for styling.
Authoring of webcomponents is done with react and typescript, and the build process is done with bun.
Data is fetched from authorized public APIs of ENEA for managing autority of produced data.

## Installation

load and use webcomponents in a semantic enriched html

```html
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test innovazione-webcomp</title>
</head>
<body>
    <!-- ... -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/imuttley/innovazione-webcomponent@latest/dist/innovazione-webcomp.css">
    <script type="module" crossorigin src="https://cdn.jsdelivr.net/gh/imuttley/innovazione-webcomponent@latest/dist/innovazione-webcomp.js"></script>
    <!-- ... -->
<body>

    <!-- ... -->
    <!-- search events innovazione-search for data source -->
    <section id="search-bar">
        <div class="container h-150">
            <innovazione-search baseurl="https://ricerca-innovazione.enea.it"></innovazione-search>
        </div>
    </section>
    <!-- ... -->

    <!-- results events innovazione-results for click -->
    <section id="results-list">
        <div class="container h-400">
            <innovazione-results baseurl="https://ricerca-innovazione.enea.it"></innovazione-results>
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
