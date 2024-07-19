import {useAppSelector} from "./index";

export function useOrder(){
    return useAppSelector(state => state.order.order)
}