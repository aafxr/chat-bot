import clsx from "clsx";
import debounce from "lodash.debounce";
import React, {useEffect, useState} from 'react';

import './Counter.scss'


export type CounterProps = {
    className?: string
    value?: number
    min?: number
    max?: number
    onChange?: (v: number) => unknown
}


export function Counter({className, value, min, max, onChange}: CounterProps) {
    const [v, setV] = useState(0)
    const [text, setText] = useState('')


    useEffect(() => {
        if (value !== undefined && value !== v) setV(value)
    }, []);


    function handleIncrease() {
        if (max && v >= max) return
        setV(v + 1)
        onChange?.(v + 1)
    }

    function handleDecrease() {
        if ((min && v <= min) || v <= 0) return
        setV(v - 1)
        onChange?.(v - 1)
    }


    const handleInputChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value
        const count = parseInt(text)
        setV(count)
    }, 150, {trailing: true})


    return (
        <div className={clsx('counter counter-container', className)}>
            <button
                className='counter-button'
                onClick={handleDecrease}
                disabled={(min && v <= min) || v <= 0}
            >-
            </button>
            <input
                className='counter-input'
                type="text"
                inputMode={'numeric'}
                value={v}
                onChange={handleInputChange}
                size={1}
            />
            <button
                className='counter-button'
                onClick={handleIncrease}
                disabled={Boolean(max) && v >= max!}
            >+
            </button>
        </div>
    );
}

