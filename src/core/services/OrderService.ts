import {Order} from "../classes/Order";
import {DB} from "../db/DB";
import {TgService} from "./TgService";


const ORDER_KEY = 'order'

export class OrderService{
    static async saveOrder(o: Order){
        await DB.setStoreItem(ORDER_KEY, o)
        TgService.saveCurrentOrder(o).catch(console.error)
    }

    static async removeOrder(){
        await DB.deleteStoreItem(ORDER_KEY)
        TgService.removeCurrentOrder().catch(console.error)
    }

    static async loadOrder(){
        let order: Order | undefined = await TgService.loadCurrentOrder()
        if(!order){
            order = await DB.getStoreItem<Order>(ORDER_KEY)
        }
        if(order) return new Order(order)
    }
}