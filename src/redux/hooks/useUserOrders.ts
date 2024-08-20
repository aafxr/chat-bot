import {useAppSelector} from "./index";

export function useUserOrders(){
    return useAppSelector(s => s.user.orders)
}