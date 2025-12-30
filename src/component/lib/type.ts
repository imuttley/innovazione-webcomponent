export type classify = {
    cls: string,
    len: number,
}

export type scheda = {
    id: number,
    numeroScheda: number,
    titolo: string,
    dataUltimoAggiornamento: string,
    licenza: string,
    TLR: string,
    verticaliApplicativi: string,
    offertaTecnologica: string,
}

export type sums = {
    records: scheda[],
    categories: classify[],
    licenses: classify[],
    updates: classify[],
    tlrs: classify[],
    offtecs: classify[],
}

export type SearchResult = {
    _score?: number;
    _id: string;
    fields: {
        category: string;
        title: string;
        tags: string[];
        chunk_text: string;
    }
}

export interface formTTEC {
    scheda_num: number,
    title_it: string,
    title_en: string,
    slug_it?: string,
    slug_en?: string,
    trl?: string,
    rights?: string[],
    category?: string,
    class?: string[],
    lastupdate?: string,
    thumbs?: string[],
    jsonresource?: string,
    dipt: string,
}
