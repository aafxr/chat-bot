import {Order} from "../classes/Order";
import {DB} from "../db/DB";
import {TgService} from "./TgService";
import {ErrorService} from "./ErrorService";
import {loadOrdersThunk} from "../../redux/slices/user-slice/loadOrdersThunk";
import {store} from "../../redux/store";


const ORDER_KEY = 'order'

export class OrderService {


    static async saveOrders(o: Order[]) {
        await DB.setStoreItem(ORDER_KEY, o)
        TgService.saveCurrentOrders(o).catch(ErrorService.handleError)
    }

    static async removeOrder(o: Order) {
        let orders = store.getState().user.orders
        orders = orders.filter(e => e.id !== o.id)
        await this.saveOrders(orders)
    }

    static async loadOrders() {
        loadOrdersThunk()
    }
}