import {Product} from "./Product";

export class OrderItem{
    quantity: number
    product: Product

    constructor(o : Pick<OrderItem, 'quantity' | 'product'>) {
        this.product = o.product
        this.quantity = o.quantity
    }


    getTotal(){
        return (+this.product.price) * this.quantity
    }
}