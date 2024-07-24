import React, {useCallback} from "react";

export function useMemoScroll<T extends Element>(key: string){
    const onScroll = useCallback((e: React.MouseEvent<T>) => {
        const {scrollLeft, scrollTop} = e.currentTarget
        localStorage.setItem(key, JSON.stringify({scrollLeft, scrollTop}))
    }, [key])

    const onTouchEnd = useCallback((e: React.TouchEvent<T>) => {
        const {scrollLeft, scrollTop} = e.currentTarget
        localStorage.setItem(key, JSON.stringify({scrollLeft, scrollTop}))
    }, [key])

    return {onScroll, onTouchEnd}
}