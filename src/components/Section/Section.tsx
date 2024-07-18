import clsx from "clsx";
import React, {forwardRef, HTMLAttributes} from 'react';

import './Section.scss'

export const Section = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props,ref) => {
    return (
        <div ref={ref} {...props} className={clsx('section', props.className)}>
            {props.children}
        </div>
    );
})

