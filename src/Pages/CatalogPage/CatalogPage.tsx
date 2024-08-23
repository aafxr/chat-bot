import clsx from "clsx";
import {useLocation, useNavigate} from "react-router";
import React, {useEffect, useRef, useState} from 'react';
import {Headline, List} from "@telegram-apps/telegram-ui";

import {usePersistStateHook} from "../../hooks/usePersistStateHook";
import {CatalogSection} from "../../core/classes/CatalogSection";
import {setCatalog} from "../../redux/slices/catalog-slice";
import {CatalogItem} from "../../core/classes/CatalogItem";
import {ProductCard} from "../../components/ProductCard";
import {useCatalog} from "../../redux/hooks/useCatalog";
import {FooterMenu} from "../../components/FooterMenu";
import {Container} from "../../components/Container";
import {Catalog} from "../../core/classes/Catalog";
import {useAppDispatch} from "../../redux/hooks";
import {Header} from "../../components/Header";
import {CardMode} from "../../types/CardMode";

import './Catalog.scss'


type CatalogState = {
}

const defaultState: CatalogState = {
}




export function CatalogPage() {
    const dispatch = useAppDispatch()
    const {pathname} = useLocation()
    const catalog = useCatalog()
    const navigate = useNavigate()

    const [state, setState] = useState(defaultState)
    const catalogContentRef = useRef<HTMLDivElement>(null)

    const [cardMode, setCardMode,] = usePersistStateHook<CardMode>("cardMode", localStorage.cardMode || "vertical")

    const section = catalog?.getCurrentSection()



    useEffect(() => {
        const el = catalogContentRef.current
        if (!el || !section || section.id === -1) return

        const s = el.querySelector<HTMLDivElement>(`[data-section-id="${section.id}"]`)
        if (!s) return
        el.scrollTop = s.offsetTop
    }, [section]);


    function handleElementClick(item: CatalogItem) {
        navigate(`/${item.id}`)
    }


    function handleSectionSelect(s: CatalogSection) {
        if (section?.id !== s.id) {
            const newCatalog = new Catalog(catalog)
            newCatalog.setSection(s.id)
            dispatch(setCatalog(newCatalog))
            const el = catalogContentRef.current
            if (!el || s.id === -1) return

            const $s = el.querySelector<HTMLDivElement>(`[data-section-id="${s.id}"]`)
            if (!$s) return
            el.scrollTop = $s.offsetTop
        }
    }


    // useEffect(() => {
    //     const el = catalogContentRef.current
    //     if(!el || !section) return
    //
    //     const node = el.querySelector(`[data-section-id="${section.id}"]`)
    //     if(!node) return
    //     const rect = node.getBoundingClientRect()
    //
    //     el.scrollTop = rect.top
    // }, [section]);


    return (
        <div className={clsx('catalog wrapper', pathname !== '/' && 'hidden')}>
            <Header onSectionSelect={handleSectionSelect}/>
            <div className='wrapper-content'>
                <Container ref={catalogContentRef} className="catalog-content">
                    <List>
                        {catalog && (
                            catalog._filter
                                ? (
                                    <section className='catalog-section'>
                                        <Headline weight={"1"} className='catalog-section-title'>Результаты
                                            поиска</Headline>
                                        {
                                            (() => {
                                                const items = catalog.getFilteredItems()
                                                return items.length ? (
                                                    <div className={clsx('catalog-elements productsList', cardMode)}>
                                                        {
                                                            items.map(e => (
                                                                <ProductCard
                                                                    key={e.id}
                                                                    to={`/${e.id}`}
                                                                    className='catalog-element'
                                                                    item={e}
                                                                    onClick={handleElementClick}
                                                                    mode={cardMode}
                                                                />
                                                            ))
                                                        }
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <p><b>{catalog._filter}</b>:&nbsp;по данному запросу товар не
                                                            найден, попробуйте изменить форму запрос</p>
                                                    </div>
                                                )
                                            })()
                                        }
                                    </section>
                                ) : catalog.getSectionsWithoutAll().map(s => (
                                    <section
                                        key={s.id} className='catalog-section'
                                        data-section-id={s.id}
                                    >
                                        <Headline weight={"1"} className='catalog-section-title'>{s.title}</Headline>
                                        <div className={clsx('catalog-elements productsList', cardMode)}>
                                            {catalog.getElements(s.items).map(e => (
                                                <ProductCard
                                                    key={e.id}
                                                    to={`/${e.id}`}
                                                    className='catalog-element'
                                                    item={e}
                                                    onClick={handleElementClick}
                                                    mode={cardMode}
                                                />
                                            ))}
                                        </div>
                                    </section>
                                ))
                        )}
                    </List>
                </Container>

            </div>
            <div className='wrapper-footer-spacer'/>
            <FooterMenu/>
        </div>
    )
}
