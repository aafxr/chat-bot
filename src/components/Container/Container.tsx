import React, {forwardRef} from 'react';
import clsx from "clsx";

import './Container.scss'


export type ComponentProps = {
    className?: string
    children?: React.ReactNode
}


export const Container = forwardRef<HTMLDivElement, ComponentProps>(({children, className}, ref) =>  {
    return (
        <div ref={ref} className={clsx('app-container', className)}>
            {children}
        </div>
    );
})

