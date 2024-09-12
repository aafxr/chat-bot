import {TgUser} from "../classes/TgUser";
import {Order} from "../classes/Order";
import {Basket} from "../classes/Basket";
import {fetchOrders} from "../../api/fetchOrders";
import {store} from "../../redux/store";


const CURRENT_ORDER_KEY = 'currentOrder'
const BASKET_KEY = "basket"



export class TgService {
    static getInitData(){
        if(Telegram.WebApp.initData)return Telegram.WebApp.initData
        return 'query_id=AAGYnLRHAAAAAJictEcjQpZD&user=%7B%22id%22%3A1203018904%2C%22first_name%22%3A%22Alexandr%22%2C%22last_name%22%3A%22A%22%2C%22username%22%3A%22AlexandrNS70%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1723104146&hash=5f0ea35b8b571b89399f715258d4664c02f4b03214765be9153cc204879444c6'
    }

    static getUser() {
        if (Telegram.WebApp.initDataUnsafe.user)
            return new TgUser({
                ...Telegram.WebApp.initDataUnsafe.user,
                id: '' + Telegram.WebApp.initDataUnsafe.user.id
            })
    }

    static getInitParam() {
        return Telegram.WebApp.initDataUnsafe.start_param
    }

    //
    // static async getOrdersList(): Promise<Order[]> {
    //     const keys = await new Promise<string[]>((res, rej) =>
    //         Telegram.WebApp.CloudStorage.getKeys(
    //             (e: Error | null, keys) => e ? rej(e) : res(keys)
    //         ))
    //
    //     if (!keys || !keys.length) return []
    //
    //     const orders = await new Promise<Order[]>((res, rej) => {
    //         Telegram.WebApp.CloudStorage.getItems(
    //             keys,
    //             (e: Error | null, items: string[]) => e ? rej(e) : res(items.map(i => JSON.parse(i)))
    //         )
    //     })
    //
    //     if (orders && orders.length) {
    //         return orders.map(o => new Order(o))
    //     }
    //
    //     return []
    // }


    static loadOrders(){
        return Promise.resolve(async () => {
            const res = await fetchOrders()
        })
        // const orders = await this.getCloudItem<Order[]>(CURRENT_ORDER_KEY)
        // return orders.map(o => new Order(o))
    }


    static async saveCurrentOrders(o: Order[]) {
        return new Promise((res, rej) => {
            const value = JSON.stringify(o)
            Telegram.WebApp.CloudStorage.setItem(
                CURRENT_ORDER_KEY,
                value,
                (e: Error | null, result) => e ? rej(e) : res(result)
            )
        })
    }


    static async removeCurrentOrders() {
        return await this.removeCloudItem(CURRENT_ORDER_KEY)
    }


    static async getCloudItem<T>(key: string): Promise<T> {
        return new Promise((res, rej) => {
            Telegram.WebApp.CloudStorage.getItem(
                key,
                (e: Error | null, v) => e ? rej(e) : res(JSON.parse(v) as T)
            )
        })
    }


    static async setCloudItem<T>(k: string, v: T): Promise<boolean> {
        return new Promise((res, rej) => {
            Telegram.WebApp.CloudStorage.setItem(
                k,
                JSON.stringify(v),
                (e: Error | null, v) => e ? rej(e) : res(v)
            )
        })
    }


    static async removeCloudItem(k: string): Promise<boolean> {
        return new Promise((res, rej) => {
            Telegram.WebApp.CloudStorage.removeItem(
                k,
                (e: Error | null, v) => e ? rej(e) : res(v)
            )
        })
    }


    /**
     * update basket record at telegram cloud
     */
    static setBasket(b: Basket): Promise<boolean> {
        return new Promise((res, rej) => {
            const val = JSON.stringify(b)
            Telegram.WebApp.CloudStorage.setItem(BASKET_KEY, val, (e, v) => {
                if (e) rej(e)
                else res(v)
            })
        })
    }


    /**
     * load basket from tg cloud or create new
     */
    static getBasket(): Promise<Basket>{
        return new Promise((res, rej) => {
            Telegram.WebApp.CloudStorage.getItem(BASKET_KEY, (e, v) => {
                if(e) {
                    rej(e)
                    return
                }
                try {
                    const b = new Basket(JSON.parse(v))
                    res(b)
                }catch (e){
                    rej(e)
                }
            })
        })
    }


    static async removeBasket(){
        return await this.removeCloudItem(BASKET_KEY)
    }


}