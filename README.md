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
    <script type="module" crossorigin src="https://jsdelivr.net/gh/imuttley/innovazione-webcomp@latest/dist/innovazione-webcomp.js"></script>
    <link rel="stylesheet" href="https://jsdelivr.net/gh/imuttley/innovazione-webcomp@latest/dist/innovazione-webcomp.css">
    <!-- ... -->
<body>
    <!-- ... -->
    <!-- search events innovazione-search for data source -->
    <innovazione-search baseurl="https://ricerca-innovazione.enea.it"></innovazione-search>
    <!-- ... -->
    <!-- results events innovazione-results for click -->
    <innovazione-results id="resultsid" baseurl="https://ricerca-innovazione.enea.it"></innovazione-results>
    <!-- ... -->
    <innovazione-event-logger></innovazione-event-logger>
    <!-- ... -->
</body>
</html>
```
