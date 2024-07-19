import React, {InputHTMLAttributes} from 'react';
import clsx from "clsx";

import './Radio.scss'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    onClick?: () => unknown
}

export function Radio({className, children, onClick, ...props}: RadioProps) {


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const el = e.currentTarget
        if (el.checked) onClick?.()
    }


    return (
        <div
            className={clsx('radio radio-container', className)}
            onClick={onClick}
        >
            <input
                {...props}
                className='radio-input'
                type="radio"
                onChange={handleChange}
            />
            <div className='radio-content'>{children}</div>
        </div>
    );
}

