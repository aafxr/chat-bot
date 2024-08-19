import {Basket} from "../classes/Basket";
import {sendOrder} from "../../api/sendOrder";
import {AppUser} from "../classes/AppUser";
import {Company} from "../classes/Company";


const BASKET_KEY = "basket"


export class BasketService {
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


    /**
     * send order to chat bot server and if request success remove basket record from tg cloud
     */
    static async submitBasket(b: Basket, user:AppUser, company: Company){
        const res =  await sendOrder(b, user, company)
        if(res && res.ok){
            Telegram.WebApp.CloudStorage.removeItem(BASKET_KEY)
            return true
        }
        return false
    }


}