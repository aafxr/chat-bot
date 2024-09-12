import {Company} from "../core/classes/Company";
import {BotResponseType} from "../types/BotResponseType";
import {botFetch} from "../axios";
import axios from "axios";
import {NetworkError} from "../core/errors";


export async function fetchUserCompanies(userID: number): Promise<Company[] | undefined>{
    try {
        const res = await botFetch.get<BotResponseType<Company[]>>('/api/companies?uid=' + userID)

        if(res.status > 199 && res.status < 300){
            return res.data.ok ? res.data.data : undefined
        }
    } catch (e){
        if (axios.isAxiosError(e)) throw NetworkError.connectionError()
        throw e
    }
}