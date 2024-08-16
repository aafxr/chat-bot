import clsx from "clsx";
import React, {useEffect, useRef} from 'react';
import {TabsItem} from "@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem";

import {CatalogSection} from "../../core/classes/CatalogSection";
import {Catalog} from "../../core/classes/Catalog";

import './CatalogSections.scss'


export type CatalogArticlesProps = {
    catalog: Catalog
    className?: string
    selected?: CatalogSection
    onSelect?: (s: CatalogSection) => unknown
}


export function CatalogSections({catalog, className, selected, onSelect}: CatalogArticlesProps) {
    const sectionsListRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        const el = sectionsListRef.current
        if(!el || !selected) return

        const s = el.querySelector<HTMLDivElement>(`[data-id="${selected.id}"]`)
        if(!s) return

        el.scrollLeft = s.offsetLeft - el.clientWidth / 2 + s.clientWidth / 2
    }, [selected]);


    // function handleWheel(e: React.WheelEvent<HTMLDivElement>){
    //     const el = e.currentTarget
    //     const {deltaY} = e
    //     el.scrollLeft = el.scrollLeft + deltaY * 2
    // }



    return (
        <div className={clsx('sections', className)}>
            <div className='sections-container'>
                <div
                    className='sections-list'

                >
                    {catalog.sections.map(s => (
                        <TabsItem
                            key={s.id}
                            className={clsx('sections-tab flex-0', {selected: selected?.id === s.id})}
                            selected={selected?.id === s.id}
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

/*
<div
                    ref={sectionsListRef}
                    className='sections-list'
                    // onWheel={handleWheel}
                >
                    {catalog.sections.map(s => (
                        <Button
                            key={s.id}
                            className={clsx('sections-item', {active: selected?.id === s.id})}
                            onClick={() => onSelect?.(s)}
                            data-id={s.id}
                        >
                            {s.title}
                        </Button>
                    ))}
                </div>
 */

