import axios from "axios";
import {ApiResponse} from "../types/ApiRespponse";
import {AppUser} from "../core/classes/AppUser";

export async function sendOrder(orderItems: any, user: AppUser){
    const payload = {
        OrderItems : orderItems,
        'Client' : {
            'Phone' : user.phone,
            'UID' : 'selectedCompany',
        },
        'TradeArea_Id' : 'selectedWarehouse.id',
        'Comment' : 'orderComment',
        'OrderNumber' : 'tg-pwa-'+Date.now()
    }

    const res = await axios.post<ApiResponse<any>>('https://refloor-bot.ru/api/sendOrder', payload)
    if(res.status > 199 && res.status < 300){
        return res.data
    }
}