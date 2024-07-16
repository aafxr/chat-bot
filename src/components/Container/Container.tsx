import React from 'react';
import clsx from "clsx";

import './Container.scss'


export type ComponentProps = {
    className?: string
    children?: React.ReactNode
}


export function Container({children, className}: ComponentProps) {
    return (
        <div className={clsx('container', className)}>
            {children}
        </div>
    );
}

