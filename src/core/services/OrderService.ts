import {Order} from "../classes/Order";
import {DB} from "../db/DB";
import {TgService} from "./TgService";


const ORDER_KEY = 'order'

export class OrderService {


    static async saveOrders(o: Order[]) {
        await DB.setStoreItem(ORDER_KEY, o)
        TgService.saveCurrentOrders(o).catch(console.error)
    }

    static async removeOrder(o: Order) {
        let orders = await this.loadOrders()
        orders = orders.filter(e => e.id !== o.id)
        await this.saveOrders(orders)
    }

    static async loadOrders(): Promise<Order[]> {
        let orders: Order[] | undefined = await TgService.loadOrders()
        if (!orders) {
            orders = await DB.getStoreItem<Order[]>(ORDER_KEY)
        }
        if (orders) return orders.map(o => new Order(o))
        return []
    }
}