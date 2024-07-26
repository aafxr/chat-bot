import clsx from "clsx";
import React, {useEffect, useRef, useState} from 'react';

import './Counter.scss'


export type CounterProps = {
    className?: string
    initValue?: number
    min?: number
    max?: number
    onChange?: (v: number) => unknown
}


type CounterTempState = {
    timer?: NodeJS.Timeout | number
}


export function Counter({className, initValue, min, max, onChange}: CounterProps) {
    const [v, setV] = useState(0)
    const [text, setText] = useState('')
    const ref = useRef<CounterTempState>({})


    const updateState = (n: number) => {
        if(min) n = Math.max(min, n)
        if(max) n = Math.min(max, n)
        setV(n)
        setText('' + n)
        onChange?.(n)
    }


    useEffect(() => {
        if (initValue !== undefined && initValue !== v) {
            updateState(initValue)
            return
        }
        setText('' + min || '0')
    }, []);


    const handleChangedText = (t: string) => {
        if(ref.current.timer) clearTimeout(ref.current.timer as number);
        delete ref.current.timer
        const n = parseInt(t)
        if(!Number.isNaN(n))updateState(n)
    }


    function handleIncrease() {
        if (max && v >= max) return
        updateState(v + 1)
    }

    function handleDecrease() {
        if ((min && v <= min) || v <= 0) return
        updateState(v - 1)
    }


    const handleInputChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value
        setText(text)
        if(ref.current.timer) clearTimeout(ref.current.timer as number);
        ref.current.timer = setTimeout(() => handleChangedText(text), 500)
    }


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
                value={text}
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

