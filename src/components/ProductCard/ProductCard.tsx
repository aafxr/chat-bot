import clsx from "clsx";
import React from 'react';
import {Button, Caption, IconButton} from "@telegram-apps/telegram-ui";
import {LazyLoadImage} from "react-lazy-load-image-component";

import {CatalogItem} from "../../core/classes/CatalogItem";
import {CardMode} from "../../types/CardMode";

import './ProductCard.scss'
import {CartIcon, HeartIcon, PenIcon} from "../svg";
import {useFavoriteHandlers} from "../../hooks/useFavoriteHandlers";
import {useAppSelector} from "../../redux/hooks";
import {useOrder} from "../../redux/hooks/useOrder";
import {OrderItem} from "../../core/classes/OrderItem";
import {useAppUser} from "../../redux/hooks/useAppUser";

export type ProductCardProps = {
    item: CatalogItem
    mode?: CardMode
    className?: string
    onClick?: (item: CatalogItem) => unknown
}

export function ProductCard({mode = 'vertical', className, onClick, item}: ProductCardProps) {
    const user = useAppUser()
    const {addFavorite, removeFavorite} = useFavoriteHandlers()
    const {favorite} = useAppSelector(s => s.catalog)
    const isFavorite = !!favorite[item.id]

    const order = useOrder()
    const orderItem: OrderItem | undefined = order.orders[item.id]


    return (
        <div className={clsx('productCard', className, mode)}>
            <div className='productCard-container'>
                <div className='productCard-image'>
                    <LazyLoadImage
                        className='img-abs'
                        src={item.preview}
                        alt={item.title}
                    />
                    <div className='productCard-buttons'>
                        <IconButton
                            mode="plain"
                            onClick={() => isFavorite ? removeFavorite(item) : addFavorite(item)}
                        >
                            <HeartIcon className={clsx('productCard-icon icon-16', {active: isFavorite})}/>
                        </IconButton>

                        {user?.canEdite && (
                        <IconButton
                            mode="plain"
                        >
                            <PenIcon className='productCard icon-16'/>
                        </IconButton>
                            )}

                    </div>
                </div>
                <div className='productCard-content'>
                    <Caption className='productCard-title' weight={"2"}>{item.title}</Caption>
                    <Caption className='productCard-price' weight={"1"}>{item.price}&nbsp;{item.currency}</Caption>
                    <Button className='productCard-btn' size='m'>
                        Подробно&nbsp;{orderItem ? <CartIcon className='icon-16'/> : ''}
                    </Button>
                </div>
            </div>
        </div>
    );
}

