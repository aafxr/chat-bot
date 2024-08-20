import {useAppSelector} from "./index";

export function useUserBasket(){
    return useAppSelector(s => s.user.basket)
}