import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import debounce from "lodash.debounce";


import './Counter.scss'


export type CounterProps = {
    value?: number
    min?: number
    max?: number
    onChange?: (v: number) => unknown
}


export function Counter({value, min, max, onChange}: CounterProps) {
    const [v, setV] = useState(0)


    useEffect(() => {
        if(value !== undefined && value !== v) setV(value)
    }, [value]);


    function handleIncrease(){
        if(max && v >= max ) return
        setV(v - 1)
        onChange?.(v + 1)
    }

    function handleDecrease(){
        if ((min && v <= min) || v <= 0) return
        setV(v - 1)
        onChange?.(v - 1)
    }


    const handleInputChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value
        const count = parseInt(text)
        if(count !== v) {
            setV(count)
            onChange?.(count)
        }
    }, 150, {trailing: true})



    return (
        <div className='counter counter-container'>
            <Button
                className='counter-button'
                onClick={handleIncrease}
                disabled={Boolean(max) && v >= max!}
            >+</Button>
            <input
                className='counter-input'
                type="text"
                inputMode={'numeric'}
                value={v}
                onChange={handleInputChange}
                size={1}
            />
            <Button
                className='counter-button'
                onClick={handleDecrease}
                disabled={(min && v <= min) || v <= 0}
            >-</Button>

        </div>
    );
}

