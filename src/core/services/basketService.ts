import {Basket} from "../classes/Basket";
import {sendOrder} from "../../api/sendOrder";
import {AppUser} from "../classes/AppUser";
import {Company} from "../classes/Company";
import {TgService} from "./TgService";




export class BasketService {



    /**
     * send order to chatbot server and if request success remove basket record from tg cloud
     */
    static async submitBasket(b: Basket, user:AppUser, company: Company){
        const res =  await sendOrder(b, user, company)
        if(res && res.ok){
            TgService.removeBasket().catch(console.error)
            return true
        }
        return false
    }


}