import React from 'react';
import {NavLink} from "react-router-dom";

import {CartIcon, HeartIcon, HomeIcon, UserIcon} from "../svg";

import './FooterMenu.scss'


export type FooterButtonsProps = {}

export function FooterMenu({}: FooterButtonsProps) {
    const navLinkClassName = ({isActive, isPending}: {
        isActive: boolean,
        isPending: boolean
    }) => isPending ? "pending" : isActive ? "active" : ""


    return (
        <div className='footerMenu footerMenu-container'>
            <div className='footerMenu-item'>
                <NavLink to='/' className={navLinkClassName}>
                    <HomeIcon className='footerMenu-icon'/>
                    <div className='footerMenu-text'>Каталог</div>
                </NavLink>
            </div>
            <div className='footerMenu-item'>
                <NavLink to='/order' className={navLinkClassName}>
                    <CartIcon className='footerMenu-icon'/>
                    <div className='footerMenu-text'>Заказы</div>
                </NavLink>
            </div>
            <div className='footerMenu-item'>
                <NavLink to='/favorite' className={navLinkClassName}>
                    <HeartIcon className='footerMenu-icon'/>
                    <div className='footerMenu-text'>Избранное</div>
                </NavLink>
            </div>
            <div className='footerMenu-item'>
                <NavLink to='/profile' className={navLinkClassName}>
                    <UserIcon className='footerMenu-icon'/>
                    <div className='footerMenu-text'>Профиль</div>
                </NavLink>
            </div>
        </div>
    );
}

