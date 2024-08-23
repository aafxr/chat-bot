import React, {useEffect, useState} from 'react';
import {Tabbar} from "@telegram-apps/telegram-ui";
import {useLocation, useNavigate} from "react-router";

import {BasketIcon, CartIcon, HeartIcon, HomeIcon, UserIcon} from "../svg";

import './FooterMenu.scss'

const navItems = [
    {
        id: 0,
        name: "Каталог",
        icon: <HomeIcon className='footerMenu-icon'/>,
        link: '/'
    },
    {
        id: 1,
        name: "Корзина",
        icon: <BasketIcon className='footerMenu-icon'/>,
        link: '/basket'
    },
    {
        id: 2,
        name: "Заказы",
        icon: <CartIcon className='footerMenu-icon'/>,
        link: '/orders'
    },
    {
        id: 3,
        name: "Избранное",
        icon: <HeartIcon className='footerMenu-icon'/>,
        link: '/favorite'
    },
    {
        id: 4,
        name: "Профиль",
        icon: <UserIcon className='footerMenu-icon'/>,
        link: '/profile'
    },
]



export function FooterMenu() {
    const [selected, setSelected] = useState<number>()
    const {pathname} = useLocation()
    const navigate = useNavigate()


    useEffect(() => {
        const idx = navItems.findIndex(e => e.link === pathname)
        if (idx !== selected) setSelected(idx)
    }, [pathname]);


    return (
            <Tabbar className="footerMenu footerMenu-container">
                {
                    navItems.map(item => (
                        <Tabbar.Item className="footerMenu-item" key={item.id} text={item.name} selected={item.id === selected}
                                     onClick={() => navigate(item.link)}>
                            {item.icon}
                        </Tabbar.Item>
                    ))
                }

            </Tabbar>
    );
}

