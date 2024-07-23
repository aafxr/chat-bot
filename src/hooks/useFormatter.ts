import {useMemo} from "react";

export function useFormatter(currency: string){
    return useMemo(() => {
        return new Intl.NumberFormat(navigator.language, {
            style: 'currency',
            currency,
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        })
    }, [currency])
}