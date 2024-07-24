import clsx from "clsx";
import React from 'react';


import {useFavoriteHandlers} from "../../hooks/useFavoriteHandlers";
import {Button, Card, ThemeProvider} from "react-bootstrap";
import {CatalogItem} from "../../core/classes/CatalogItem";
import {OrderItem} from "../../core/classes/OrderItem";
import {useFormatter} from "../../hooks/useFormatter";
import {CartIcon, HeartIcon, PenIcon} from "../svg";
import {useOrder} from "../../redux/hooks/useOrder";
import {useAppSelector} from "../../redux/hooks";
import {IconButton} from "../IconButton";

import './CatalogElement.scss'


export type CatalogElementProps = {
    className?: string
    item: CatalogItem
    onClick?: (item: CatalogItem) => unknown

}

export function CatalogElement({item, className, onClick}: CatalogElementProps) {
    const order = useOrder()
    const {favorite} = useAppSelector(s => s.catalog)
    const {addFavorite, removeFavorite} = useFavoriteHandlers()
    const isFavorite = !!favorite[item.id]

    const orderItem: OrderItem | undefined = order.orders[item.id]

    const formatter = useFormatter(item.currency)

    const prefixes = {
        "card": "product-card",
        "card-img-top": "product-card-img-top",
        "card-subtitle": "product-card-subtitle",
        "card-body": "product-card-body",
        // "btn": "product-btn"
    }

    return (
        <ThemeProvider prefixes={prefixes}>
            <Card className={className}>
                <div className='product-buttons'>
                    <IconButton
                        className={clsx('product-topBtn', {active: isFavorite})}
                        onClick={() => isFavorite ? removeFavorite(item) : addFavorite(item)}
                    >
                        <HeartIcon className='icon-16'/>
                    </IconButton>
                    <IconButton className='product-topBtn'>
                        <PenIcon className='icon-16'/>
                    </IconButton>
                </div>
                <Card.Img variant="top" src={item.preview}/>
                <Card.Body className='product-card-body'>
                    <Card.Subtitle className='mb-2'>{item.title}</Card.Subtitle>
                    <div className='product-footer'>
                        <span className='product-price '>
                            {formatter.format(+item.price)}
                        </span>
                        <Button
                            className='product-btn'
                            variant="primary"
                            onClick={() => onClick?.(item)}
                        >
                            Подробно&nbsp;{orderItem ? <CartIcon className='icon-16' /> : '' }
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </ThemeProvider>
    )
}

