import React from "react";
import debounce from "lodash.debounce";

export function useMemoScroll<T extends Element>(key: string){


    const onScroll = debounce((e: React.MouseEvent<T>) => {
        const {scrollLeft, scrollTop} = e.target as T
        localStorage.setItem(key, JSON.stringify({scrollLeft, scrollTop}))
    }, 150, {trailing: true})


    const onTouchEnd = debounce((e: React.TouchEvent<T>) => {
        const {scrollLeft, scrollTop} = e.target as T
        localStorage.setItem(key, JSON.stringify({scrollLeft, scrollTop}))
    }, 150, {trailing:true})


    return {onScroll, onTouchEnd}
}