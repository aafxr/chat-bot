import {CatalogItem} from "./CatalogItem";

export class OrderItem{
    quantity: number
    product: CatalogItem

    constructor(o : OrderItem) {
        this.product = o.product
        this.quantity = o.quantity
    }
}