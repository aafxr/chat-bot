import React, {useState} from 'react';
import {Link} from "react-router-dom";

import {ConfirmModal} from "../../components/modals/ConfirmModal/ConfirmModal";
import {useUserOrders} from "../../redux/hooks/useUserOrders";
import {dateLang, dateOptions} from "../../utils/formatter";
import {setOrders} from "../../redux/slices/user-slice";
import {PageHeader} from "../../components/PageHeader";
import {FooterMenu} from "../../components/FooterMenu";
import {OrderCard} from "../../components/OrderCard";
import {Container} from "../../components/Container";
import {useAppDispatch} from "../../redux/hooks";
import {Order} from "../../core/classes/Order";
import {Block} from "../../components/Block";

import './OrderPage.scss'
import {Caption} from "@telegram-apps/telegram-ui";


export function OrderPage() {
    const dispatch = useAppDispatch()
    const orders = useUserOrders()

    const [removeOrder, setRemoveOrder] = useState<Order>()


    function confirmRemove() {
        if (!removeOrder) return
        const newOrdersList = orders.filter((o) => o !== removeOrder)
        dispatch(setOrders(newOrdersList))
        setRemoveOrder(undefined)

    }


    function cancelRemove() {
        setRemoveOrder(undefined)
    }


    return (
        <div className='order wrapper'>
            <PageHeader title={"Заказы"}/>
            <div className='wrapper-content'>
                <Container>
                    <div className='order-list'>
                        {orders.length
                            ? (
                                orders.map((o) => (
                                    <OrderCard
                                        order={o}
                                        onRemove={() => setRemoveOrder(o)}
                                    />
                                ))
                            ) : (
                                <Block className='mt-4'>
                                    <Caption weight='2'>
                                        Перецдите в <Link className='link' to={'/'}>каталог</Link>, стобы сформировать ваш первый закзаз
                                    </Caption>
                                </Block>
                            )
                        }
                    </div>
                </Container>

            </div>
            <div className='wrapper-footer'>

            </div>
            <div className='wrapper-footer-spacer'/>
            <FooterMenu/>
            <ConfirmModal
                show={!!removeOrder}
                onHide={cancelRemove}
                titleText={'Удалить продукт'}
                body={removeOrder
                    ? `${removeOrder.id} ${removeOrder.created_at.toLocaleDateString(dateLang, dateOptions)}`
                    : ''
                }
                confirmText={'Удалить'}
                cancelText={'Отмена'}
                onCancel={cancelRemove}
                onConfirm={confirmRemove}
            />
        </div>
    )
}
