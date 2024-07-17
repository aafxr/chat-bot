import {useAppSelector} from "./index";

export function useCatalog(){
    return useAppSelector(state => state.catalog.catalog)
}