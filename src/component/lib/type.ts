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

/* workaround for dictionary on functions calls */

// Definizione per la sezione 'home'
type HomeTranslations = {
    search: string;
};

// Definizione per la sezione 'layout'
type LayoutTranslations = {
    enea: string;
    followus: string;
    altlogo: string;
    alttwitter: string;
    altfb: string;
    altX: string;
    altLinked: string;
    altInsta: string;
};

// Definizione per la sezione 'error'
type ErrorTranslations = {
    "not-found": string; // Le chiavi con trattini richiedono le virgolette
};

// Definizione per la sezione 'scheda'
type SchedaTranslations = {
    back: string;
    description: string;
    problem: string;
    sectors: string;
    TRL: string;
    date: string;
    TRLtext: string;
    force: string;
    advantages: string;
    applications: string;
    personnel: string;
    license: string;
};

// Definizione per la sezione 'head'
type HeadTranslations = {
    dipt: string;
    title: string;
    subtitle: string;
    backtohome: string;
    backtosearch: string;
    admintitle: string;
};

// Definizione per la sezione 'footer'
type FooterTranslations = {
    bottomsection: {
        title: string;
        subtitle: string;
    };
    copy: string;
};

// Definizione per la sezione 'slideTRL'
type SlideTRLTranslations = {
    label: string;
    minlabel: string;
    maxlabel: string;
};

// Definizione per la sezione 'piechart'
type PiechartTranslations = {
    label: string;
    magicalt: string;
};

// Definizione per la sezione 'verticalSlider'
type VerticalSliderTranslations = {
    title: string;
    upbutton: string;
    downbutton: string;
};

// Definizione per la sezione 'search'
type SearchTranslations = {
    filteralt: string;
    label: string;
    wait: string;
    suggestedLabel: string;
    textPlaceholder: string;
    description: string;
    showall: string;
    suggested: string[]; // Questo è un array di stringhe
    clearfilters: string;
    searchfilters: string;
};

// Definizione per la sezione 'status'
type StatusTranslations = {
    empty: string;
};

/**
 * Tipo principale che aggrega tutte le sezioni
 * del file JSON delle traduzioni.
 */
export type AppTranslations = {
    home: HomeTranslations;
    layout: LayoutTranslations;
    error: ErrorTranslations;
    scheda: SchedaTranslations;
    head: HeadTranslations;
    footer: FooterTranslations;
    slideTRL: SlideTRLTranslations;
    piechart: PiechartTranslations;
    verticalSlider: VerticalSliderTranslations;
    search: SearchTranslations;
    status: StatusTranslations;
};


/**
 * Rappresenta la struttura principale dell'oggetto scheda.
 */
export interface SchedaData {
    risultato: boolean;
    proprietario: string;
    descrizioneStatoScheda: string;
    base: Base;
    numRighe: number;
    basePersonale: Personale[];
    numRighePersonale: number;
    baseFoto: Foto[];
    numRigheFoto: number;
    baseLink: Link[];
    numRigheLink: number;
    elencoPuntiForDeb: PuntoForDeb[];
    numRigheElencoPuntiForDeb: number;
    base_D12_BP: BulletPoint[];
    numRighe_D12_BP: number;
    base_D13_BP: BulletPoint[];
    numRighe_D13_BP: number;
    base_D30_32_34_BP: BulletPoint[]; // indica i bullet point per aspetti innovativi e vantaggi
    numRighe_D30_32_34_BP: number;
    base_D31_33_35_BP: BulletPoint[]; // indica i bullet point per aspetti innovativi e vantaggi in inglese
    numRighe_D31_33_35_BP: number;
    contenutoPuntiForDeb: string[];
    contenutoVA: VociApplicazione[];
    contenutoNumVA: number;
    msgErrore: string;
    indicePadre: number;
}

/**
 * Rappresenta la struttura dei dati di base della scheda.
 */
export interface Base {
    id: number | null;
    d2_ReferenteScientifico: string;
    d5_unita: string;
    d8_tipoOffertaTecnologica: string;
    d9_titolo: string;
    d10_titoloENG: string;
    d11_altro: string;
    d14_16_18_descrizioneProblema: string;
    d15_17_19_descrizioneProblemaENG: string;
    d23_25_27_descrizioneTecnologia: string;
    d24_26_28_descrizioneTecnologiaENG: string;
    d23_abstract: string;
    d24_abstractENG: string;
    d46_disponibilePrototipo: string;
    d49_disponibileLicenza: string;
    d53_TLR: string;
    d100_dataUltimoAggiornamento: string;
    d29_1: string;
    d29_2: string;
    d29_3: string;
    d29_4: string;
    d29_5: string;
    d29_6: string;
    d29_7: string;
    d29_8: string;
    d29_9: string;
    d29_10: string;
    d29_11: string;
    d29_12: string;
    d29_13: string;
    d29_14: string;
    d29_15: string;
}

/**
 * Rappresenta la struttura di un singolo membro del personale.
 */
export interface Personale {
    CF: string;
    personaleImpiegato: string;
    unita: string;
    sede: string;
}

/**
 * Rappresenta la struttura di una singola fotografia allegata.
 */
export interface Foto {
    id: number;
    didascaliaFoto: string;
    didascaliaFotoENG: string;
    nomeFoto: string;
    stato: string;
    /**
     * Contiene i dati dell'immagine in formato Base64.
     */
    foto: string;
    mime: string;
}

/**
 * Rappresenta la struttura di un link.
 */
export interface Link {
    id: number;
    descrizioneLink: string;
    link: string;
    stato: string;
}

/**
 * Rappresenta la struttura di un punto di forza o debolezza.
 */
export interface PuntoForDeb {
    punto: string;
    point: string;
}

/**
 * Rappresenta la struttura di un bullet point.
 */
export interface BulletPoint {
    id: number;
    bulletPoint: string;
    stato: string;
}

/**
 * Rappresenta le voci di applicazione.
 */
export interface VociApplicazione {
    ITA: string;
    ENG: string;
}
