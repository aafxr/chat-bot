import clsx from "clsx";
import React, {forwardRef, HTMLAttributes} from 'react';

import './IconButton.scss'



export const IconButton = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>((props, ref) => {
    return (
        <button {...props} className={clsx('iconButton', props.className)}>
            {props.children}
        </button>
    );
})

