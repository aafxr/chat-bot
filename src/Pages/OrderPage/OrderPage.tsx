import React, {useState} from 'react';
import {Link} from "react-router-dom";

import {ConfirmModal} from "../../components/modals/ConfirmModal/ConfirmModal";
import {OrderItemCard} from "../../components/OrderItemCard";
import {setOrder} from "../../redux/slices/order-slice";
import {OrderItem} from "../../core/classes/OrderItem";
import {useFormatter} from "../../hooks/useFormatter";
import {Container} from "../../components/Container";
import {useOrder} from "../../redux/hooks/useOrder";
import {Button, Tab, Tabs} from "react-bootstrap";
import {useAppDispatch} from "../../redux/hooks";
import {Order} from "../../core/classes/Order";
import {Spacer} from "../../components/Spacer";

import './OrderPage.scss'
import {PageHeader} from "../../components/PageHeader";
import {FooterMenu} from "../../components/FooterMenu";


export function OrderPage() {
    const dispatch = useAppDispatch()
    const order = useOrder()
    const items = Object.values(order.orders)
    const total = items.reduce((a, e) => a + e.getTotal(), 0)
    const formatter = useFormatter(items[0]?.product.currency || 'RUB')

    const [removeItem, setRemoveITem] = useState<OrderItem>()


    function confirmRemove() {
        if (!removeItem) return
        const newOrder = new Order(order)
        newOrder.delete(removeItem.product)
        dispatch(setOrder(newOrder))
        setRemoveITem(undefined)

    }


    function cancelRemove() {
        setRemoveITem(undefined)
    }


    return (
        <div className='order wrapper'>
            <PageHeader title={"Заказы"}/>
            <div className='wrapper-content'>
                <Container>
                    <Tabs
                        defaultActiveKey="current"
                        className="order-tabs"
                    >
                        <Tab eventKey="current" title="Текущий">
                            <div className='order-list'>
                    {!!items.length && <Button className='order-button mt-2'>Оформить заказ</Button>}
                                {items.length
                                    ? (
                                        items.map((o) => (
                                            <OrderItemCard
                                                key={o.product.id}
                                                className='mt-2'
                                                orderItem={o}
                                                onRemove={setRemoveITem}
                                            />
                                        ))
                                    ) : (
                                        <div>
                                            Вернуться&nbsp;
                                            <Link className='link' to={'/'}>в каталог</Link>
                                        </div>
                                    )
                                }
                            </div>
                        </Tab>
                        <Tab eventKey="all" title="Все">
                            <p>Все заказы</p>
                        </Tab>
                    </Tabs>
                </Container>

            </div>
            <div className='wrapper-footer'>
                <Container>

                    <div className='order-summary'>
                        Итого:
                        <div className='order-total'>
                            {formatter.format(total)}
                        </div>
                    </div>
                </Container>
            </div>
            <div className='wrapper-footer-spacer'/>
            <FooterMenu/>
            <ConfirmModal
                show={!!removeItem}
                onHide={cancelRemove}
                titleText={'Удалить продукт'}
                body={removeItem?.product.title || ''}
                confirmText={'Удалить'}
                cancelText={'Отмена'}
                onCancel={cancelRemove}
                onConfirm={confirmRemove}
            />
        </div>
    )
        ;
}
