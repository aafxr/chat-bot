import axios from "axios";
import {botFetch} from "../axios";
import {NetworkError} from "../core/errors";
import {Order} from "../core/classes/Order";
import {BotResponseType} from "../types/BotResponseType";

export async function fetchOrders(){
    try {
        const res = await botFetch.get<BotResponseType<Order[]>>('/api/orders')
        if(res.status === 200){
            return res.data
        }
    } catch (e){
        if (axios.isAxiosError(e)) throw NetworkError.connectionError()
        throw e
    }
}