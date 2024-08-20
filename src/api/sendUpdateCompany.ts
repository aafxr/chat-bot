import {Company} from "../core/classes/Company";
import {botFetch} from "../axios";
import {BotResponseType} from "../types/BotResponseType";
import {AppUser} from "../core/classes/AppUser";

export async function sendUpdateCompany(u: AppUser, c: Company){
    const res = await botFetch.post<BotResponseType<BotResponseType<Boolean>>>('/api/company?uid=' + u.id, c)
    if(res.status >199 && res.status < 300){
        return res.data.ok
    }
    return  false
}