import {CatalogArticlesType} from "../../types/CatalogArticlesType";
import {CatalogItem} from "./CatalogItem";
import {CatalogSection} from "./CatalogSection";

export class Catalog{
    articles: CatalogArticlesType
    elements: CatalogItem[]
    sections: CatalogSection[]

    constructor(c: Partial<Catalog> = {}) {
        this.articles = c.articles !== undefined ? c.articles : {}
        this.elements = c.elements !== undefined ? c.elements.map(e => new CatalogItem(e)) : []
        this.sections = c.sections !== undefined ? c.sections.map(e => new CatalogSection(e)) : []
    }
}