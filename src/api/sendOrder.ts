import axios from "axios";
import {BotResponseType} from "../types/BotResponseType";
import {AppUser} from "../core/classes/AppUser";
import {Company} from "../core/classes/Company";
import {Basket} from "../core/classes/Basket";

export async function sendOrder(b:Basket, user: AppUser, c: Company){
    const payload = {
        OrderItems : b.items,
        'Client' : {
            'ID': user.id,
            'Phone' : user.phone,
            'UID' : c.id,
        },
        'TradeArea_Id' : 'selectedWarehouse.id',
        'Comment' : b.comment,
        'OrderNumber' : 'tg-pwa-'+Date.now()
    }

    const res = await axios.post<BotResponseType<any>>('https://refloor-bot.ru/api/sendOrder', payload)
    if(res.status > 199 && res.status < 300){
        return res.data
    }
}