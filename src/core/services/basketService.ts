import {Basket} from "../classes/Basket";
import {sendOrder} from "../../api/sendOrder";
import {AppUser} from "../classes/AppUser";
import {TgService} from "./TgService";
import {BasketDTO} from "../dto/BasketDTO";




export class BasketService {
    /**
     * send order to chatbot server and if request success remove basket record from tg cloud
     */
    static async submitBasket(b: Basket, user:AppUser){
        b.companyID = b.company?.id || 0
        b.userId = user.id
        b.userPhone = user.phone

        const basketDto = new BasketDTO(b)

        const res =  await sendOrder(basketDto)
        if(res && res.ok){
            TgService.removeBasket().catch(console.error)
            return true
        }
        return false
    }


}