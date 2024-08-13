import {useCallback, useEffect, useState} from "react";

/**
 * хук сохраняет/загружует в/из localeStorage state
 * @param key
 * @param initState
 */
export function usePersistStateHook<S>(key: string, initState: S){
    const [state, setState] = useState<S>(initState)


    const changeStateHandler = useCallback((newState: S) => {
        localStorage.setItem(key, JSON.stringify(state))
        setState(newState)
    }, [key, state])


    useEffect(() => {
        const data = localStorage.getItem(key)
        try{
            if(data){
                setState(JSON.parse(data))
            } else {
                setState(initState)
            }
        } catch (e){
            console.error(e)
            setState(initState)
        }
    }, [])

    return [state, changeStateHandler]
}