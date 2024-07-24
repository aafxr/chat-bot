import {useAppSelector} from "./index";

export function useTgUser(){
    return useAppSelector(s => s.user.tg_user)
}