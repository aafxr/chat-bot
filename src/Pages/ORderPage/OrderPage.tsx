import React from 'react';
import {OrderItemCard} from "../../components/OrderItemCard";
import {useOrder} from "../../redux/hooks/useOrder";
import {Container} from "../../components/Container";
import {Title} from "../../components/Title";

export function OrderPage() {
    const order = useOrder()
    return (
        <div className='order wrapper'>
            <div className='wrapper-header'>
                <Container>
                    <Title className='pt-2'>Заказы</Title>
                </Container>
            </div>
            <div className='wrapper-content mt-4'>
                <Container>
                    <ul className='order-list m-0'>
                        {Object.values(order.orders)
                            .map((o) => (
                                <li key={o.product.id}>
                                    <OrderItemCard orderItem={o}/>
                                </li>
                            ))
                        }
                    </ul>
                </Container>
            </div>
        </div>
    );
}
