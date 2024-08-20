import {useCallback, useEffect, useState} from "react";
import {setAppUser, setTgUser, setUserCompanies} from "../redux/slices/user-slice";
import {UserService} from "../core/services/UserService";
import {TgService} from "../core/services/TgService";
import {AppUser} from "../core/classes/AppUser";
import {useAppDispatch} from "../redux/hooks";
import {TgUser} from "../core/classes/TgUser";


const appUserDefault = new AppUser({
    id: 42,
    country: 'Россия',
    city: 'Новосибирск',
    org: 'refloor',
    first_name: 'Иван',
    phone: 79998882211,
    manager: 42,
    telegram_id: '123456789',
    username: 'nickname',

})

const tgUserDefault = new TgUser({
    id: '',
    first_name: 'test',
    username: '@test',
    phone: "79999999999",
    last_name: 'testovich'
})


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
                .then(async (appUser) => {
                    if (!appUser) return
                    dispatch(setAppUser(appUser))
                    const tgUser = appUser.tgUser
                    if(tgUser) dispatch(setTgUser(tgUser))
                    const companies = await UserService.getUserCompanies(appUser)
                    if (!companies) return
                    dispatch(setUserCompanies(companies))
                })
                .catch(console.error)
                .finally(() => setState(p => ({...p, loading: false})))

        // if(window.location.hostname === 'localhost'){
        //     appUserDefault.telegram_id = tgUserDefault.id + ''
        //     appUserDefault.tgUser = tgUserDefault
        //     appUserDefault.first_name = tgUserDefault.first_name
        //     appUserDefault.username = tgUserDefault.username
        //     dispatch(setAppUser(appUserDefault))

        // }
    }, [dispatch, state])


    useEffect(() => {
        initUser()
    }, []); //dispatch, state, initUser


    return () => initUser()
}