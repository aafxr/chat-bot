import {CatalogItem} from "./CatalogItem";
import {ProductDetails} from "./ProductDetails";
import {Catalog} from "./Catalog";
import {Company} from "./Company";

export class Basket {
    comment: string
    _items: Map<BasketDetail['id'], BasketDetail>

    company: Company | null

    constructor(b: Partial<Basket> = {}) {
        this._items = new Map()
        this.comment = b.comment || ''
        this.company = b.company || null

        if (b.items) {
            for (const item of b.items) {
                this._items.set(item.id, new BasketDetail(item))
            }
        }
    }

    get items() {
        return Array.from(this._items.values())
    }

    /**
     * сумма заказа
     */
    sum(c: Catalog) {
        let s = 0
        for (const item of Array.from(this._items.values())) {
            const p = window.parseFloat(c.getElementByID(item.id)?.price) || 0
            s += p
        }
        return s
    }

    get length() {
        return this._items.size
    }


    /**
     * добавляет товар если его нет, или обновляет количество товара в корзине
     * @param p
     * @param pd
     * @param quantity
     */
    setProduct(p: CatalogItem, pd: ProductDetails, quantity: number) {
        if (quantity <= 0) return false
        let bd: BasketDetail | undefined
        bd = this._items.get(p.id)
        if (bd) {
            bd.setCount(quantity)
            return
        }

        const packUnitQuantity = parseFloat(pd.PackUnitQuantity)
        bd = new BasketDetail({
            id: p.id,
            packMeasure: pd.PackUnitMeasure,
            measure: pd.UnitOfMeasure,
            title: p.title,
            price: p.price,
            packUnitQuantity
        })

        bd.setCount(quantity)

        this._items.set(bd.id, bd)

        return true
    }

    setBasketDetail(bd: BasketDetail) {
        this._items.set(bd.id, bd)
    }

    /**
     * удаляет продукт из корзины
     * @param p
     */
    removeProduct(p: CatalogItem) {
        return this._items.delete(p.id)
    }


    get totalPrice() {
        let sum = 0
        for (const item of this.items) {
            sum += item.positionPrice
        }
        return sum
    }


    getDetails(p: CatalogItem) {
        return this._items.get(p.id)
    }
}


export class BasketDetail {
    id: CatalogItem['id']
    title: CatalogItem['title']
    count: number
    price: CatalogItem['price']
    measure: ProductDetails['PackUnitMeasure']
    packCount: number
    packUnitQuantity: number
    packMeasure: ProductDetails['PackUnitMeasure']

    constructor(bd: Partial<BasketDetail> = {}) {
        this.id = bd.id !== undefined ? bd.id : ''
        this.title = bd.title !== undefined ? bd.title : ''
        this.count = bd.count !== undefined ? bd.count : 0
        this.price = bd.price !== undefined ? bd.price : '0.00'
        this.measure = bd.measure !== undefined ? bd.measure : ''
        this.packCount = bd.packCount !== undefined ? bd.packCount : 0
        this.packUnitQuantity = bd.packUnitQuantity !== undefined ? bd.packUnitQuantity : 0
        this.packMeasure = bd.packMeasure !== undefined ? bd.packMeasure : ''
    }

    setCount(c: number) {
        this.count = +(c * this.packUnitQuantity).toFixed(3)
        this.packCount = c
    }

    get positionPrice() {
        return this.count * (+this.price) || 0
    }
}