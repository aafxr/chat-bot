import clsx from "clsx";
import React from 'react';
import {Button, Caption} from "@telegram-apps/telegram-ui";

import {removeBasketProduct, setBasketProductQuantity} from "../../redux/slices/user-slice";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useCatalog} from "../../redux/hooks/useCatalog";
import {BasketDetail} from "../../core/classes/Basket";
import {useAppDispatch} from "../../redux/hooks";
import {Counter} from "../Counter";

import './BasketDetailsComponent.scss'


type BasketDetailsComponentProps = {
    bd: BasketDetail
    className?: string
}


export function BasketDetailsComponent({bd, className}: BasketDetailsComponentProps) {
    const dispatch = useAppDispatch()
    const catalog = useCatalog()
    const product = catalog?.getElementByID(bd.id)


    function handleChangeQuantity(c: number) {
        if (c <= 0) {
            handleRemoveBasketProduct()
            return
        }

        bd.setCount(c)
        dispatch(setBasketProductQuantity(bd))
    }

    function handleRemoveBasketProduct() {
        try {
            Telegram.WebApp.showConfirm(`Удалить товар: ${bd.title}?`, (confirm) => {
                if (product && confirm) {
                    dispatch(removeBasketProduct(product))
                }
            })
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <div className={clsx('basketItem basketItem-container', className)}>
            <div className='basketItem-image'>
                <LazyLoadImage className='img-abs' src={product?.preview} alt={bd.title}/>
            </div>
            <div className='basketItem-inner'>
                <Caption weight={'2'}>{bd.title}</Caption>
                <div className='basketItem-units'>
                    <Caption>{bd.count}&nbsp;{bd.measure}</Caption>
                    <Caption>{bd.packCount}&nbsp;{bd.packMeasure}</Caption>
                </div>
                <div className='basketItem-footer'>
                    <Counter className='basketItem-counter' onChange={handleChangeQuantity} initValue={bd.packCount}/>
                    <Button
                        className='basketItem-removeBtn'
                        mode='plain'
                        onClick={handleRemoveBasketProduct}
                    >
                        Удалить
                    </Button>
                </div>
            </div>

        </div>
    );
}
