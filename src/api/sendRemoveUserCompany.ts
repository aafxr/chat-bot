import {AppUser} from "../core/classes/AppUser";
import {Company} from "../core/classes/Company";
import {botFetch} from "../axios";
import {BotResponseType} from "../types/BotResponseType";
import axios from "axios";
import {NetworkError} from "../core/errors";

export async function sendRemoveUserCompany(u: AppUser, c: Company ){
    try {
        const res = await botFetch.post<BotResponseType<boolean>>('/api/company/remove?uid=' + u.id, c)
        if(res.status > 199 && res.status < 300) {
            return res.data
        }
    } catch (e){
        if (axios.isAxiosError(e)) throw NetworkError.connectionError()
        throw e
    }
}