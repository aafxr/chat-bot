import axios from "axios";
import {Company} from "../core/classes/Company";

type FetchUserCompanies = {
    data: Company[]
    ok: true
} | {
    ok: false
}


export async function fetchUserCompanies(tg_userID: string): Promise<Company[] | undefined>{
    const res = await axios.get<FetchUserCompanies>('https://refloor-bot.ru/api/getUserCompanyList?telegram_id=' + tg_userID)

    if(res.status > 199 && res.status < 300){
        return res.data.ok ? res.data.data : undefined
    }

}