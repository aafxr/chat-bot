import React from 'react';
import {useNavigate} from "react-router";

import {hideOrder, showOrder} from "../../redux/slices/order-slice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {CartIcon, HomeIcon} from "../svg";

import './FooterMenu.scss'


export type FooterButtonsProps = {

}

export function FooterMenu({}: FooterButtonsProps) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {orderShow} = useAppSelector(s => s.order)



    return (
        <div className='footerMenu'>
            <div
                className={'footerMenu-button'}
                onClick={() => navigate('/')}
            >
                <HomeIcon className='footerMenu-icon' />
            </div>
            <div
                className={'footerMenu-button'}
                onClick={() => dispatch(orderShow ? hideOrder() : showOrder())}
            >
                <CartIcon className='footerMenu-icon' />
            </div>
        </div>
    );
}

