import {CatalogArticlesType} from "../../types/CatalogArticlesType";
import {CatalogItem} from "./CatalogItem";
import {CatalogSection} from "./CatalogSection";

export class Catalog {
    articles: CatalogArticlesType
    elements: Record<CatalogItem['id'], CatalogItem>
    sections: CatalogSection[]

    filteredItems: Record<CatalogItem['id'], CatalogItem>

    _filter: string

    constructor(c: Partial<Catalog> = {}) {
        this._filter = c._filter !== undefined ? c._filter : ''
        this.filteredItems = c.filteredItems !== undefined ? c.filteredItems : {}

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

    setFilter(text: string) {
        this._filter = text.toLowerCase()
        if(!text) {
            this.filteredItems = {}
            return
        }

        this.filteredItems = Object.values(this.elements)
            .reduce<Record<CatalogItem['id'], CatalogItem>>((a, e) => {
                if (e.title.toLowerCase().includes(this._filter)) a[e.id] = e
                return a
            }, {})
    }

    getFilteredItems(){
        if(!this._filter) return []
        return Object.values(this.filteredItems)
    }
}