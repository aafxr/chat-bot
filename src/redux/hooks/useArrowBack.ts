import {useEffect} from "react";
import {useNavigate} from "react-router";

export function useArrowBack(){
    const navigate = useNavigate()
    useEffect(() => {
        const tg = Telegram.WebApp
        tg.BackButton.onClick(() => navigate(-1))
    }, []);
}