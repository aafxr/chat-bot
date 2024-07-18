import React from 'react';
import clsx from "clsx";

import {Balance} from "../../core/classes/Balance";

import './ElementBalance.scss'


export type ElementBalanceProps = {
    balance: Balance
    packUnit: number
    active?: boolean
    className?: string
}


export function ElementBalance({packUnit, className, balance, active}:ElementBalanceProps) {
    const packs = Math.floor((+balance.Quantity) / packUnit)

    return (
        <div className={clsx('balance balance-container', {active}, className)}>
            <div className='balance-name'>{balance.TradeArea_Name}</div>
            <div className='balance-rest'>
                <div>
                    <span className='balance-quantity'>{balance.Quantity}</span>
                    <span className='balance-mesure'>м<sub>2</sub></span>
                </div>
                <div>
                    <span className='balance-quantity'>{packs}</span>
                    <span className='balance-mesure'>упак</span>
                </div>
            </div>
        </div>
    );
}

