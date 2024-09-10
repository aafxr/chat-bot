import clsx from "clsx";
import React from 'react';
import {Button, Caption} from "@telegram-apps/telegram-ui";

import {removeBasketProduct, setBasketProductQuantity} from "../../redux/slices/user-slice";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useCatalog} from "../../redux/hooks/useCatalog";
import {BasketDetail} from "../../core/classes/Basket";
import {useAppDispatch} from "../../redux/hooks";
import {useNavigate} from "react-router";
import {Counter} from "../Counter";

import './BasketDetailsComponent.scss'


type BasketDetailsComponentProps = {
    bd: BasketDetail
    className?: string
}


export function BasketDetailsComponent({bd, className}: BasketDetailsComponentProps) {
    const navigate = useNavigate()
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
        if (!product) return
        try {
            if (Telegram.WebApp.showConfirm) {
                Telegram.WebApp.showConfirm(`Удалить товар: ${bd.title}?`, (confirm) => {
                    if (confirm) dispatch(removeBasketProduct(product))
                })
                return
            }
            dispatch(removeBasketProduct(product))
        } catch (e) {
            console.error(e)
        }
    }


    function handleNavigate() {
        if (!product) return
        navigate(`/${product.id}`)
    }


    return (
        <div className={clsx('basketItem basketItem-container', className)}>
            <div className='basketItem-image'>
                <LazyLoadImage
                    className='img-abs'
                    src={product?.preview}
                    alt={bd.title}
                    onClick={handleNavigate}
                />
            </div>
            <div className='basketItem-inner'>
                <Caption
                    weight={'2'}
                    onClick={handleNavigate}
                >{bd.title}</Caption>
                <div className='basketItem-units'>
                    <Caption>{bd.count}&nbsp;{bd.measure}</Caption>
                    <Caption>{bd.packCount}&nbsp;{bd.packMeasure}</Caption>
                </div>
                <div className='basketItem-footer'>
                    <Counter className='basketItem-counter' onChange={handleChangeQuantity}
                             initValue={bd.packCount}/>
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
