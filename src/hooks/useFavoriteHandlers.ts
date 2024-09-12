import {Product} from "../core/classes/Product";
import {CatalogService} from "../core/services/CatalogService";
import {useAppDispatch} from "../redux/hooks";
import {setFavorite} from "../redux/slices/catalog-slice";
import {ErrorService} from "../core/services/ErrorService";

export function useFavoriteHandlers(){
    const dispatch = useAppDispatch()

    function addFavorite(el : Product){
        CatalogService.addFavorite(el)
            .then(updateFavoriteState)
            .catch(ErrorService.handleError)
    }

    function removeFavorite(el: Product){
        CatalogService.removeFavorite(el)
            .then(updateFavoriteState)
            .catch(ErrorService.handleError)
    }

    function updateFavoriteState(){
        CatalogService.getFavorites()
            .then(f => dispatch(setFavorite(f)))
            .catch(ErrorService.handleError)
    }


    return {addFavorite, removeFavorite}
}