import clsx from "clsx";
import React, {useEffect, useState} from 'react';

import {addProduct, removeProduct, setProduct} from "../../redux/slices/order-slice";
import {CatalogItem} from "../../core/classes/CatalogItem";
import {OrderItem} from "../../core/classes/OrderItem";
import {useOrder} from "../../redux/hooks/useOrder";
import {useAppDispatch} from "../../redux/hooks";
import {CloseIcon} from "../svg";

import './AddOrder.scss'
import {Button} from "@telegram-apps/telegram-ui";


export type AddOrderProps = {
    className?: string
    product: CatalogItem
    max: number
}


export function AddOrder({product, max, className}: AddOrderProps) {
    const dispatch = useAppDispatch()
    const order = useOrder()
    const orderItem: OrderItem | undefined = order.orders[product.id]

    const [text, setText] = useState('')


    useEffect(() => {
        setText('' + orderItem?.quantity || '1')
    }, [orderItem?.quantity]);


    function handleAddOrder() {
        const o = new OrderItem({product, quantity: 1})
        dispatch(setProduct(o))
    }

    function handleChangeQuantity(c: number) {
        if (orderItem && orderItem.quantity + c <= 0) {
            dispatch(removeProduct(product))
            return
        }
        if (c > max) {
            const o = new OrderItem({product, quantity: max})
            dispatch(setProduct(o))
            return;
        }
        const o = new OrderItem({product, quantity: c})
        dispatch(addProduct(o))
    }


    function handleInputChangeQuantity(e: React.ChangeEvent<HTMLInputElement>) {
        setText(e.target.value)
    }


    function handleBlur() {
        let v = text.trim()
        if (+v === orderItem?.quantity) return
        const c = Number(v)
        if (Number.isNaN(c)) {
            setText(orderItem?.quantity.toString() || '1')
            return
        }
        handleChangeQuantity(c)
    }


    return (
        <div className={clsx('addOrder addOrder-container', className)}>
            <div className='addOrder-inner'>
                {orderItem
                    ? (
                        <div className='addOrder-counter'>
                            <Button
                                className='addOrder-button'
                                onClick={() => handleChangeQuantity(-1)}
                            >-</Button>
                            <input
                                className='addOrder-input'
                                type='text'
                                inputMode='numeric'
                                value={text}
                                min={0}
                                max={max}
                                size={1}
                                onChange={handleInputChangeQuantity}
                                onBlur={handleBlur}
                            />
                            <Button
                                className='addOrder-button'
                                onClick={() => handleChangeQuantity(1)}
                                disabled={orderItem.quantity >= max}
                            >+</Button>

                            <div
                                className='addOrder-remove remove-btn'
                                onClick={() => dispatch(removeProduct(product))}
                            >
                                <CloseIcon className='addOrder-icon icon-16'/>

                            </div>
                        </div>
                    ) : (
                        <Button
                            className='addOrder-button addOrder-button-add'
                            onClick={handleAddOrder}
                        >Добавить в заказ</Button>)
                }
            </div>
        </div>
    );
}

