import {TgUser} from "../classes/TgUser";
import {Order} from "../classes/Order";


const CURRENT_ORDER_KEY = 'currentOrder'


export class TgService {
    static getUser() {
        if (Telegram.WebApp.initDataUnsafe.user)
            return new TgUser(Telegram.WebApp.initDataUnsafe.user)
    }

    static getInitParam() {
        return Telegram.WebApp.initDataUnsafe.start_param
    }


    static async getOrdersList(): Promise<Order[]> {
        const keys = await new Promise<string[]>((res, rej) =>
            Telegram.WebApp.CloudStorage.getKeys(
                (e: Error | null, keys) => e ? rej(e) : res(keys)
            ))

        if (!keys || !keys.length) return []

        const orders = await new Promise<Order[]>((res, rej) => {
            Telegram.WebApp.CloudStorage.getItems(
                keys,
                (e: Error | null, items: string[]) => e ? rej(e) : res(items.map(i => JSON.parse(i)))
            )
        })

        if (orders && orders.length) {
            return orders.map(o => new Order(o))
        }

        return []
    }


    static async saveCurrentOrder(o: Order) {
        return new Promise((res, rej) => {
            const value = JSON.stringify(o)
            Telegram.WebApp.CloudStorage.setItem(
                CURRENT_ORDER_KEY,
                value,
                (e: Error | null, result) => e ? rej(e) : res(result)
            )
        })
    }


    static async removeCurrentOrder() {
        return new Promise((res, rej) => {
            Telegram.WebApp.CloudStorage
                .removeItem(
                    CURRENT_ORDER_KEY,
                    (e: Error | null, result) => e ? rej(e) : res(result)
                )
        })
    }


}