import {Basket} from "../classes/Basket";
import {sendOrder} from "../../api/sendOrder";
import {AppUser} from "../classes/AppUser";
import {TgService} from "./TgService";
import {BasketDTO} from "../dto/BasketDTO";
import {Order} from "../classes/Order";
import {store} from "../../redux/store";
import {setOrders} from "../../redux/slices/user-slice";




export class BasketService {
    /**
     * send order to chatbot server and if request success remove basket record from tg cloud
     */
    static async submitBasket(b: Basket, user:AppUser){
        b.companyID = b.company?.id || 0
        b.userId = user.id
        b.userPhone = user.phone

        const basketDto = new BasketDTO(b)

        const res =  await sendOrder(basketDto, user)

        if(res && res.ok){
            TgService.removeBasket().catch(console.error)
            const o = new Order(res.data)
            const orders: Order[] = store.getState().user.orders
            store.dispatch(setOrders([...orders, o]))
            return true
        }
        return false
    }


}