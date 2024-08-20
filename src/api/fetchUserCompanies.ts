import {Company} from "../core/classes/Company";
import {BotResponseType} from "../types/BotResponseType";
import {botFetch} from "../axios";


export async function fetchUserCompanies(userID: number): Promise<Company[] | undefined>{
    const res = await botFetch.get<BotResponseType<Company[]>>('/api/companies?uid=' + userID)

    if(res.status > 199 && res.status < 300){
        return res.data.ok ? res.data.data : undefined
    }

}