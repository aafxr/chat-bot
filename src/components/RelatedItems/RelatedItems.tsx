import clsx from "clsx";
import {useNavigate} from "react-router";
import React, {useEffect, useState} from 'react';
import {Button, Offcanvas} from "react-bootstrap";

import {CatalogService} from "../../core/services/CatalogService";
import {ProductDetails} from "../../core/classes/ProductDetails";
import {CatalogElement} from "../CatalogElement/CatalogElement";
import {CatalogItem} from "../../core/classes/CatalogItem";
import {useCatalog} from "../../redux/hooks/useCatalog";

import './RelatedItems.scss'


export type RelatedItemsProps = {
    className?: string
    productDetails: ProductDetails
}


type RelatedItemsState = {
    open: boolean
    related: ProductDetails[]
    relatedLoading: boolean
    relatedRequested: boolean
}

const defaultState: RelatedItemsState = {
    open: false,
    related: [],
    relatedLoading: false,
    relatedRequested: false
}

export function RelatedItems({productDetails, className}: RelatedItemsProps) {
    const navigate = useNavigate()
    const catalog = useCatalog()
    const [state, setState] = useState({...defaultState})

    useEffect(() => {
        setState({...defaultState})
    }, []);


    useEffect(() => {
        if (!productDetails || state.relatedLoading || state.relatedRequested) return

        setState(p => ({...p, elatedLoading: true, relatedRequested: true}))
        CatalogService.relatedProducts(
            productDetails,
            (e?: Error, p?: ProductDetails[]) => {
                if (p) setState(prev => ({...prev, related: p}))
            })
            .catch(console.error)
            .finally(() => setState(p => ({...p, relatedLoading: false})))
    }, [productDetails, state]);


    const relatedItems = (catalog && state.related.map(r => catalog.getElementByArticle(r.ProductArticleForChatBot))) || []


    function handleToggleCanvas() {
        setState(p => ({...p, open: !state.open}))
    }

    const handleItemClick = (item: CatalogItem) => navigate(`/${item.id}`)


    return (
        <div className={clsx('productDetails', {open: state.open}, className)}>
            {relatedItems.length && (
                <>
                    <Button
                        className='productDetails-button'
                        onClick={handleToggleCanvas}
                    >Сопутствующие товары</Button>
                    <Offcanvas
                        className='productDetails-offcanvas'
                        placement='bottom'
                        show={state.open}
                        onHide={handleToggleCanvas}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Сопутствующие товары</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <div className='productDetails-container'>
                                <div className='productDetails-items'>
                                    {relatedItems.map(r => (
                                        <CatalogElement
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
                </>
            )}
        </div>
    );
}

