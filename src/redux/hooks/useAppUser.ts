import {useAppSelector} from "./index";

export function useAppUser(){
    return useAppSelector(s => s.user.app_user)
}