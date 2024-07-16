import React from 'react';
import {Header} from "../../components/Header/Header";
import {Catalog} from "../../core/classes/Catalog";

import Button from "../../components/Button/Button";
import {Container} from "../../components/Container";

import './Catalog.scss'
import {CatalogElement} from "../../components/CatalogElement/CatalogElement";
import {CatalogItem} from "../../core/classes/CatalogItem";


export type CatalogProps = {
    catalog: Catalog
}


export function CatalogPage({catalog}: CatalogProps) {


    function handleElementClick(item: CatalogItem){
        console.log(item)
    }


    return (
        <div className='catalog'>
            <Header/>
            <Container>
                <div className='catalog-sections'>
                    {catalog.sections.map(s => (
                        <Button key={s.id} className='catalog-section-item'>{s.title}</Button>
                    ))}
                </div>


                {catalog.sections.map(s => (
                    <section key={s.id} className='catalog-section'>
                        <h2 className='catalog-section-title'>{s.title}</h2>
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

            </Container>
        </div>
    );
}

