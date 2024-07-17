import {useAppSelector} from "./index";

export function useCatalogElement(id: string | undefined){
    const catalog =  useAppSelector(state => state.catalog.catalog)

    if (!id) return
    return catalog?.elements[id]

}