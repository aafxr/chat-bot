import {Order} from "../classes/Order";
import {DB} from "../db/DB";


const ORDER_KEY = 'order'

export class OrderService{
    static async saveOrder(o: Order){
        await DB.setStoreItem(ORDER_KEY, o)
    }

    static async loadOrder(){
        const order = await DB.getStoreItem<Order>(ORDER_KEY)
        if(order) return new Order(order)
    }
}