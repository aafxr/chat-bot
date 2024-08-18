import clsx from "clsx";
import {Headline, List} from "@telegram-apps/telegram-ui";
import {useLocation, useNavigate} from "react-router";
import React, {useEffect, useRef, useState} from 'react';

import {CatalogSection} from "../../core/classes/CatalogSection";
import {ProductCard} from "../../components/ProductCard";
import {CatalogItem} from "../../core/classes/CatalogItem";
import {useCatalog} from "../../redux/hooks/useCatalog";
import {useMemoScroll} from "../../hooks/useMemoScroll";
import {Container} from "../../components/Container";
import {Header} from "../../components/Header";

import './Catalog.scss'
import {usePersistStateHook} from "../../hooks/usePersistStateHook";
import {CardMode} from "../../types/CardMode";


type CatalogState = {
    section?: CatalogSection
    scrollPrevPos: boolean
}

const defaultState: CatalogState = {
    scrollPrevPos: false
}


const CATALOG_CONTENT_SCROLL = 'catalog_content_scroll'


export function CatalogPage() {
    const {pathname} = useLocation()
    const catalog = useCatalog()
    const navigate = useNavigate()

    const [state, setState] = useState(defaultState)
    const catalogContentRef = useRef<HTMLDivElement>(null)
    const handlers = useMemoScroll<HTMLDivElement>(CATALOG_CONTENT_SCROLL)

    const [cardMode, setCardMode,] = usePersistStateHook<CardMode>("cardMode", localStorage.cardMode || "vertical")


    useEffect(() => {
        const el = catalogContentRef.current
        const section = state.section
        if (!el || !section) return

        const s = el.querySelector<HTMLDivElement>(`[data-section-id="${section.id}"]`)
        if (!s) return
        el.scrollTop = s.offsetTop
    }, [state.section]);


    function handleElementClick(item: CatalogItem) {
        navigate(`/${item.id}`)
    }


    function handleSectionSelect(s: CatalogSection) {
        if (state.section?.id !== s.id) {
            setState({...state, section: s})
            const el = catalogContentRef.current
            if (!el) return

            const $s = el.querySelector<HTMLDivElement>(`[data-section-id="${s.id}"]`)
            if (!$s) return
            el.scrollTop = $s.offsetTop
        }
    }


    return (
        <div className={clsx('catalog wrapper', pathname !== '/' && 'hidden')}>
            <Header
                selectedSection={state.section}
                onSectionSelect={handleSectionSelect}
            />
            <div
                className='wrapper-content'
                {...handlers}
            >
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
                                ) : catalog.sections.map(s => (
                                    <section
                                        key={s.id} className='catalog-section'
                                        data-section-id={s.id}
                                    >
                                        <Headline weight={"1"} className='catalog-section-title'>{s.title}</Headline>
                                        <div className={clsx('catalog-elements productsList', cardMode)}>
                                            {catalog.getElements(s.items).map(e => (
                                                <ProductCard
                                                    key={e.id}
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
        </div>
    )
}
