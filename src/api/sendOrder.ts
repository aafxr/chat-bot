import {BotResponseType} from "../types/BotResponseType";
import {botFetch} from "../axios";
import {Order} from "../core/classes/Order";
import {BasketDTO} from "../core/dto/BasketDTO";
import {AppUser} from "../core/classes/AppUser";

export async function sendOrder(b:BasketDTO, u : AppUser){
    // const payload = {
    //     OrderItems : b.items,
    //     'Client' : {
    //         'ID': user.id,
    //         'Phone' : user.phone,
    //         'UID' : b.company?.id,
    //     },
    //     'TradeArea_Id' : 'selectedWarehouse.id',
    //     'Comment' : b.comment,
    //     'OrderNumber' : 'tg-pwa-'+Date.now()
    // }

    const res = await botFetch.post<BotResponseType<Order>>('/api/order/new?uid=' + u.id, b)
    if(res.status > 199 && res.status < 300){
        return res.data
    }
}