import clsx from "clsx";
import React, {HTMLAttributes} from 'react';

import './Title.scss'

export function Title(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className={clsx('title', props.className)}>
            {props.children}
        </div>
    );
}

