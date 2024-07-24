import axios from "axios";
import {ApiResponse} from "../types/ApiRespponse";

export async function fetchUserData(userID: string){
    const response = await axios.get<ApiResponse<any>>('https://refloor-bot.ru/api/getUserData?telegram_id=' + userID)
    if (response.status > 199 && response.status < 300){
        return response.data
    }
}