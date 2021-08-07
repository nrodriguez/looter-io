import { Mercari } from "./marketplaces/mercari";

export async function getSortedSearchResults(queryParams: string): Promise<any> {
    const mercari = new Mercari();
    const mercariResults = await mercari.search(queryParams);
    
    return {
        ...mercariResults
    }
}