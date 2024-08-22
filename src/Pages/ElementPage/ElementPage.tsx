import {Carousel} from "react-bootstrap";
import {useNavigate, useParams} from "react-router";
import React, { useEffect, useState} from 'react';
import {TabsItem} from "@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem";

import {Button, Caption, Cell, Radio, Section, TabsList} from "@telegram-apps/telegram-ui";
import {useCatalogElement} from "../../redux/hooks/useCatalogElement";
import {CatalogService} from "../../core/services/CatalogService";
import {ProductDetails} from "../../core/classes/ProductDetails";
import {RelatedItems} from "../../components/RelatedItems";
import {CatalogItem} from "../../core/classes/CatalogItem";
import {useCatalog} from "../../redux/hooks/useCatalog";
import {FooterMenu} from "../../components/FooterMenu";
import {AddOrder} from "../../components/AddOrder";
import {Balance} from "../../core/classes/Balance";

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

type TabItemType = {
    id: number
    title: string
}


const tabs: TabItemType[] = [
    {
        id: 0,
        title: 'Цена',
    },
    {
        id: 1,
        title: 'Свойства',
    },
    {
        id: 2,
        title: 'Заказать',
    },
    {
        id: 3,
        title: 'Сайт',
    }

]


export function ElementPage() {
    const navigate = useNavigate()
    const {detailId} = useParams()
    const catalog = useCatalog()
    const element = useCatalogElement(detailId)
    const [state, setState] = useState({...defaultState})
    const [selectedTab, setSelectedTab] = useState(0)


    useEffect(() => {
        setState({...defaultState})
    }, []);


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


    function toggleRelatedShow() {
        setState(p => ({...p, showRelated: !p.showRelated}))
    }

    const packsCount = (b: Balance, pd: ProductDetails) => Math.floor((+b.Quantity) / (+pd.PackUnitQuantity))


    if (!element) {
        navigate('/')
        return <></>
    }

    const {productDetails, balance} = state
    const total = productDetails?.Balance_Strings
        .filter(b => b.TradeArea_Name.toLowerCase().startsWith('всего'))[0]


    return (
        <div className='itemDetails wrapper'>
            <div className='wrapper-content hideScroll '>
                <div className="itemDetails-container">
                    <Section
                        // className='sectionBlock'
                        // header={element.title}
                        // header={<Headline weight='1' >{element.title}</Headline>}
                    >
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
                    </Section>


                    <div className='itemDetails-inner'>
                        {productDetails && (
                            <>
                                {total && productDetails &&
                                    <section className='sectionBlock itemDetails-buttons'>
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
                                                    details={productDetails}
                                                    max={Math.floor(Number(total.Quantity) / Number(productDetails.PackUnitQuantity))}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                }
                                <Section
                                    className='sectionBlock'
                                    header={element.title}
                                >
                                    <TabsList>
                                        {tabs.map(e => (
                                            <TabsItem
                                                key={e.id}
                                                onClick={() => setSelectedTab(e.id)}
                                                selected={e.id === selectedTab}
                                            >
                                                {e.title}
                                            </TabsItem>

                                        ))}
                                    </TabsList>
                                    {(() => {
                                        switch (selectedTab) {
                                            case 0:
                                                return (
                                                    <>
                                                        <Cell
                                                            before={<Caption>{productDetails.Price_MRC.Name}</Caption>}
                                                            after={<Caption>{productDetails.Price_MRC.Value}</Caption>}
                                                        />
                                                        <Cell
                                                            before={<Caption>{productDetails.Price_RRC.Name}</Caption>}
                                                            after={<Caption>{productDetails.Price_RRC.Value}</Caption>}
                                                        />
                                                        <Cell
                                                            before={<Caption>{'Упаковка'}</Caption>}
                                                            after={
                                                                <Caption
                                                                    weight={'1'}>{productDetails.PackUnitMeasure}&nbsp;=&nbsp;{productDetails.PackUnitQuantity}&nbsp;{productDetails.UnitOfMeasure}</Caption>}
                                                        />
                                                    </>
                                                )
                                            case 1:
                                                return (
                                                    <>
                                                        {element.properties.map(p => (
                                                            <Cell
                                                                key={p.id}
                                                                before={<Caption>{p.name}</Caption>}
                                                                after={<Caption weight='2'>{p.value}</Caption>}
                                                            />
                                                        ))}
                                                    </>
                                                )
                                            case 2:
                                                return (
                                                    <Section header='Доступно для заказа'>
                                                        {productDetails.Balance_Strings
                                                            .filter(b => b.TradeArea_Name.toLowerCase() !== 'всего')
                                                            .map(b => (
                                                                (
                                                                    <Cell
                                                                        key={b.TradeArea_Name}
                                                                        before={
                                                                            <div className='itemDetails-tradeArea'>
                                                                                <Radio
                                                                                    checked={b.TradeArea_Id === balance?.TradeArea_Id}/>
                                                                            </div>
                                                                        }
                                                                        after={
                                                                            <div
                                                                                className='itemDetails-tradeArea-packs'>
                                                                                <Caption>{b.Quantity} м<sup>2</sup></Caption>
                                                                                <Caption>{packsCount(b, productDetails)}&nbsp;упак</Caption>
                                                                            </div>
                                                                        }
                                                                        onClick={() => setState({...state, balance: b})}
                                                                    >
                                                                        <Caption>{b.TradeArea_Name}</Caption>
                                                                    </Cell>
                                                                )
                                                            ))}
                                                    </Section>
                                                )
                                            case 3:
                                                return (
                                                    <Cell before={
                                                        <Caption className={'link'}>
                                                            {productDetails.LinkToSite}
                                                        </Caption>
                                                    }
                                                    />
                                                )

                                        }
                                    })()}
                                </Section>


                                <RelatedItems
                                    items={state.relatedItems}
                                    show={state.showRelated}
                                    onHide={toggleRelatedShow}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className='wrapper-footer-spacer'/>
            <FooterMenu />
        </div>
    );
}
