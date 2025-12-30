import type { scheda, SearchResult } from "../lib/type";

export interface FilterEventInterface {
    appselected: string[];
    licselected: string[];
    otselected: string[];
    minmax: { min: number, max: number };
}

export interface SearchEventInterface {
    records: { total: number, start: number };
    query: string;
    found: SearchResult[];
}

export interface ResultsEventInterface {
    documentSelected: string;
}

export class FilterEvent extends Event {
    #filterEvent: FilterEventInterface;

    constructor(filterEvent: FilterEventInterface) {
        super("innovazione-filterEvent");
        this.#filterEvent = filterEvent;
    }

    get filterEvent(): FilterEventInterface {
        return this.#filterEvent;
    }
}

export class SearchEvent extends Event {
    #searchEvent: SearchEventInterface;

    constructor(searchEvent: SearchEventInterface) {
        super("innovazione-searchEvent");
        this.#searchEvent = searchEvent;
    }

    get searchEvent(): SearchEventInterface {
        return this.#searchEvent;
    }
}

export class ResultsEvent extends Event {
    #resultsEvent: ResultsEventInterface;

    constructor(resultsEvent: ResultsEventInterface) {
        super("innovazione-resultsEvent");
        this.#resultsEvent = resultsEvent;
    }

    get resultsEvent(): ResultsEventInterface {
        return this.#resultsEvent;
    }
}