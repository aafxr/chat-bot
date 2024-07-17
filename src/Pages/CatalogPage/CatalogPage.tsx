import React from 'react';
import {useNavigate} from "react-router";

import {Header} from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import {Container} from "../../components/Container";
import {CatalogElement} from "../../components/CatalogElement/CatalogElement";
import {CatalogItem} from "../../core/classes/CatalogItem";
import {useCatalog} from "../../redux/hooks/useCatalog";

import './Catalog.scss'


export type CatalogProps = {}


export function CatalogPage({}: CatalogProps) {
    const catalog = useCatalog()
    const navigate = useNavigate()


    function handleElementClick(item: CatalogItem) {
        navigate(`/${item.id}`)
    }


    if (!catalog) return null

    return (
        <div className='catalog'>
            <Header/>
            <div className='catalog-sectionsContainer'>
                <div className='catalog-sections'>
                    {catalog.sections.map(s => (
                        <Button key={s.id} className='catalog-section-item'>{s.title}</Button>
                    ))}
                </div>
            </div>
            <Container>

                <div className='catalog-content'>
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
                </div>

            </Container>
        </div>
    );
}

