import clsx from "clsx";
import React from 'react';


import {Button, Card, ThemeProvider} from "react-bootstrap";
import {CatalogItem} from "../../core/classes/CatalogItem";
import {useCatalog} from "../../redux/hooks/useCatalog";
import {IconButton} from "../IconButton";
import {PenIcon} from "../svg/PenIcon";
import {HeartIcon} from "../svg";

import './CatalogElement.scss'
import {useAppSelector} from "../../redux/hooks";
import {useFavoriteHandlers} from "../../hooks/useFavoriteHandlers";


export type CatalogElementProps = {
    className?: string
    item: CatalogItem
    onClick?: (item: CatalogItem) => unknown
    favorite?: boolean
    onFavorite?: (v: boolean) => unknown

}


export function CatalogElement({item, className, onClick}: CatalogElementProps) {
    const {favorite} = useAppSelector(s => s.catalog)
    const {addFavorite, removeFavorite} = useFavoriteHandlers()
    const isFavorite = !!favorite[item.id]

    const formatter = new Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency: item.currency,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    })

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
                            Подробно
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </ThemeProvider>
    )
}

