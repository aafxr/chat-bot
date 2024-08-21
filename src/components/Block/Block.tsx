import clsx from "clsx";
import React, {PropsWithChildren} from 'react';

import './Block.scss'


interface BlockProps extends PropsWithChildren{
    className?: string
}


export function Block({className, children}: BlockProps) {
    return (
        <div className={clsx('block', className)}>
            {children}
        </div>
    );
}

