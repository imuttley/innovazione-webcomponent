export const extractSchedanum = (text: string): number => {
    const parts: string[] | null = text.match('^TTEC_([0-9]+)_([0-9]+)');
    const docid: string = parts![1]!;
    return parseInt(docid);
}

export const timeAgo = (datestr: string): string => {
    const date: Date = new Date(datestr);

    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 4) {
        return date.toLocaleDateString();
    }
    if (weeks > 0) {
        return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    }
    if (days > 0) {
        return days === 1 ? "1 day ago" : `${days} days ago`;
    }
    if (hours > 0) {
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    }
    if (minutes > 0) {
        return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    }
    return "just now";
}


/**
 * Normalizza un array di numeri (float o int) utilizzando la tecnica Min-Max.
 * I valori risultanti saranno scalati nel range [0, 1].
 * * Formula: (x - min) / (max - min)
 * * @param data - L'array di numeri da normalizzare
 * @returns Un nuovo array con i valori normalizzati
 */
export function normalizeArray(data: number[], mult?: number): number[] {
    // 1. Controllo base: se l'array è vuoto o ha un solo elemento
    if (data.length === 0) {
        return [];
    }
    if (data.length === 1) {
        return [1.0]; // Un solo elemento è considerato il massimo (1.0) o neutro
    }
    if (mult === undefined)
        mult = 1.0;
    // 2. Troviamo il Minimo e il Massimo nell'array
    // Usiamo lo spread operator (...) che è efficiente per array di dimensioni standard
    let min = Math.min(...data);
    let max = Math.max(...data);

    // Per array molto grandi (milioni di elementi), è meglio un loop per evitare stack overflow:
    /*
    let min = Infinity;
    let max = -Infinity;
    for (const val of data) {
        if (val < min) min = val;
        if (val > max) max = val;
    }
    */

    // 3. Calcoliamo il range (differenza)
    const range = max - min;

    // 4. Gestione caso limite: Divisione per Zero
    // Se min e max sono uguali, tutti i numeri nell'array sono uguali.
    if (range === 0) {
        // Restituiamo un array di 0 (o 0.5 o 1 a seconda della logica di business desiderata)
        return data.map(() => mult);
    }

    // 5. Applichiamo la formula di normalizzazione
    return data.map(val => mult * ((val - min) / range));
}

/* @param lowerRest - Se true (default), converte il resto della stringa in minuscolo (es: "CIAO" -> "Ciao").
 * Se false, lascia il resto invariato (es: "CIAO" -> "CiaO" se prima era "ciaO").
 * @returns La stringa con la prima lettera maiuscola.
 */
export function capitalize(str: string, lowerRest: boolean = true): string {
    if (!str) return '';

    const firstLetter = str.charAt(0).toUpperCase();
    const rest = lowerRest ? str.slice(1).toLowerCase() : str.slice(1);

    return firstLetter + rest;
}

/**
 * Capitalizza la prima lettera di ogni parola in una frase (Title Case).
 * * @param str - La frase di input.
 * @returns La frase con ogni parola capitalizzata.
 */
export function capitalizeWords(str: string): string {
    if (!str) return '';

    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}



export const nameFamilynameDipt = (inputstr: string) => {

    const regex = /^(?<nameFamilyname>[a-zA-Z-\.\s']+)[ ]+-[ ]+(?<dipt>[^ ]+)$/;

    const match = inputstr.match(regex);

    if (match && match.groups) {
        const { nameFamilyname, dipt } = match.groups;
        return { nameFamilyname: capitalizeWords(nameFamilyname!.trim()), dipt: dipt!.trim() };
    }

    return { nameFamilyname: "", dipt: "" };
}

export const isNonEmptyString = (value: unknown): value is string => {
    return typeof value === 'string' && value.trim().length > 0;
};

/**
 * Converte una stringa dal formato "Cognome, Nome" al formato "N. COGNOME".
 * * @param fullInput - La stringa in input (es. "Rossi, Mario")
 * @returns La stringa formattata (es. "M. ROSSI") o null se il formato non è valido.
 */
export function formatItalianName(fullInput: string): string | null {
    // Controllo base se la stringa è vuota o non contiene la virgola
    if (!fullInput || !fullInput.includes(',')) {
        console.error(`Formato non valido per l'input: "${fullInput}"`);
        return null;
    }

    // Dividiamo la stringa in due parti usando la virgola come separatore
    const parts = fullInput.split(',');

    // Assicuriamoci di avere almeno due parti
    if (parts.length < 2) {
        return null;
    }

    // Estraiamo cognome (prima parte) e nome (seconda parte)
    // .trim() rimuove gli spazi bianchi iniziali e finali indesiderati
    const rawSurname = parts[0]!.trim();
    const rawName = parts[1]!.trim();

    // Controllo se una delle due parti è vuota dopo il trim
    if (rawSurname.length === 0 || rawName.length === 0) {
        return null;
    }

    // 1. Formattiamo il Cognome: tutto in maiuscolo
    const formattedSurname = rawSurname.toUpperCase();

    // 2. Formattiamo il Nome: prendiamo la prima lettera, la rendiamo maiuscola e aggiungiamo il punto
    const nameInitial = rawName.charAt(0).toUpperCase();

    // Combiniamo il risultato
    return `${nameInitial}. ${formattedSurname}`;
}
