import {Carousel} from "react-bootstrap";
import {useNavigate, useParams} from "react-router";
import React, {useEffect, useMemo, useState} from 'react';
import {TabsItem} from "@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem";

import {Button, Caption, Cell, Radio, Section, Selectable, TabsList} from "@telegram-apps/telegram-ui";
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
import {Counter} from "../../components/Counter";
import {AppUser} from "../../core/classes/AppUser";
import {useAppUser} from "../../redux/hooks/useAppUser";
import {Basket} from "../../core/classes/Basket";
import {useUserBasket} from "../../redux/hooks/useUserBasket";
import {StorehouseService} from "../../core/services/StorehouseService";
import {useAppDispatch} from "../../redux/hooks";
import {removeBasketProduct, setBasket} from "../../redux/slices/user-slice";
import debounce from "debounce";

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
        title: 'Наличие',
    },
    // {
    //     id: 3,
    //     title: 'Сайт',
    // }

]


const packsCount = (b: Balance, pd: ProductDetails) => Math.floor((+b.Quantity) / (+pd.PackUnitQuantity))


export function ElementPage() {
    const navigate = useNavigate()
    const {detailId} = useParams()
    const catalog = useCatalog()
    const element = useCatalogElement(detailId)
    const [state, setState] = useState({...defaultState})
    const [selectedTab, setSelectedTab] = useState(0)
    const user = useAppUser()
    const basket = useUserBasket()

    const {productDetails, balance} = state

    const storageIdx = useMemo(() => {
        if (!user || !productDetails) return -1
        return productDetails.Balance_Strings.findIndex(bs => bs.TradeArea_Id === user.storehouseId)
    }, [user, productDetails])

    const isProductAtStorage = ~storageIdx


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


    if (!element) {
        navigate('/')
        return <></>
    }


    return (
        <div className='itemDetails wrapper'>
            <div className='wrapper-content hideScroll '>
                <div className="itemDetails-container">
                    <Section>
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
                                {!isProductAtStorage && (
                                    <Section className='sectionBlock'>
                                        <Caption className='errorText p-2' size={1}>На выбранном Вами складе нет данного
                                            товара</Caption>
                                    </Section>
                                )}
                                {/*{total && productDetails &&*/}
                                {/*    <section className='sectionBlock itemDetails-buttons'>*/}
                                {/*        <div className='row mt-2'>*/}
                                {/*            <div className='col-4'>*/}
                                {/*                <Button*/}
                                {/*                    className='app-btn w-100'*/}
                                {/*                    onClick={toggleRelatedShow}*/}
                                {/*                    disabled={!state.relatedItems.length}*/}
                                {/*                >*/}
                                {/*                    еще*/}
                                {/*                </Button>*/}
                                {/*            </div>*/}
                                {/*            <div className='col-8'>*/}
                                {/*                <AddOrder*/}
                                {/*                    product={element}*/}
                                {/*                    details={productDetails}*/}
                                {/*                    max={Math.floor(Number(total.Quantity) / Number(productDetails.PackUnitQuantity))}*/}
                                {/*                />*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </section>*/}
                                {/*}*/}
                                <Section
                                    className='sectionBlock'
                                    header={element.title}
                                >
                                    <TabsList>
                                        {tabs.map(e => (
                                            <TabsItem
                                                key={e.id}
                                                className={'itemDetails-tab'}
                                                onClick={() => setSelectedTab(e.id)}
                                                selected={e.id === selectedTab}
                                            >
                                                {e.title}
                                            </TabsItem>

                                        ))}
                                    </TabsList>
                                    <TabContent
                                        tabId={selectedTab}
                                        details={productDetails}
                                        element={element}
                                        balance={balance}
                                        user={user}
                                        basket={basket}
                                        storageIdx={storageIdx}
                                    />
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
            <FooterMenu/>
        </div>
    );
}


type TabContentProps = {
    user?: AppUser
    tabId: TabItemType['id']
    details: ProductDetails
    element: CatalogItem
    balance?: Balance
    basket: Basket
    storageIdx: number
}


function TabContent({tabId, details, element, balance, user, basket, storageIdx}: TabContentProps) {
    const dispatch = useAppDispatch()

    function handleAddProductToBasket(count: number) {
        if (count <= 0) {
            dispatch(removeBasketProduct(element))
            return
        }
        basket.setProduct(element, details, count)
        dispatch(setBasket(new Basket(basket)))
    }

    const debouncedHandleQuantityChange = debounce(handleAddProductToBasket, 300)


    switch (tabId) {
        case 0:
            return (
                <>
                    <Cell
                        before={<Caption>{details.Price_MRC.Name}</Caption>}
                        after={<Caption>{details.Price_MRC.Value}</Caption>}
                    />
                    <Cell
                        before={<Caption>{details.Price_RRC.Name}</Caption>}
                        after={<Caption>{details.Price_RRC.Value}</Caption>}
                    />
                    <Cell
                        before={<Caption>{'Упаковка'}</Caption>}
                        after={
                            <Caption
                                weight={'1'}>{details.PackUnitMeasure}&nbsp;=&nbsp;{details.PackUnitQuantity}&nbsp;{details.UnitOfMeasure}</Caption>}
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
                    {!!~storageIdx && (
                        <div className='itemDetails-tradearea tradearea'>
                            <Selectable className='tradearea-checkbox' defaultChecked/>
                            <div className='tradearea-content'>
                                <Caption weight={"1"}>{details.Balance_Strings[storageIdx].TradeArea_Name}</Caption>
                                <div className='itemDetails-tradeArea-packs'>
                                    <Caption weight={"1"}>{packsCount(details.Balance_Strings[storageIdx], details)}&nbsp;упак</Caption>
                                    <Caption weight={"1"}>{details.Balance_Strings[storageIdx].Quantity} м<sup>2</sup></Caption>
                                </div>
                            </div>
                            <div className='tradearea-button'>
                                {basket.hasProduct(element.id)
                                    ? <Counter initValue={basket.getDetails(element)?.packCount}
                                               onChange={debouncedHandleQuantityChange} suffix={'упак'}/>
                                    : <Button onClick={() => handleAddProductToBasket(1)}>Добавить</Button>
                                }
                            </div>
                        </div>
                    )

                    }
                    {details.Balance_Strings
                        .filter((b, i) => b.TradeArea_Name.toLowerCase() !== 'всего' && i !== storageIdx)
                        .map((b) => (
                                <div key={b.TradeArea_Id} className='itemDetails-tradearea tradearea'>
                                    <Selectable className='tradearea-checkbox'/>
                                    <div className='tradearea-content'>
                                        <Caption>{b.TradeArea_Name}</Caption>
                                        <div className='itemDetails-tradeArea-packs'>
                                            <Caption>{packsCount(b, details)}&nbsp;упак</Caption>
                                            <Caption>{b.Quantity} м<sup>2</sup></Caption>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                </Section>
            )
        default:
            return <></>
    }
}
