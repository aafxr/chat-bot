import axios from "axios";
import {AppUser} from "../core/classes/AppUser";

type FetchUserDataResponse = {
    data: AppUser
    ok: true
} | {
    ok:false
}

export async function fetchUserData(userID: string): Promise<AppUser | undefined>{
    const response = await axios.get<FetchUserDataResponse>('https://refloor-bot.ru/api/getUserData?telegram_id=' + userID)
    if (response.status > 199 && response.status < 300){
        return response.data.ok ? response.data.data : undefined
    }
}