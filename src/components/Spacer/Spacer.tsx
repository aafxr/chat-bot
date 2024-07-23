import clsx from "clsx";

import './Spacer.scss'


export type SpacerProps = {
    className?: string
}

export function Spacer({className}: SpacerProps){
    return <div className={clsx('spacer', className)}/>
}