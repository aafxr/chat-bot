import {Product} from "./Product";
import {ProductDetails} from "./ProductDetails";
import {Catalog} from "./Catalog";
import {Company} from "./Company";
import {AppUser} from "./AppUser";

/**
 * сущность представляет корзину пользователя
 */
export class Basket {
    /** карта с основными храктеристиками продуктов в корзине */
    _items: Map<BasketDetail['id'], BasketDetail>

    /** комментарий к заказу */
    comment: string
    /** ид заказчика */
    userId: AppUser['id']
    /** номер телефрна заказчика */
    userPhone: AppUser['phone']
    /** ид компании */
    companyID: Company['id']
    /** прикрепленная компания*/
    company: Company | null

    constructor(b: Partial<Basket> = {}) {
        this._items = new Map()
        this.comment = b.comment || ''
        this.company = b.company || null

        this.userId = b.userId !== undefined ? b.userId : 0
        this.userPhone = b.userPhone !== undefined ? b.userPhone : 0
        this.companyID = b.companyID !== undefined ? b.companyID : 0

        if (b.items) {
            for (const item of b.items) {
                this._items.set(item.id, new BasketDetail(item))
            }
        }
    }

    /** массив продуктов в корзине */
    get items() {
        return Array.from(this._items.values())
    }

    /** полная сумма заказа */
    sum(c: Catalog) {
        let s = 0
        for (const item of Array.from(this._items.values())) {
            const p = window.parseFloat(c.getElementByID(item.id)?.price) || 0
            s += p
        }
        return s
    }

    /** количество позиций в заказе */
    get length() {
        return this._items.size
    }


    /**
     * добавляет продукт если его нет, или обновляет количество продукта в корзине
     * @param p
     * @param pd
     * @param quantity
     */
    setProduct(p: Product, pd: ProductDetails, quantity: number) {
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

    /** */
    setBasketDetail(bd: BasketDetail) {
        this._items.set(bd.id, bd)
    }

    /**
     * удаляет продукт из корзины
     * @param p
     */
    removeProduct(p: Product) {
        return this._items.delete(p.id)
    }


    /** полная стоимость всех позиций в корзине */
    get totalPrice() {
        let sum = 0
        for (const item of this.items) {
            sum += item.positionPrice
        }
        return sum
    }


    /**
     * позволяет получить описание позиции корзины
     * @param p продукт каталога
     */
    getDetails(p: Product) {
        return this._items.get(p.id)
    }

    /**
     *  позволяет проверить наличие позиции в корзине
     * @param id ид продукта
     */
    hasProduct(id: Product['id']){
        return this._items.has(id)
    }
}


/**
 * структура описывает продукт в корзине
 */
export class BasketDetail {
    /** ид продукта */
    id: Product['id']
    /** название продукта */
    title: Product['title']
    /** количество продукта в м2 */
    count: number
    /** цена продукта */
    price: Product['price']
    /** единица измерения продукта */
    measure: ProductDetails['PackUnitMeasure']
    /** число упаковок */
    packCount: number
    /** количество м2 в упаковке */
    packUnitQuantity: number
    /** единица измереия упаковки */
    packMeasure: ProductDetails['PackUnitMeasure']
    /** флаг указывает на то, что продукт отсутствует на складе */
    isMissing: boolean

    constructor(bd: Partial<BasketDetail> = {}) {
        this.id = bd.id !== undefined ? bd.id : ''
        this.title = bd.title !== undefined ? bd.title : ''
        this.count = bd.count !== undefined ? bd.count : 0
        this.price = bd.price !== undefined ? bd.price : '0.00'
        this.measure = bd.measure !== undefined ? bd.measure : ''
        this.packCount = bd.packCount !== undefined ? bd.packCount : 0
        this.packUnitQuantity = bd.packUnitQuantity !== undefined ? bd.packUnitQuantity : 0
        this.packMeasure = bd.packMeasure !== undefined ? bd.packMeasure : ''
        this.isMissing = bd.isMissing !== undefined ? bd.isMissing : false
    }

    /**
     * устанавливает число упаковок и пересчитыпает количество продукта пуием умножения с * packUnitQuantity
     * @param c число упаковок
     */
    setCount(c: number) {
        this.count = +(c * this.packUnitQuantity).toFixed(3)
        this.packCount = c
    }

    /**
     * расчет стоимости позиции путем умножения count * price
     */
    get positionPrice() {
        return this.count * (+this.price) || 0
    }



}