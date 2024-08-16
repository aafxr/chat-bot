import clsx from "clsx";
import React from 'react';
import {Button, Caption} from "@telegram-apps/telegram-ui";
import {LazyLoadImage} from "react-lazy-load-image-component";

import {CatalogItem} from "../../core/classes/CatalogItem";
import {CardMode} from "../../types/CardMode";

import './ProductCard.scss'

export type ProductCardProps = {
    item: CatalogItem
    mode?: CardMode
    className?:string
    onClick?: (item: CatalogItem) => unknown
}

export function ProductCard({mode = 'vertical',className,onClick, item}: ProductCardProps) {

    return (
        <div className={clsx('productCard', className, mode)}>
            <div className='productCard-container'>
                <div className='productCard-image'>
                    <LazyLoadImage
                        className='img-abs'
                        src={item.preview}
                        alt={item.title}
                    />
                </div>
                <div className='productCard-content'>
                    <Caption className='productCard-title' weight={"2"}>{item.title}</Caption>
                    <Caption className='productCard-price' weight={"1"}>{item.price}&nbsp;{item.currency}</Caption>
                    <Button className='productCard-btn' size='m'>Подробно</Button>
                </div>
            </div>
        </div>
    );
}

