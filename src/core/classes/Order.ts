import {CatalogItem} from "./CatalogItem";

export class Order{
    orders: Record<CatalogItem['id'], number>

    constructor(o: Partial<Order> = {}) {
        this.orders = o.orders ? o.orders : {}
    }

    has(p: CatalogItem){
        return !!this.orders[p.id]
    }

    set(p: CatalogItem, count: number){
        this.orders[p.id] = count
    }


}