import {CatalogArticlesType} from "../../types/CatalogArticlesType";
import {CatalogItem} from "./CatalogItem";
import {CatalogSection} from "./CatalogSection";


const allSection = new CatalogSection({
    id: -1,
    title: 'All'
})

Object.freeze(allSection)


export class Catalog {
    articles: CatalogArticlesType
    elements: Record<CatalogItem['id'], CatalogItem>
    sections: CatalogSection[]
    currentSection: CatalogSection

    filteredItems: Record<CatalogItem['id'], CatalogItem>

    _filter: string

    constructor(c: Partial<Catalog> = {}) {
        this._filter = c._filter !== undefined ? c._filter : ''
        this.filteredItems = c.filteredItems !== undefined ? c.filteredItems : {}
        this.currentSection = c.currentSection ? c.currentSection : allSection

        this.articles = c.articles !== undefined ? c.articles : {}

        this.elements = {}
        if (c.elements !== undefined) {
            const values = Object.values(c.elements)
            if (values.length) {
                if (values[0] instanceof CatalogItem){
                    this.elements = c.elements
                } else{
                    this.elements = values.reduce<Record<CatalogItem['id'], CatalogItem>>((a, e) => {
                        a[e.id] = new CatalogItem(e)
                        return a
                    }, {})
                }
            }
        }

        this.sections = []
        if(c.sections !== undefined && c.sections.length){
            if(c.sections[0] instanceof CatalogSection){
                this.sections = c.sections
            }else{
                this.sections = [allSection, ...c.sections.map(e => new CatalogSection(e))]
            }
        }
    }


    getElementByID(id: CatalogItem['id']) {
        return this.elements[id]
    }


    getElements(ids: CatalogItem['id'][]) {
        const res: CatalogItem[] = new Array(ids.length)
        for (let i = 0; i < ids.length;i++ ) {
            const id = ids[i]
            const c = this.elements[id]
            if (c) res[i] = c
        }
        return res
    }


    getElementByArticle(article: string) {
        const elementID = this.articles[article]
        return this.elements[elementID]
    }

    setFilter(text: string) {
        this._filter = text.toLowerCase()
        if (!text) {
            this.filteredItems = {}
            return
        }

        const words = text.split(/\s+/)

        this.filteredItems = Object.values(this.elements)
            .reduce<Record<CatalogItem['id'], CatalogItem>>((a, e) => {
                const v = e.title.toLowerCase()
                if (words.every(k => v.includes(k))) a[e.id] = e
                return a
            }, {})
    }

    getFilteredItems() {
        if (!this._filter) return []
        return Object.values(this.filteredItems)
    }

    /*



     */
    getSections(){
        if(this.currentSection === allSection){
            return this.sections
        }
        return [this.currentSection]
    }

    getSectionsWithoutAll(){
        if(this.currentSection === allSection){
            return this.sections.slice(1)
        }
        return [this.currentSection]
    }

    setSection(id: CatalogSection['id']){
        this.currentSection = this.sections.find(s => s.id === id) || allSection
    }

    getCurrentSection(){
        return this.currentSection
    }

    getAllSection(){
        return allSection
    }
}