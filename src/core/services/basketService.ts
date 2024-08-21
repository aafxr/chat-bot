import {Basket} from "../classes/Basket";
import {sendOrder} from "../../api/sendOrder";
import {AppUser} from "../classes/AppUser";
import {TgService} from "./TgService";




export class BasketService {
    /**
     * send order to chatbot server and if request success remove basket record from tg cloud
     */
    static async submitBasket(b: Basket, user:AppUser){
        b.companyID = b.company?.id || 0
        b.userId = user.id
        b.userPhone = user.phone

        const res =  await sendOrder(b)
        if(res && res.ok){
            TgService.removeBasket().catch(console.error)
            return true
        }
        return false
    }


}