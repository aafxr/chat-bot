import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {Button, Carousel, Tab, Tabs} from "react-bootstrap";

import {useCatalogElement} from "../../redux/hooks/useCatalogElement";
import {CatalogService} from "../../core/services/CatalogService";
import {ProductDetails} from "../../core/classes/ProductDetails";
import {ElementProperty} from "../../components/ElementProperty";
import {ElementBalance} from "../../components/ElementBalance";
import {RelatedItems} from "../../components/RelatedItems";
import {CatalogItem} from "../../core/classes/CatalogItem";
import {useCatalog} from "../../redux/hooks/useCatalog";
import {AddOrder} from "../../components/AddOrder";
import {Balance} from "../../core/classes/Balance";
import {Subtitle} from "../../components/Subtitle";
import {Section} from "../../components/Section";
import {Spacer} from "../../components/Spacer";
import {Radio} from "../../components/Radio";
import {Title} from "../../components/Title";

import './ElementPage.scss'

type ElementPageState = {
    productDetails?: ProductDetails
    productDetailsLoading: boolean
    productDetailsRequested: boolean

    balance?: Balance

    relatedItems: CatalogItem[]
    relatedLoading: boolean
    relatedRequested: boolean

    showRelated: boolean
}

const defaultState: ElementPageState = {
    productDetailsLoading: false,
    productDetailsRequested: false,

    relatedItems: [],
    relatedLoading: false,
    relatedRequested: false,

    showRelated: false
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
                    setState(p => ({...p, productDetails: pd}))
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
        const {productDetails, relatedRequested, relatedLoading} = state
        if (!catalog || !productDetails || relatedRequested || relatedLoading) return

        setState(p => ({...p, relatedLoading: true, relatedRequested: true}))
        CatalogService.relatedProducts(
            productDetails,
            (e?: Error, p?: ProductDetails[]) => {
                if (e) console.error(e)
                if (p) {
                    const relatedItems = p.map(r => catalog.getElementByArticle(r.ProductArticleForChatBot)) || []
                    setState(prev => ({...prev, relatedItems}))
                }
            })
            .catch(console.error)
            .finally(() => setState(p => ({...p, relatedLoading: false})))

    }, [state, catalog]);


    useEffect(() => {
        // @ts-ignore
        const tg = window.Telegram.WebApp
        tg.BackButton.show()
        return () => {
            tg.BackButton.hide()
        }
    }, []);



    function toggleRelatedShow(){
        setState(p => ({...p, showRelated: !p.showRelated}))
    }



    if (!element) {
        navigate('/')
        return <></>
    }

    const {productDetails, balance} = state
    const total = productDetails?.Balance_Strings
        .filter(b => b.TradeArea_Name.toLowerCase().startsWith('всего'))[0]


    return (
        <div className='itemDetails wrapper'>
            <div className='wrapper-content'>
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
                                {total && productDetails &&
                                    <div className='row mt-2'>
                                        <div className='col-4'>
                                            <Button
                                                className='app-btn w-100'
                                                onClick={toggleRelatedShow}
                                                disabled={!state.relatedItems.length}
                                            >
                                                еще
                                            </Button>
                                        </div>
                                        <div className='col-8'>
                                            <AddOrder
                                                product={element}
                                                max={Math.floor(Number(total.Quantity) / Number(productDetails.PackUnitQuantity))}
                                            />
                                        </div>

                                    </div>
                                }
                                <Tabs
                                    defaultActiveKey="price"
                                    id="uncontrolled-tab-example"
                                    className="mt-1"
                                >
                                    <Tab eventKey="price" title="Цена">
                                        <div className='itemDetails-tabContent'>
                                            <Section className='itemDetails-section'>
                                                <div className='itemDetails-prop'>
                                                    <div
                                                        className='itemDetails-propName'>{productDetails.Price_MRC.Name}</div>
                                                    <div className='itemDetails-propValue'>
                                                        {productDetails.Price_MRC.Value}&nbsp;{productDetails.Price_MRC.UnitOfMeasure}
                                                    </div>
                                                </div>
                                                <div className='itemDetails-separator'/>
                                                <div className='itemDetails-prop'>
                                                    <div
                                                        className='itemDetails-propName'>{productDetails.Price_RRC.Name}</div>
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
                                        </div>
                                    </Tab>
                                    <Tab eventKey="properties" title="Свойства">
                                        <div className='itemDetails-tabContent'>
                                            <Section className='itemDetails-section'>
                                                <Subtitle>Характеристики</Subtitle>
                                                {element.properties.map(p => (
                                                    <ElementProperty
                                                        key={p.id}
                                                        className='itemDetails-property'
                                                        property={p}
                                                    />
                                                ))}
                                            </Section>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="order" title="Заказать">
                                        <div className='itemDetails-tabContent'>
                                            <Section className='itemDetails-section'>
                                                <>
                                                    <Subtitle>Доступно для заказа</Subtitle>
                                                    {productDetails.Balance_Strings
                                                        .filter(b => b.TradeArea_Name.toLowerCase() !== 'всего')
                                                        .map(b => (
                                                            (
                                                                <Radio
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
                                                            )
                                                        ))}

                                                    {total && (
                                                        <ElementBalance
                                                            key={total.TradeArea_Id}
                                                            className='itemDetails-total'
                                                            balance={total}
                                                            packUnit={+productDetails.PackUnitQuantity}
                                                        />
                                                    )}
                                                </>
                                            </Section>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="site" title="Сайт">
                                        <div className='itemDetails-tabContent'>
                                            <Section className='itemDetails-section'>
                                                <a className='link' href={productDetails.LinkToSite}>Посмотреть на
                                                    сайте</a>
                                            </Section>
                                        </div>
                                    </Tab>
                                </Tabs>
                                <RelatedItems
                                    items={state.relatedItems}
                                    show={state.showRelated}
                                    onHide={toggleRelatedShow}
                                />
                            </>
                        )}
                    </div>
                </div>
                <Spacer/>
            </div>
        </div>
    );
}

