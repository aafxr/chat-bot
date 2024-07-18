import React, {InputHTMLAttributes} from 'react';
import clsx from "clsx";

import './Radio.scss'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>{
    onClick?: () => unknown
}

export function Radio({className, children,onClick, ...props}: RadioProps) {


    return (
        <div
            className={clsx('radio radio-container', className)}
            onClick={onClick}
        >
            <input {...props} className='radio-input' type="radio"/>
            <div className='radio-content'>{children}</div>
        </div>
    );
}

