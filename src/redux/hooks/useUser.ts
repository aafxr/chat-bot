import {useAppSelector} from "./index";

export function useUser(){
    return useAppSelector(s => s.user.user)
}