import {useCallback, useEffect, useState} from "react";
import {UserService} from "../core/services/UserService";
import {useAppDispatch} from "../redux/hooks";


type initUserState = {
    loading: boolean
}


const defaultInitUserState: initUserState = {
    loading: false,
}


/**
 * запрашивает у api данные о пользователе и инициализирует store
 *
 * возвращает cb для повторного api запроса данных
 */
export function useInitUser() {
    const dispatch = useAppDispatch()
    const [state, setState] = useState(defaultInitUserState)


    const initUser = useCallback(() => {
        if (state.loading) return
        setState(p => ({...p, loading: true}))

            UserService.getAppUser()
                .catch(console.error)
                .finally(() => setState(p => ({...p, loading: false})))
    }, [dispatch, state])


    useEffect(() => {
        initUser()
    }, []); //dispatch, state, initUser


    return () => initUser()
}