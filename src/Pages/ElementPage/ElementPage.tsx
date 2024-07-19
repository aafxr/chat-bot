import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {Carousel, Tab, Tabs} from "react-bootstrap";

import {CatalogElement} from "../../components/CatalogElement/CatalogElement";
import {useCatalogElement} from "../../redux/hooks/useCatalogElement";
import {CatalogService} from "../../core/services/CatalogService";
import {ProductDetails} from "../../core/classes/ProductDetails";
import {ElementProperty} from "../../components/ElementProperty";
import {ElementBalance} from "../../components/ElementBalance";
import {CatalogItem} from "../../core/classes/CatalogItem";
import {useCatalog} from "../../redux/hooks/useCatalog";
import {Balance} from "../../core/classes/Balance";
import {Subtitle} from "../../components/Subtitle";
import {Section} from "../../components/Section";
import {Radio} from "../../components/Radio";
import {Title} from "../../components/Title";

import './ElementPage.scss'

type ElementPageState = {
    productDetails?: ProductDetails
    productDetailsLoading: boolean
    productDetailsRequested: boolean

    balance?: Balance
    related: ProductDetails[]
    relatedLoading: boolean
    relatedRequested: boolean
}

const defaultState: ElementPageState = {
    productDetailsLoading: false,
    productDetailsRequested: false,
    related: [],
    relatedLoading: false,
    relatedRequested: false
}


export function ElementPage() {
    const navigate = useNavigate()
    const {detailId} = useParams()
    const catalog = useCatalog()
    const element = useCatalogElement(detailId)
    const [state, setState] = useState({...defaultState})

    useEffect(() => {
        setState({...defaultState})
    }, [detailId]);


    useEffect(() => {
        if (!element || state.productDetailsLoading || state.productDetailsRequested) return

        setState({...state, productDetailsLoading: true})
        CatalogService.getProductDetails(element,
            (e, pd) => {
                if (pd) {
                    setState(p => ({...p, productDetails: pd,}))
                }
            })
            .catch(console.error)
            .finally(() => setState(p => ({
                ...p,
                productDetailsLoading: false,
                productDetailsRequested: true
            })))
    }, [element, state]);


    useEffect(() => {
        const {productDetails} = state
        if (!productDetails || !element || state.relatedLoading || state.relatedRequested) return

        setState(p => ({...p, elatedLoading: true, relatedRequested: true}))
        CatalogService.relatedProducts(
            productDetails,
            (e?: Error, p?: ProductDetails[]) => {
                if (p) setState(prev => ({...prev, related: p}))
            })
            .catch(console.error)
            .finally(() => setState(p => ({...p, relatedLoading: false})))
    }, [element, state]);


    function handleRelatedClick(item: CatalogItem) {
        setState({...defaultState})
        navigate(`/${item.id}`)
    }


    const relatedItems = (catalog && state.related.map(r => catalog.getElementByArticle(r.ProductArticleForChatBot))) || []

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

    const {productDetails, balance, related} = state
    console.log(state)



    return (
        <div className='itemDetails'>
            <div className="itemDetails-container">
                <div className='itemDetails-slider'>
                    {element.photo.length
                        ? (
                            <Carousel
                                controls={false}
                                pause='hover'
                                interval={3000}
                                touch={true}
                            >
                                {element.photo.map((slideImage) => (
                                    <Carousel.Item key={slideImage.id}>
                                        <div
                                            key={slideImage.id}
                                            className='itemDetails-slide'
                                            style={{'backgroundImage': `url(${slideImage.src})`}}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )
                        : (
                            <div
                                className='itemDetails-slide'
                                style={{'backgroundImage': `url(${element.preview})`}}
                            />
                        )
                    }


                </div>
                <div className='itemDetails-inner h-100'>
                    {productDetails && (
                        <>
                            <Title className='itemDetails-title'>{element.title}</Title>
                            <Tabs
                                defaultActiveKey="price"
                                id="uncontrolled-tab-example"
                                className="mb-2 mt-2"
                            >
                                <Tab eventKey="price" title="Цена">
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
                                </Tab>
                                <Tab eventKey="properties" title="Свойства">
                                    <Section className='itemDetails-section'>
                                        <Subtitle>Характеристики</Subtitle>
                                        {element.properties.map(p => (
                                            <ElementProperty key={p.id} className='itemDetails-property' property={p}/>
                                        ))}
                                    </Section>
                                </Tab>
                                <Tab eventKey="order" title="Заказать">
                                    <Section className='itemDetails-section'>
                                        <>
                                            <Subtitle>Доступно для заказа</Subtitle>
                                            {productDetails.Balance_Strings
                                                .filter(b => !b.TradeArea_Name.toLowerCase().startsWith('всего'))
                                                .map(b => (
                                                    <Radio
                                                        key={b.TradeArea_Id}
                                                        className='itemDetails-balance'
                                                        name='tranzit'
                                                        value={b.TradeArea_Name}
                                                        onClick={() => setState({...state, balance: b})}
                                                        checked={b.TradeArea_Id === balance?.TradeArea_Id}
                                                    >
                                                        <ElementBalance
                                                            balance={b}
                                                            packUnit={+productDetails.PackUnitQuantity}
                                                            active={b.TradeArea_Id === balance?.TradeArea_Id}
                                                        />
                                                    </Radio>
                                                ))}

                                            {productDetails.Balance_Strings
                                                .filter(b => b.TradeArea_Name.toLowerCase().startsWith('всего'))
                                                .map(b => (
                                                    <ElementBalance
                                                        key={b.TradeArea_Id}
                                                        className='itemDetails-total'
                                                        balance={b}
                                                        packUnit={+productDetails.PackUnitQuantity}
                                                    />
                                                ))
                                            }
                                        </>
                                    </Section>
                                </Tab>
                                <Tab eventKey="site" title="Сайт">
                                    <Section className='itemDetails-section'>
                                        <a href={productDetails.LinkToSite}>Ссылка на сайт</a>
                                    </Section>
                                </Tab>
                            </Tabs>

                            <div className='itemDetails-related mt-2'>
                                {relatedItems.map(r => (
                                    <CatalogElement
                                        key={r.id}
                                        className='itemDetails-related-item'
                                        item={r}
                                        onClick={handleRelatedClick}
                                    />
                                ))
                                }
                            </div>


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

