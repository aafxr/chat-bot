import React, {useState} from 'react';
import {ConfirmModal} from "../../components/modals/ConfirmModal/ConfirmModal";
import {OrderItemCard} from "../../components/OrderItemCard";
import {setOrder} from "../../redux/slices/order-slice";
import {OrderItem} from "../../core/classes/OrderItem";
import {Container} from "../../components/Container";
import {useOrder} from "../../redux/hooks/useOrder";
import {useAppDispatch} from "../../redux/hooks";
import {Order} from "../../core/classes/Order";
import {Title} from "../../components/Title";
import {Button} from "react-bootstrap";

import './OrderPage.scss'
import {Link} from "react-router-dom";


export function OrderPage() {
    const dispatch = useAppDispatch()
    const order = useOrder()
    const items = Object.values(order.orders)

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
            <div className='wrapper-header'>
                <Container>
                    <Title className='pt-2'>Заказы</Title>
                </Container>
            </div>
            <div className='wrapper-content mt-4'>
                <Container>
                    {!!items.length && <Button className='order-button'>Оформить заказ</Button>}
                    <div className='order-list m-0'>
                        {items.length
                            ? (
                                items.map((o) => (
                                    <OrderItemCard key={o.product.id} className='mt-4' orderItem={o}
                                                   onRemove={setRemoveITem}/>
                                ))
                            ) : (
                                <div>
                                    Вернуться&nbsp;
                                    <Link className='link' to={'/'}>на главную</Link>
                                </div>
                            )
                        }
                    </div>
                </Container>
            </div>
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
    );
}
