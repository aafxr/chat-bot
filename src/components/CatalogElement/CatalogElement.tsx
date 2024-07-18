import clsx from "clsx";
import React from 'react';

import {CatalogItem} from "../../core/classes/CatalogItem";

import './CatalogElement.scss'
import {Button, Card} from "react-bootstrap";


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

    return (
        <Card>
            <Card.Img variant="top" src={item.preview}/>
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Button
                    variant="primary"
                    onClick={() => onClick?.(item)}
                >
                    Подробно
                </Button>
            </Card.Body>
        </Card>
    )
    // return (
    //     <div className={clsx('element element-content', className)}>
    //         <div className='element-img'>
    //             <img
    //                 alt={item.title}
    //                 src={item.preview}
    //             />
    //         </div>
    //         <div className='element-title'>{item.title}</div>
    //         <div className='element-footer'>
    //             <div className='element-price'>{formatter.format(+item.price)}</div>
    //             <Button className='element-button' onClick={() => onClick?.(item)}>
    //                 Подробно
    //             </Button>
    //         </div>
    //
    //     </div>
    // );
}

