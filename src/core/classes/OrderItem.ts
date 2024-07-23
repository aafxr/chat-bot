import {CatalogItem} from "./CatalogItem";

export class OrderItem{
    quantity: number
    product: CatalogItem

    constructor(o : Pick<OrderItem, 'quantity' | 'product'>) {
        this.product = o.product
        this.quantity = o.quantity
    }


    getTotal(){
        return (+this.product.price) * this.quantity
    }
}