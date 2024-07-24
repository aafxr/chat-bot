import {User} from "../classes/User";

export class TgService{
    static getUser(){
        if(Telegram.WebApp.initDataUnsafe.user)
            return new User(Telegram.WebApp.initDataUnsafe.user)
    }

    static getInitParam(){
        return Telegram.WebApp.initDataUnsafe.start_param
    }


}