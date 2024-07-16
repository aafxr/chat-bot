export class CatalogSection{
    id: number
    items: string[]
    parent: string
    sort: string
    title: string

    constructor(s: Partial<CatalogSection> = {}) {
        this.id = s.id !== undefined ? s.id : -1
        this.items = s.items !== undefined ? s.items : []
        this.parent = s.parent !== undefined ? s.parent : ''
        this.sort = s.sort !== undefined ? s.sort : ''
        this.title = s.title !== undefined ? s.title : ''
    }
}