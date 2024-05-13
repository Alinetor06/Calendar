// DataFetcher.ts

import { Visita } from '../config/Visite';

export const getData = async (url: string, options?: RequestInit): Promise<Visita[]> => {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
        throw error;
    }
};

