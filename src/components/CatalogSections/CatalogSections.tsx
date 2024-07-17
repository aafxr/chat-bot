import clsx from "clsx";
import React from 'react';

import {CatalogSection} from "../../core/classes/CatalogSection";
import {Catalog} from "../../core/classes/Catalog";
import Button from "../Button/Button";

import './CatalogSections.scss'


export type CatalogArticlesProps = {
    catalog: Catalog
    className?: string
    selected?: CatalogSection
    onSelect?: (s: CatalogSection) => unknown
}


export function CatalogSections({catalog, className, selected, onSelect}: CatalogArticlesProps) {





    return (
            <div className={clsx('sections sections-container', className)}>
                <div className='sections-list'>
                    {catalog.sections.map(s => (
                        <Button
                            key={s.id}
                            id={`catalog-section-${s.id}`}
                            className={clsx('sections-item', {active: selected?.id === s.id})}
                            onClick={() => onSelect?.(s)}
                        >
                            {s.title}
                        </Button>
                    ))}
                </div>
            </div>
    );
}

