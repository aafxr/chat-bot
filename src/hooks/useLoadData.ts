import {useCallback, useEffect, useState} from "react";

type LoadDataState<T> = {
    data?: T
    loading: boolean
    error?: Error
}


export function useLoadData<T extends any[]>(cb: (...args: T) => unknown, ...args: T) {
    const [state, setState] = useState<LoadDataState<ReturnType<typeof cb>>>({loading: false})


    const loadData = useCallback(() => {
        if (state.loading) return
        setState({loading: true, data: undefined, error: undefined})

        let res: ReturnType<typeof cb> | undefined
        let error: Error | undefined

        try {
            res = cb(...args)
            if (res instanceof Promise) {
                res.then(data => setState({ data, loading: false, error: undefined}))
                res.catch(error => setState({ data: undefined, loading: false, error}))
            }
        } catch (err) {
            error = err as Error
            setState({ data: res as T, loading: false, error})
        }

    }, [cb, args, state])


    useEffect(() => {
        loadData()
    }, [])


    return {
        data: state.data,
        loading: state.loading,
        error: state.error,
        reload: loadData
    }
}
