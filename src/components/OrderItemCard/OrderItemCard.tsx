import clsx from "clsx";
import React from 'react';

import {OrderItem} from "../../core/classes/OrderItem";
import {Image} from "react-bootstrap";
import {Subtitle} from "../Subtitle";
import {Counter} from "../Counter";

import './OrderItemCard.scss'


export type OrderItemCardProps = {
    orderItem: OrderItem
    className?: string
}

export function OrderItemCard({orderItem, className}: OrderItemCardProps) {
    return (
        <div className={clsx('orderItem orderItem-container', className)}>
            <div className='orderItem-inner'>
                <Image
                    className='orderItem-image'
                    src={orderItem.product.preview}
                    alt={orderItem.product.title}
                />
                <Subtitle className='orderItem-title'>{orderItem.product.title}</Subtitle>


            </div>
                <Counter className='orderItem-counter mt-2' />
        </div>
    );
}
