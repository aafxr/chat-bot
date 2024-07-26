import {useAppSelector} from "./index";

export function useUserCompanies(){
    return useAppSelector(s => s.user.userCompanies)
}