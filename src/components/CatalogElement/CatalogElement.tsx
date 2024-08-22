import clsx from "clsx";
import React from 'react';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Caption, Button, IconButton, Text} from "@telegram-apps/telegram-ui";

import {useFavoriteHandlers} from "../../hooks/useFavoriteHandlers";
import {CatalogItem} from "../../core/classes/CatalogItem";
import {useAppUser} from "../../redux/hooks/useAppUser";
import {OrderItem} from "../../core/classes/OrderItem";
import {useFormatter} from "../../hooks/useFormatter";
import {Card, ThemeProvider} from "react-bootstrap";
import {CartIcon, HeartIcon, PenIcon} from "../svg";
import {useAppSelector} from "../../redux/hooks";

import './CatalogElement.scss'
import {useUserBasket} from "../../redux/hooks/useUserBasket";


export type CatalogElementProps = {
    className?: string
    item: CatalogItem
    onClick?: (item: CatalogItem) => unknown

}

export function CatalogElement({item, className, onClick}: CatalogElementProps) {
    const user = useAppUser()
    const basket = useUserBasket()
    const {favorite} = useAppSelector(s => s.catalog)
    const {addFavorite, removeFavorite} = useFavoriteHandlers()
    const isFavorite = !!favorite[item.id]

    const inBasket = basket.hasProduct(item.id)

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
                    {user?.canEdite && (
                        <IconButton className='product-topBtn'>
                            <PenIcon className='icon-16'/>
                        </IconButton>
                    )}
                </div>
                <Card.Body className='product-card-body'>
                    <div className={'product-image'}>
                        <LazyLoadImage
                            className='img-abs'
                            src={item.preview}
                            alt={item.title}
                            loading='lazy'
                        />
                    </div>
                    <Card.Subtitle className='mb-2'>
                        <Caption level={"2"} weight={"1"}>{item.title}</Caption>
                    </Card.Subtitle>
                    <div className='product-footer'>
                        <Text weight={"1"} className='product-price '>
                            {formatter.format(+item.price)}
                        </Text>
                        <Button
                            size={"s"}
                            className='product-btn'
                            onClick={() => onClick?.(item)}
                        >
                            Подробно&nbsp;{inBasket ? <CartIcon className='icon-16'/> : ''}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </ThemeProvider>
    )
}


/*
<ThemeProvider prefixes={prefixes}>
            <Card className={className}>
                <div className='product-buttons'>
                    <IconButton
                        className={clsx('product-topBtn', {active: isFavorite})}
                        onClick={() => isFavorite ? removeFavorite(item) : addFavorite(item)}
                    >
                        <HeartIcon className='icon-16'/>
                    </IconButton>
                    {user?.canEdite && (
                        <IconButton className='product-topBtn'>
                            <PenIcon className='icon-16'/>
                        </IconButton>
                    )}
                </div>
                <Card.Body className='product-card-body'>
                    <div className={'product-image'}>
                        <LazyLoadImage
                            className='img-abs'
                            src={item.preview}
                            alt={item.title}
                            loading='lazy'
                        />
                    </div>
                    <Card.Subtitle className='mb-2'>
                        <Caption level={"2"} weight={"1"}>{item.title}</Caption>
                    </Card.Subtitle>
                    <div className='product-footer'>
                        <Text weight={"1"} className='product-price '>
                            {formatter.format(+item.price)}
                        </Text>
                        <Button
                            size={"s"}
                            className='product-btn'
                            onClick={() => onClick?.(item)}
                        >
                            Подробно&nbsp;{orderItem ? <CartIcon className='icon-16'/> : ''}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </ThemeProvider>
 */
