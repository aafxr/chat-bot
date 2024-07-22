import React from 'react';

import {Button, Card, ThemeProvider} from "react-bootstrap";
import {CatalogItem} from "../../core/classes/CatalogItem";

import './CatalogElement.scss'


export type CatalogElementProps = {
    className?: string
    item: CatalogItem
    onClick?: (item: CatalogItem) => unknown
}


export function CatalogElement({item, className, onClick}: CatalogElementProps) {
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
        // "card-body": "product-card-body",
        // "btn": "product-btn"
    }

    return (
        <ThemeProvider prefixes={prefixes}>
            <Card className={className}>
                <Card.Img variant="top" src={item.preview}/>
                <Card.Body className='product-body'>
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

