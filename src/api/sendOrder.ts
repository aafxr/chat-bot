import axios from "axios";
import {TgUser} from "../core/classes/TgUser";

export async function sendOrder(orderItems: any, user: TgUser){
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

    const response = await axios.post('https://refloor-bot.ru/api/sendOrder', payload)
}