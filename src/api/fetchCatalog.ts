import aFetch from "../axios";
import {CatalogArticlesType} from "../types/CatalogArticlesType";
import {CatalogItem} from "../core/classes/CatalogItem";
import {CatalogSection} from "../core/classes/CatalogSection";

export type FetchCatalogResponse = {
    articles: CatalogArticlesType
    elements: Record<string, CatalogItem>
    sections: CatalogSection[]
}

export async function fetchCatalog(){
    const response = await aFetch.get<FetchCatalogResponse>('/api/telegram/')
    if(response.status === 200){
        return response.data
    }
}