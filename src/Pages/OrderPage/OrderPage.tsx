import React, {useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import {Caption} from "@telegram-apps/telegram-ui";

import {ConfirmModal} from "../../components/modals/ConfirmModal/ConfirmModal";
import {useUserOrders} from "../../redux/hooks/useUserOrders";
import {dateLang, dateOptions} from "../../utils/formatter";
import {setOrders} from "../../redux/slices/user-slice";
import {FooterMenu} from "../../components/FooterMenu";
import {OrderCard} from "../../components/OrderCard";
import {useAppDispatch} from "../../redux/hooks";
import {Order} from "../../core/classes/Order";
import {Block} from "../../components/Block";

import './OrderPage.scss'


export function OrderPage() {
    const dispatch = useAppDispatch()
    const orders = useUserOrders()
    const ol = useMemo(() =>  [...orders].reverse(), [orders])


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
            {/*<PageHeader title={"Заказы"}/>*/}
            <div className='wrapper-content'>
                <div className='order-list'>
                    {orders.length
                        ? (
                            ol.map((o) => (
                                <OrderCard
                                    order={o}
                                    onRemove={() => setRemoveOrder(o)}
                                />))
                        ) : (
                            <Block className='mt-4'>
                                <Caption weight='2'>
                                    Перейдите в <Link className='link' to={'/'}>каталог</Link>, чтобы сформировать ваш
                                    первый закзаз
                                </Caption>
                            </Block>
                        )
                    }
                </div>

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
                    ? `${removeOrder.id} ${removeOrder.CreatedAt.toLocaleDateString(dateLang, dateOptions)}`
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
