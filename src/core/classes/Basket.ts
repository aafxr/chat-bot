import {CatalogItem} from "./CatalogItem";
import {ProductDetails} from "./ProductDetails";
import {Catalog} from "./Catalog";

export class Basket{
    comment: string
    _items: Map<BasketDetail['id'], BasketDetail>

    constructor(b: Partial<Basket> = {}) {
        this._items = new Map()
        this.comment = b.comment || ''

        if(b.items){
            for(const item of b.items){
                this._items.set(item.id, new BasketDetail(item))
            }
        }
    }

    get items(){
        return Array.from(this._items.values())
    }

    /**
     * сумма заказа
     */
    sum(c: Catalog){
        let s = 0
        for(const item of Array.from(this._items.values())) {
            const p = window.parseFloat(c.getElementByID(item.id)?.price) || 0
            s += p
        }
        return s
    }

    get length(){
        return this._items.size
    }

}



export class BasketDetail{
    id: CatalogItem['id']
    title: CatalogItem['title']
    count: number
    measure: ProductDetails['PackUnitMeasure']
    packCount: number
    packMeasure: ProductDetails['PackUnitMeasure']

    constructor(bd: Partial<BasketDetail> = {}) {
        this.id             = bd.id !== undefined ? bd.id : ''
        this.title          = bd.title !== undefined ? bd.title : ''
        this.count          = bd.count !== undefined ? bd.count : 0
        this.measure        = bd.measure !== undefined ? bd.measure : ''
        this.packCount      = bd.packCount !== undefined ? bd.packCount : 0
        this.packMeasure    = bd.packMeasure !== undefined ? bd.packMeasure : ''
    }
}