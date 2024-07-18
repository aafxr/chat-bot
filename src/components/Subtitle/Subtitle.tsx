import clsx from "clsx";
import React, {HTMLAttributes} from 'react';

import './Subtitle.scss'

export function Subtitle(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className={clsx('subtitle', props.className)}>
            {props.children}
        </div>
    );
}

