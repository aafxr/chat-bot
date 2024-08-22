import {useEffect, useState} from "react";

/**
 * хук сохраняет/загружует в/из localeStorage state
 * @param key
 * @param initState
 */
export function usePersistStateHook<S>(key: string, initState: S): [S, (s: S) => unknown] {
    const [state, setState] = useState<S>(initState)


    // const changeStateHandler = useCallback((newState: S) => {
    //     localStorage.setItem(key, JSON.stringify(state))
    //     setState(newState)
    // }, [key, state])


    useEffect(() => {
        const data = localStorage.getItem(key)
        try {
            let obj: S | undefined
            if (data) {
                obj = JSON.parse(data)
                setState(obj ? obj : initState)
            } else {
                setState(initState)
            }
        } catch (e) {
            console.error(e)
            setState(initState)
        }
    }, [])


    useEffect(() => {
        return () => {
            localStorage.setItem(key, JSON.stringify(state))
        }
    }, [key, state]);

    return [state, setState]
}