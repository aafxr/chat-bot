import {useEffect, useState} from "react";

export type UseDeviceTypeState = {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

const defaultUseDeviceTypeState: UseDeviceTypeState = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
}

export function useDeviceType() {
    const [state, setState] = useState(defaultUseDeviceTypeState);

    function handleWindowSizeChange() {
        if (window.innerWidth >= 992) {
            setState({
                ...defaultUseDeviceTypeState,
                isDesktop: true
            })
        } else if (window.innerHeight <= 480) {
            setState({
                ...defaultUseDeviceTypeState,
                isMobile: true
            })
        } else {
            setState({
                ...defaultUseDeviceTypeState,
                isTablet: true
            })
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        handleWindowSizeChange()

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);


    return state
}