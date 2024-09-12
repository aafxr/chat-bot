import {botFetch} from "../axios";
import {Company} from "../core/classes/Company";
import {BotResponseType} from "../types/BotResponseType";
import {AppUser} from "../core/classes/AppUser";
import axios from "axios";
import {NetworkError} from "../core/errors";

export async function sendCreateNewCompany(u:AppUser, c: Company){
    try {
        const res = await botFetch.post<BotResponseType<Company>>('/api/company/new?uid=' + u.id, c)
        if(res.status >199 && res.status < 300){
            return res.data.ok ? res.data.data : false
        }

        return false
    } catch (e){
        if (axios.isAxiosError(e)) throw NetworkError.connectionError()
        throw e
    }
}