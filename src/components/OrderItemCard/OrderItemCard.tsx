import React from 'react';

import {OrderItem} from "../../core/classes/OrderItem";
import {Image} from "react-bootstrap";
import {Subtitle} from "../Subtitle";
import {Counter} from "../Counter";

import './OrderItemCard.scss'


export type OrderItemCardProps = {
    orderItem: OrderItem
}

export function OrderItemCard({orderItem}: OrderItemCardProps) {
    return (
        <div className='orderItem orderItem-container'>
            <div className='orderItem-inner'>
                <Image
                    className='orderItem-image'
                    src={orderItem.product.preview}
                    alt={orderItem.product.title}
                />
                <Subtitle>{orderItem.product.title}</Subtitle>


            </div>
                <Counter />
        </div>
    );
}
