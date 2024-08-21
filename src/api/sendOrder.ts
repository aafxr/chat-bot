import {BotResponseType} from "../types/BotResponseType";
import {Basket} from "../core/classes/Basket";
import {botFetch} from "../axios";

export async function sendOrder(b:Basket){
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