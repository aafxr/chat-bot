import {BotResponseType} from "../types/BotResponseType";
import {botFetch} from "../axios";
import {BasketDTO} from "../core/dto/BasketDTO";

export async function sendOrder(b:BasketDTO){
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

    const res = await botFetch.post<BotResponseType<any>>('/api/order/new', b)
    if(res.status > 199 && res.status < 300){
        return res.data
    }
}