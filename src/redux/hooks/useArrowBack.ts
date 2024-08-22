import {useEffect} from "react";

export function useArrowBack(){
    useEffect(() => {
        const tg = Telegram.WebApp
        tg.BackButton.show()
        // tg.BackButton.onClick(() => navigate(-1))
    }, []);
}