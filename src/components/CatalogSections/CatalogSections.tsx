import clsx from "clsx";
import React, {useEffect, useRef} from 'react';
import {TabsItem} from "@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem";

import {CatalogSection} from "../../core/classes/CatalogSection";
import {Catalog} from "../../core/classes/Catalog";

import './CatalogSections.scss'


export type CatalogArticlesProps = {
    catalog: Catalog
    className?: string
    onSelect?: (s: CatalogSection) => unknown
}


export function CatalogSections({catalog, className, onSelect}: CatalogArticlesProps) {
    const listRef = useRef<HTMLDivElement>(null)
    const selected = catalog.getCurrentSection()
    const sections = catalog.sections.slice(1)
    const all = catalog.sections[0]
    const isFilter = !!catalog._filter

    console.log(selected)
    console.log(all)


    useEffect(() => {
        if(selected.id === -1 && listRef.current){
            listRef.current.scrollLeft = 0
        }
        const el = listRef.current
        if(!el) return

        const s = el.querySelector<HTMLDivElement>(`[data-id="${selected.id}"]`)
        if(!s) return

        el.scrollLeft = s.offsetLeft - el.clientWidth / 2 + s.clientWidth / 2
    }, [selected]);


    return (
        <div className={clsx('sections', className)}>
            <div className='sections-container'>
                <div className='section-all'>
                    <TabsItem
                        className={clsx('sections-tab flex-0', {selected: selected?.id === all.id})}
                        selected={selected?.id === all.id}
                        onClick={() => onSelect?.(all)}
                        data-id={all.id}
                    >
                        {all.title}
                    </TabsItem>
                </div>
                <div ref={listRef} className='sections-list'>
                    {sections.map(s => (
                            <TabsItem
                                key={s.id}
                                className={clsx('sections-tab flex-0', {selected:!isFilter && selected?.id === s.id})}
                                selected={!isFilter && selected?.id === s.id}
                                onClick={() => onSelect?.(s)}
                                data-id={s.id}
                            >
                                {s.title}
                            </TabsItem>
                        ))}
                </div>
            </div>
        </div>
    );
}
