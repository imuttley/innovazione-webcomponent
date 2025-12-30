/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import r2wc from 'react-to-webcomponent';


import Filters from "./component/Filters";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventLogger } from "./component/EventLogger";
import { Results } from "./component/Results";
import { SearchBasic } from "./component/SearchBasic";



/* search */
const searchComponent = r2wc(SearchBasic, React, ReactDOM as any, {
  props: {
    baseurl: "string",
  }
});
customElements.define("innovazione-search", searchComponent);
/* end of search */


/* results */
const resultsComponent = r2wc(Results, React, ReactDOM as any, {
  props: {
    baseurl: "string",
  }
});
customElements.define("innovazione-results", resultsComponent);
/* end of results */


/* filter */
const filterComponent = r2wc(Filters, React, ReactDOM as any, {
  props: {
    applications: "string",
    technologies: "string",
    licenses: "string",
    trl: "string",
    showfilter: "boolean"
  }
});
customElements.define("innovazione-filter", filterComponent);
/* end of filter */


/* logger */
const eventLoggerComponent = r2wc(EventLogger, React, ReactDOM as any, {
  props: {}
});
customElements.define("innovazione-event-logger", eventLoggerComponent);
/* end of logger */

const elem = document.getElementById("root") || null;

if (elem !== null) {
  const app = (
    <StrictMode>
      <App />
    </StrictMode>
  );
  if (import.meta.hot) {
    // With hot module reloading, `import.meta.hot.data` is persisted.
    const root = (import.meta.hot.data.root ??= createRoot(elem));
    root.render(app);
  } else {
    // The hot module reloading API is not available in production.
    createRoot(elem).render(app);
  }
}