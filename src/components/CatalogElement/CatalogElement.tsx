import clsx from "clsx";
import React from 'react';

import {CatalogItem} from "../../core/classes/CatalogItem";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Button from "../Button/Button";

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
        maximumFractionDigits:2,
        minimumFractionDigits: 2
    })
    return (
        <div className={clsx('element', className)}>
            <div className='element-content'>
                <div className='element-inner'>
                    <div className='element-img'>
                        <LazyLoadImage
                            alt={item.title}
                            src={item.preview}
                        />
                    </div>
                    <div className='element-title'>{item.title}</div>
                </div>
                <div className='element-footer'>
                    <div className='element-price'>{formatter.format(+item.price)}</div>
                    <Button className='element-button' onClick={() => onClick?.(item)}>
                        Подробно
                    </Button>
                </div>
            </div>

        </div>
    );
}

