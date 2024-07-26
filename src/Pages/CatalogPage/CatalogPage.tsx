import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router";

import {ProductPlaceholder} from "../../components/ProductPlaceholder";
import {CatalogSections} from "../../components/CatalogSections";
import {CatalogSection} from "../../core/classes/CatalogSection";
import {CatalogElement} from "../../components/CatalogElement";
import {CatalogItem} from "../../core/classes/CatalogItem";
import {useCatalog} from "../../redux/hooks/useCatalog";
import {useMemoScroll} from "../../hooks/useMemoScroll";
import {Container} from "../../components/Container";
import {Spacer} from "../../components/Spacer";
import {Header} from "../../components/Header";
import {Title} from "../../components/Title";

import './Catalog.scss'


type CatalogState = {
    section?: CatalogSection
    scrollPrevPos: boolean
}

const defaultState: CatalogState = {
    scrollPrevPos: false
}


const CATALOG_CONTENT_SCROLL = 'catalog_content_scroll'


export function CatalogPage() {
    const catalog = useCatalog()
    const navigate = useNavigate()

    const [state, setState] = useState(defaultState)
    const catalogContentRef = useRef<HTMLDivElement>(null)
    const handlers = useMemoScroll<HTMLDivElement>(CATALOG_CONTENT_SCROLL)


    useEffect(() => {
        const el = catalogContentRef.current
        if (!el || !catalog || state.scrollPrevPos) return
        setState(p => ({...p, scrollPrevPos: true}))

        try {
            const pos = JSON.parse(localStorage.getItem(CATALOG_CONTENT_SCROLL)!)
            el.scrollTo({left: +pos.scrollTop, top: +pos.scrollLeft})
        } catch (e) {}
    }, [catalog, state]);
    console.log(state)


    useEffect(() => {
        const el = catalogContentRef.current
        const section = state.section
        if (!el || !section) return

        const s = el.querySelector<HTMLDivElement>(`[data-section-id="${section.id}"]`)
        if (!s) return
        el.scrollTop = s.offsetTop - 108
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
            el.scrollTop = $s.offsetTop - 108
        }
    }


    return (
        <div className='catalog wrapper'>
            <Header/>
            {!!catalog && <CatalogSections
                catalog={catalog}
                selected={state.section}
                onSelect={handleSectionSelect}
            />}
            <div
                ref={catalogContentRef}
                className='catalog-content wrapper-content'
                {...handlers}
            >
                <Container>
                    {catalog
                        ? (catalog._filter
                                ? (
                                    <section className='catalog-section'>
                                        <Title className='catalog-section-title'>Результаты поиска</Title>
                                        <div className='catalog-elements'>
                                            {catalog.getFilteredItems().map(e => (
                                                <CatalogElement
                                                    key={e.id}
                                                    className='catalog-element'
                                                    item={e}
                                                    onClick={handleElementClick}
                                                />
                                            ))}
                                        </div>
                                    </section>
                                ) : catalog.sections.map(s => (
                                    <section
                                        key={s.id} className='catalog-section'
                                        data-section-id={s.id}
                                    >
                                        <Title className='catalog-section-title'>{s.title}</Title>
                                        <div className='catalog-elements'>
                                            {catalog.getElements(s.items).map(e => (
                                                <CatalogElement
                                                    key={e.id}
                                                    className='catalog-element'
                                                    item={e}
                                                    onClick={handleElementClick}
                                                />
                                            ))}
                                        </div>
                                    </section>
                                ))
                        ) : (
                            <Container>
                                <div className='catalog-elements'>
                                    {/*{Array.from({length: 8})*/}
                                    {/*    .map((_, idx) => <ProductPlaceholder key={idx}/>)*/}
                                    {/*}*/}
                                </div>
                            </Container>
                        )
                    }
                    <Spacer/>

                </Container>
            </div>
        </div>
    )
}
