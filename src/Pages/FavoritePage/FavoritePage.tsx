import React, {useMemo} from 'react';
import {useNavigate} from "react-router";

import {useArrowBack} from "../../redux/hooks/useArrowBack";
import {ProductCard} from "../../components/ProductCard";
import {FooterMenu} from "../../components/FooterMenu";
import {PageHeader} from "../../components/PageHeader";
import {Container} from "../../components/Container";
import {useAppSelector} from "../../redux/hooks";

import './FavoritePage.scss'
import {Block} from "../../components/Block";
import {Caption} from "@telegram-apps/telegram-ui";


export function FavoritePage() {
    useArrowBack()
    const {favorite, catalog} = useAppSelector(s => s.catalog)
    const navigate = useNavigate()


    const items = useMemo(() => {
        if (!catalog) return []
        const ids = Object.values(favorite)
        return catalog.getElements(ids)
    }, [favorite, catalog])


    return (
        <div className='favorite wrapper'>
                {/*<PageHeader title='Избранное' />*/}

            <div className='wrapper-content mt-4'>
                {!items.length && (
                    <Block>
                        <Caption weight='2'>У вас пока нет товаров добавленых в избранное</Caption>
                    </Block>
                )}
                <Container>
                    <div className='favorite-content productsList'>
                        {items.map(el =>
                                <ProductCard
                                    key={el.id}
                                    item={el}
                                    onClick={el => navigate(`/${el.id}`)}
                                />
                            )
                        }
                    </div>
                </Container>
            </div>
            <div className='wrapper-footer-spacer'/>
            <FooterMenu/>
        </div>
    );
}
