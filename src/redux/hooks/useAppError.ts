import {useAppSelector} from "./index";

export function useAppError(){
    return useAppSelector(s => s.error.message)
}