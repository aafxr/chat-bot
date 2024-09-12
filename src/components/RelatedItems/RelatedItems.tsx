import clsx from "clsx";
import React from 'react';
import {useNavigate} from "react-router";
import {Offcanvas} from "react-bootstrap";
import {OffcanvasProps} from "react-bootstrap/Offcanvas";

import {Product} from "../../core/classes/Product";
import {ProductCard} from "../ProductCard";

import './RelatedItems.scss'


export interface RelatedItemsProps extends OffcanvasProps {
    className?: string
    items: Product[]
}


export function RelatedItems({items, className, ...props}: RelatedItemsProps) {
    const navigate = useNavigate()


    const handleItemClick = (item: Product) => navigate(`/${item.id}`)


    return (
        <div className={clsx('productDetails', className)}>
            {!!items.length && (
                <Offcanvas
                    className='productDetails-offcanvas'
                    placement='bottom'
                    {...props}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Сопутствующие товары</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className='productDetails-container'>
                            <div className='productDetails-items'>
                                {items.map(r => (
                                    <ProductCard
                                        key={r.id}
                                        className='productDetails-item'
                                        item={r}
                                        onClick={handleItemClick}
                                    />
                                ))}
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            )}
        </div>
    );
}

