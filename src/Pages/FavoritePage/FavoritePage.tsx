import React, {useMemo} from 'react';
import {useNavigate} from "react-router";

import {ProductCard} from "../../components/ProductCard";
import {FooterMenu} from "../../components/FooterMenu";
import {Container} from "../../components/Container";
import {Caption} from "@telegram-apps/telegram-ui";
import {useAppSelector} from "../../redux/hooks";
import {Block} from "../../components/Block";

import './FavoritePage.scss'


export function FavoritePage() {
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
