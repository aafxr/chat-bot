import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router";

import {CatalogElement} from "../../components/CatalogElement/CatalogElement";
import {CatalogSections} from "../../components/CatalogSections";
import {CatalogSection} from "../../core/classes/CatalogSection";
import {CatalogItem} from "../../core/classes/CatalogItem";
import {useCatalog} from "../../redux/hooks/useCatalog";
import {Header} from "../../components/Header/Header";
import {Container} from "../../components/Container";

import './Catalog.scss'
import {Title} from "../../components/Title";


export type CatalogProps = {}


type CatalogState = {
    section?: CatalogSection
}

const defaultState: CatalogState = {}


export function CatalogPage({}: CatalogProps) {
    const catalog = useCatalog()
    const navigate = useNavigate()

    const [state, setState] = useState(defaultState)
    const catalogContentRef = useRef<HTMLDivElement>(null)


    useEffect(() => {

        const el = catalogContentRef.current
        if (!el) return
        let options = {
            root: el,
            rootMargin: "0px",
            threshold: 0.1,
        };

        let callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                // Each entry describes an intersection change for one observed
                // target element:
                //   entry.boundingClientRect
                //   entry.intersectionRatio
                //   entry.intersectionRect
                //   entry.isIntersecting
                //   entry.rootBounds
                //   entry.target
                //   entry.time
                console.log(entry)
            });
        };

        let observer = new IntersectionObserver(callback, options);
        observer.observe(el.firstElementChild!)

    }, []);


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


    if (!catalog) return null


    console.log(catalog)
    return (
        <div className='catalog wrapper'>
            <Header/>
            <CatalogSections
                catalog={catalog}
                selected={state.section}
                onSelect={handleSectionSelect}
            />
            <Container>
                <div
                    ref={catalogContentRef}
                    className='catalog-content wrapper-content'
                >

                    {catalog._filter
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
                        ))}
                </div>

            </Container>
        </div>
    )
        ;
}

