import {CatalogArticlesType} from "../../types/CatalogArticlesType";
import {CatalogItem} from "./CatalogItem";
import {CatalogSection} from "./CatalogSection";

export class Catalog {
    articles: CatalogArticlesType
    elements: Record<CatalogItem['id'], CatalogItem>
    sections: CatalogSection[]

    constructor(c: Partial<Catalog> = {}) {
        this.articles = c.articles !== undefined ? c.articles : {}
        this.elements = c.elements !== undefined
            ? Object.entries(c.elements).reduce<Record<CatalogItem['id'], CatalogItem>>((a, [id, e]) => {
                a[id] = new CatalogItem(e)
                return a
            }, {})
            : {}
        this.sections = c.sections !== undefined ? c.sections.map(e => new CatalogSection(e)) : []
    }

    getElements(ids: CatalogItem['id'][]) {
        const res: CatalogItem[] = []
        for (const id of ids) {
            const c = this.elements[id]
            if (c) res.push(c)
        }
        return res
    }

    getElementByArticle(article: string) {
        const elementID = this.articles[article]
        return this.elements[elementID]
    }
}