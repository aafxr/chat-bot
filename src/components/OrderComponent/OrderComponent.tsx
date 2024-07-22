import React from 'react';
import {Offcanvas} from "react-bootstrap";
import {useOrder} from "../../redux/hooks/useOrder";
import {OrderItemCard} from "../OrderItemCard";


type OrderComponentProps = {
    show?: boolean
    onHide?: () => unknown
}


export function OrderComponent({show, onHide}: OrderComponentProps) {
    const order = useOrder()
    return (
        <Offcanvas show={show} onHide={onHide}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Заказы</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {Object.values(order.orders)
                    .map((o) => <OrderItemCard key={o.product.id} orderItem={o}/>)
                }
            </Offcanvas.Body>
        </Offcanvas>
    );
}

