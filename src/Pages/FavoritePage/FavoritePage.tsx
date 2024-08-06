import React, {useMemo} from 'react';
import {useNavigate} from "react-router";

import {CatalogElement} from "../../components/CatalogElement";
import {Container} from "../../components/Container";
import {useAppSelector} from "../../redux/hooks";
import {Spacer} from "../../components/Spacer";
import {Title} from "../../components/Title";

import './FavoritePage.scss'
import {PageHeader} from "../../components/PageHeader";


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
            <PageHeader title='Избранное' />
            <div className='wrapper-content mt-2'>
                <Container>
                    <div className='favorite-content'>
                        {items.map(el =>
                                <CatalogElement
                                    key={el.id}
                                    item={el}
                                    onClick={el => navigate(`/${el.id}`)}
                                />
                            )
                        }
                    </div>
                </Container>
                <Spacer/>
            </div>
        </div>
    );
}
