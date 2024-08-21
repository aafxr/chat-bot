import {botFetch} from "../axios";
import {AppUser} from "../core/classes/AppUser";
import {BotResponseType} from "../types/BotResponseType";

export async function sendUpdateUser(user: AppUser){

    const res = await botFetch.post<BotResponseType<any>>('/api/user/update', user)

    if(res.status > 199 && res.status<300){
        return res.data
    }

}