import {TelegramWebApps} from "telegram-webapps";

declare global {


    interface Window {
        Telegram: TelegramWebApps
    }

}
