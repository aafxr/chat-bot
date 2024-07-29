import clsx from "clsx";
import React from 'react';
import {Link} from "react-router-dom";

import {setOrder} from "../../redux/slices/order-slice";
import {OrderItem} from "../../core/classes/OrderItem";
import {useFormatter} from "../../hooks/useFormatter";
import {useOrder} from "../../redux/hooks/useOrder";
import {useAppDispatch} from "../../redux/hooks";
import {Order} from "../../core/classes/Order";
import {CloseIcon} from "../svg/CloseIcon";
import {Image} from "react-bootstrap";
import {Subtitle} from "../Subtitle";
import {Counter} from "../Counter";

import './OrderItemCard.scss'


export type OrderItemCardProps = {
    orderItem: OrderItem
    className?: string
    onRemove?: (item: OrderItem) => unknown

}

export function OrderItemCard({orderItem, className, onRemove}: OrderItemCardProps) {
    const dispatch = useAppDispatch()
    const order = useOrder()
    const formatter = useFormatter(orderItem.product.currency)

    function handleQuantityChange(n: number) {
        const newOrder = new Order(order)
        const updOrderItem = new OrderItem(orderItem)

        if (n <= 0) {
            onRemove?.(orderItem)
            return
        } else {
            updOrderItem.quantity = n
            newOrder.set(updOrderItem)
        }
        dispatch(setOrder(newOrder))
    }


    return (
        <div className={clsx('orderItem orderItem-container', className)}>
            <div className='orderItem-inner'>
                <Image
                    className='orderItem-image'
                    src={orderItem.product.preview}
                    alt={orderItem.product.title}
                />
                <div className='orderItem-content'>
                    <Subtitle className='orderItem-title'>
                        <Link to={`/${orderItem.product.id}`}>
                            {orderItem.product.title}
                        </Link>
                    </Subtitle>
                    <div className='orderItem-summery'>
                        <span>{formatter.format(orderItem.getTotal())}</span>
                        <Counter
                            min={1}
                            className='orderItem-counter'
                            initValue={orderItem.quantity}
                            onChange={handleQuantityChange}
                        />
                    </div>
                    <button className='orderItem-remove remove-btn' onClick={() => onRemove?.(orderItem)}>
                        <CloseIcon className='icon-16'/>
                    </button>
                </div>
            </div>
        </div>
    );
}
