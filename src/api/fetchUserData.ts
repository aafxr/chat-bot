import {AppUser} from "../core/classes/AppUser";
import {BotResponseType} from "../types/BotResponseType";
import {botFetch} from "../axios";


export async function fetchUserData(initData: string): Promise<AppUser | undefined>{
    const response = await botFetch.post<BotResponseType<AppUser>>('/api/me' , initData)

    if (response.status > 199 && response.status < 300){
        return response.data.ok ? response.data.data : undefined
    }
}