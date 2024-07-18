import 'react-slideshow-image/dist/styles.css'
import {Slide} from 'react-slideshow-image';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";

import {useCatalogElement} from "../../redux/hooks/useCatalogElement";
import {CatalogService} from "../../core/services/CatalogService";
import {ProductDetails} from "../../core/classes/ProductDetails";
import {ElementProperty} from "../../components/ElementProperty";
import {Subtitle} from "../../components/Subtitle";
import {Section} from "../../components/Section";

import './ElementPage.scss'
import {Title} from "../../components/Title";


export function ElementPage() {
    const {detailId} = useParams()
    const element = useCatalogElement(detailId)
    const navigate = useNavigate()
    const [productDetails, setProductDetails] = useState<ProductDetails>()


    useEffect(() => {
        if (!element) return
        CatalogService.getProductDetails(element,
            (e, pd) => {
                console.log(pd)
                console.error(e)
                if (pd) setProductDetails(pd)
            }
        )
            .catch(console.error)
    }, []);


    useEffect(() => {
        // @ts-ignore
        const tg = window.Telegram.WebApp
        tg.BackButton.show()
        return () => {
            tg.BackButton.hide()
        }
    }, []);


    if (!element) {
        navigate('/')
        return <></>
    }

    console.log(productDetails)


    return (
        <div className='itemDetails'>
            <div className="itemDetails-container">
                <div className='itemDetails-slider'>
                    <Slide
                        arrows={false}
                        autoplay
                        canSwipe
                        pauseOnHover
                        transitionDuration={500}
                        duration={3000}
                    >
                        {element.photo.map((slideImage) => (
                            <div
                                key={slideImage.id}
                                className='itemDetails-slide'
                                style={{'backgroundImage': `url(${slideImage.src})`}}
                            />
                        ))}
                    </Slide>

                </div>
                <div className='itemDetails-inner'>
                    <Title className='itemDetails-title'>{element.title}</Title>
                    {productDetails && (
                        <>
                            <Section className='itemDetails-section'>
                                <div className='itemDetails-prop'>
                                    <div className='itemDetails-propName'>{productDetails.Price_MRC.Name}</div>
                                    <div className='itemDetails-propValue'>
                                        {productDetails.Price_MRC.Value}&nbsp;{productDetails.Price_MRC.UnitOfMeasure}
                                    </div>
                                </div>
                                <div className='itemDetails-separator'/>
                                <div className='itemDetails-prop'>
                                    <div className='itemDetails-propName'>{productDetails.Price_RRC.Name}</div>
                                    <div className='itemDetails-propValue'>
                                        {productDetails.Price_RRC.Value}&nbsp;{productDetails.Price_RRC.UnitOfMeasure}
                                    </div>
                                </div>
                                <div className='itemDetails-separator'/>
                                <div className='itemDetails-prop'>
                                    <div className='itemDetails-propName'>Упаковка</div>
                                    <div className='itemDetails-propValue'>
                                        {productDetails.PackUnitMeasure}&nbsp;=&nbsp;{productDetails.PackUnitQuantity}&nbsp;{productDetails.UnitOfMeasure}
                                    </div>
                                </div>
                            </Section>
                            <Section className='itemDetails-section'>
                                <Subtitle>Характеристики</Subtitle>
                                {element.properties.map(p => (
                                    <ElementProperty key={p.id} className='itemDetails-property' property={p}/>
                                ))}
                            </Section>

                            <Section className='itemDetails-section'>

                            </Section>
                            {/*<div className="selected-list-item warehouse selected">*/}
                            {/*    <div className="col-none">*/}
                            {/*        <input*/}
                            {/*            type="radio"*/}
                            {/*            name="warehouse-selected"*/}
                            {/*            value="e3b35c38-65f0-11eb-bfb1-902b3434e458"*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*    <div className="col-none warehouse-item-name">Москва Север<br/></div>*/}
                            {/*    <div className="col"></div>*/}
                            {/*    <div className="col-none warehouse-item-quantity"><span>19,97</span><br/>12</div>*/}
                            {/*    <div className="col-none warehouse-item-measure">м2<br/>упак</div>*/}
                            {/*</div>*/}
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}

