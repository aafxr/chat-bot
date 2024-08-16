import React, {ReactNode} from 'react';

import './InfoRow.scss'

export type InfoRowProps = {
    before?: ReactNode
    children?: ReactNode
}
export function InfoRow({before, children}: InfoRowProps) {
    return (
        <div className='infoRow'>
            <span>{before}</span>
            <span>{children}</span>
        </div>
    );
}

