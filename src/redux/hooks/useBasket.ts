import {useAppSelector} from "./index";

export function useBasket(){
    return useAppSelector(s => s.basket.basket)
}