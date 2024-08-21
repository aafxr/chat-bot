import clsx from "clsx";
import React, {useEffect, useRef, useState} from 'react';
import {Button} from "@telegram-apps/telegram-ui";


import {removeBasketProduct, setBasketProductQuantity} from "../../redux/slices/user-slice";
import {ProductDetails} from "../../core/classes/ProductDetails";
import {useUserBasket} from "../../redux/hooks/useUserBasket";
import {CatalogItem} from "../../core/classes/CatalogItem";
import {OrderItem} from "../../core/classes/OrderItem";
import {useAppDispatch} from "../../redux/hooks";
import {CloseIcon} from "../svg";


import './AddOrder.scss'


export type AddOrderProps = {
    className?: string
    product: CatalogItem
    details: ProductDetails
    max: number
}


export function AddOrder({product, details, max, className}: AddOrderProps) {
    const dispatch = useAppDispatch()
    const basket = useUserBasket()
    const bd = basket.getDetails(product)
    const [text, setText] = useState('')

    const st = useRef({
        init: false
    })


    useEffect(() => {
        if (!bd) return
        // if (st.current.init) return
        // st.current.init = true
        setText((bd.count).toString())
    }, [bd]);


    function handleAddOrder() {
        dispatch(setBasketProductQuantity({product, details, quantity: 1}))
    }


    function handleChangeQuantity(c: number) {
        if (!bd) return
        const count = bd.count + c

        if (count <= 0) {
            dispatch(removeBasketProduct(product))
            return
        }
        if (count > max) {
            dispatch(setBasketProductQuantity({product, details, quantity: count}))
            return;
        }
        dispatch(setBasketProductQuantity({product, details, quantity: count}))
    }


    function handleInputChangeQuantity(e: React.ChangeEvent<HTMLInputElement>) {
        setText(e.target.value)
    }


    function handleBlur() {
        let v = +text.trim()
        if (!bd) return
        if (v === bd.count) return
        if (Number.isNaN(v)) {
            setText(v.toString() || '1')
            return
        }
        handleChangeQuantity(v)
    }


    return (
        <div className={clsx('addOrder addOrder-container', className)}>
            <div className='addOrder-inner'>
                {bd
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
                                disabled={bd.count >= max}
                            >+</Button>

                            <div
                                className='addOrder-remove remove-btn'
                                onClick={() => dispatch(removeBasketProduct(product))}
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

