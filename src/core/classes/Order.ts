import {Basket} from "./Basket";

export class Order extends Basket{

    id: number
    CreatedAt: Date
    UpdatedAt: Date
    DeletedAt: Date

    constructor(o: Partial<Order> = {}) {
        super(o);

        this.id = o.id !== undefined ? o.id : 0
        this.CreatedAt = o.CreatedAt !== undefined ? new Date(o.CreatedAt) : new Date(0)
        this.UpdatedAt = o.UpdatedAt !== undefined ? new Date(o.UpdatedAt) : new Date(0)
        this.DeletedAt = o.DeletedAt !== undefined ? new Date(o.DeletedAt) : new Date(0)
    }

}


/*
id: number
    orders: Record<CatalogItem['id'], OrderItem>

    constructor(o: Partial<Order> = {}) {
        this.id = o.id || 0
        if(o.orders){
            Object.entries(o.orders)
                .forEach(([k, v]) => o.orders![k] = new OrderItem(v))
        }
        this.orders = o.orders ? o.orders : {}
    }

    add(o: OrderItem){
        const item = this.orders[o.product.id]
        if (item){
            item.quantity += o.quantity
        } else {
            this.orders[o.product.id] = o
        }
    }

    has(p: CatalogItem){
        return !!this.orders[p.id]
    }

    set(o: OrderItem){
        this.orders[o.product.id] = o
    }

    get(p: CatalogItem): [CatalogItem, number] | undefined{
        const oi = this.orders[p.id]
        if(oi){
            return [oi.product, oi.quantity]
        }
    }

    delete(p:CatalogItem){
        delete this.orders[p.id]
    }


    entries(): [CatalogItem, number][]{
        return Object.values(this.orders).map(v => [v.product,v.quantity])
    }
 */