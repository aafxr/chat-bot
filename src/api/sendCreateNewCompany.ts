import {botFetch} from "../axios";
import {Company} from "../core/classes/Company";
import {BotResponseType} from "../types/BotResponseType";

export async function sendCreateNewCompany(c: Company){
    return botFetch.post<BotResponseType<any>>('/api/newCompany')
}