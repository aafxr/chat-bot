import {TgUser} from "../classes/TgUser";

export class TgService{
    static getUser(){
        if(Telegram.WebApp.initDataUnsafe.user)
            return new TgUser(Telegram.WebApp.initDataUnsafe.user)
    }

    static getInitParam(){
        return Telegram.WebApp.initDataUnsafe.start_param
    }


}