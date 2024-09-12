import {BotResponseType} from "../types/BotResponseType";
import {botFetch} from "../axios";
import {Order} from "../core/classes/Order";
import {BasketDTO} from "../core/dto/BasketDTO";
import {AppUser} from "../core/classes/AppUser";
import axios from "axios";
import {NetworkError} from "../core/errors";

export async function sendOrder(b:BasketDTO, u : AppUser){
    try {
        const res = await botFetch.post<BotResponseType<Order>>('/api/order/new?uid=' + u.id, b)
        if(res.status > 199 && res.status < 300){
            return res.data
        }
    } catch (e){
        if (axios.isAxiosError(e)) throw NetworkError.connectionError()
        throw e
    }
}