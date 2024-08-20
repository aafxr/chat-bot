import {botFetch} from "../axios";
import {Company} from "../core/classes/Company";
import {BotResponseType} from "../types/BotResponseType";
import {AppUser} from "../core/classes/AppUser";

export async function sendCreateNewCompany(u:AppUser, c: Company){
    const res = await botFetch.post<BotResponseType<any>>('/api/company/new?uid=' + u.id, c)
    if(res.status >199 && res.status < 300){
        return res.data.ok
    }

    return false
}