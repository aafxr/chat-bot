import clsx from "clsx";
import React from 'react';
import {useNavigate} from "react-router";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Button, Caption, IconButton} from "@telegram-apps/telegram-ui";

import {useFavoriteHandlers} from "../../hooks/useFavoriteHandlers";
import {useUserBasket} from "../../redux/hooks/useUserBasket";
import {CatalogItem} from "../../core/classes/CatalogItem";
import {useAppUser} from "../../redux/hooks/useAppUser";
import {CartIcon, HeartIcon, PenIcon} from "../svg";
import {Currency} from "../../constants/currency";
import {useAppSelector} from "../../redux/hooks";
import {CardMode} from "../../types/CardMode";

import './ProductCard.scss'

export type ProductCardProps = {
    to?: string
    item: CatalogItem
    mode?: CardMode
    className?: string
    onClick?: (item: CatalogItem) => unknown
}

export function ProductCard({mode = 'vertical', to, className, onClick, item}: ProductCardProps) {
    const navigate = useNavigate()
    const user = useAppUser()
    const {addFavorite, removeFavorite} = useFavoriteHandlers()
    const {favorite} = useAppSelector(s => s.catalog)
    const isFavorite = !!favorite[item.id]

    const basket = useUserBasket()
    const inBasket = basket.hasProduct(item.id)


    function handleCardClick(){
        if(!to) return
        navigate(to)
    }

    function handleFavIconClick(e: React.MouseEvent<HTMLButtonElement>){
        e.stopPropagation()
        isFavorite ? removeFavorite(item) : addFavorite(item)
    }


    return (
        <div
            className={clsx('productCard',{"productCard-redirect": !!to}, className, mode)}
            onClick={handleCardClick}
        >
            <div className='productCard-container'>
                <div className='productCard-image'>
                    <LazyLoadImage
                        className='img-abs'
                        src={item.preview}
                        alt={item.title}
                    />
                    <div className='productCard-buttons'>
                        <IconButton mode="plain" onClick={handleFavIconClick}>
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
                    <Caption className='productCard-title' >{item.title}</Caption>
                    <div className='productCard-footer'>
                        <Caption className='productCard-price' weight={"1"}>{item.price}&nbsp;{Currency[item.currency] || item.currency}</Caption>
                        <Button
                            className='productCard-btn'
                            size='m'
                            onClick={() => onClick?.(item)}
                        >
                            Подробно&nbsp;{inBasket ? <CartIcon className='icon-16'/> : ''}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

