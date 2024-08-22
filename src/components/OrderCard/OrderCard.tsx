import clsx from "clsx";
import React from 'react';
import {Caption, Cell, Headline} from "@telegram-apps/telegram-ui";

import {dateLang, dateOptions, formatter} from "../../utils/formatter";
import {Currency} from "../../constants/currency";
import {Order} from "../../core/classes/Order";
import {Block} from "../Block";

import './OrderCard.scss'


export type OrderItemCardProps = {
    order: Order
    className?: string
    onRemove?: (item: Order) => unknown
}



export function OrderCard({order, className, onRemove}: OrderItemCardProps) {


    return (
        <Block className={clsx('order order-container', className)}>
            <div className='order-inner'>
                <Headline >№{order.id}&nbsp;{order.created_at.toLocaleDateString(dateLang, dateOptions)}</Headline>
                <Cell
                    before={<Caption>Товаров в заказе</Caption>}
                    after={<Caption>{order.length}</Caption>}
                    />
                <Cell
                    before={<Caption>Сумма заказа</Caption>}
                    after={<Caption>{formatter.format(order.totalPrice)}&nbsp;{Currency['RUB']}</Caption>}
                />

            </div>
        </Block>
    );
}
