import {AppUser} from "../core/classes/AppUser";
import {Company} from "../core/classes/Company";
import {botFetch} from "../axios";
import {BotResponseType} from "../types/BotResponseType";

export async function sendRemoveUserCompany(u: AppUser, c: Company ){
    const res = await botFetch.post<BotResponseType<boolean>>('/api/company/remove?uid=' + u.id, c)
    if(res.status > 199 && res.status < 300) {
        return res.data
    }
}