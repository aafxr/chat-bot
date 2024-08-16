import {ReactNode} from 'react';

import './LinkRow.scss'
import {Link} from "react-router-dom";

export type LinkRowProps = {
    before?: ReactNode
    after?: ReactNode
    children?: ReactNode
    to: string
}


export function LinkRow({to, before, after, children}: LinkRowProps) {
    return (
        <Link to={to}>
            <div className='linkRow'>
                {!!before && <span>{before}</span>}
                <span>{children}</span>
                {!!after && <span className='linkRow-after'>{after}</span>}
            </div>
        </Link>
    );
}

