import {CatalogItem} from "../core/classes/CatalogItem";
import {CatalogService} from "../core/services/CatalogService";
import {useAppDispatch} from "../redux/hooks";
import {setFavorite} from "../redux/slices/catalog-slice";

export function useFavoriteHandlers(){
    const dispatch = useAppDispatch()

    function addFavorite(el : CatalogItem){
        CatalogService.addFavorite(el)
            .then(updateFavoriteState)
            .catch(console.error)
    }

    function removeFavorite(el: CatalogItem){
        CatalogService.removeFavorite(el)
            .then(updateFavoriteState)
            .catch(console.error)
    }

    function updateFavoriteState(){
        CatalogService.getFavorites()
            .then(f => dispatch(setFavorite(f)))
            .catch(console.error)
    }


    return {addFavorite, removeFavorite}
}