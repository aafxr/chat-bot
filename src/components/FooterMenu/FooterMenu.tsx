import React, {useEffect, useState} from 'react';

import {CartIcon, HeartIcon, HomeIcon, UserIcon} from "../svg";

import './FooterMenu.scss'
import {useLocation, useNavigate} from "react-router";
import {Tabbar} from "@telegram-apps/telegram-ui";

const navItems = [
    {
        id: 0,
        name: "Каталог",
        icon: <HomeIcon className='footerMenu-icon'/>,
        link: '/'
    },
    {
        id: 1,
        name: "Заказ",
        icon: <CartIcon className='footerMenu-icon'/>,
        link: '/order'
    },
    {
        id: 2,
        name: "Избранное",
        icon: <HeartIcon className='footerMenu-icon'/>,
        link: '/favorite'
    },
    {
        id: 3,
        name: "Профиль",
        icon: <UserIcon className='footerMenu-icon'/>,
        link: '/profile'
    },
]



export function FooterMenu() {
    const [selected, setSelected] = useState(0)
    const {pathname} = useLocation()
    const navigate = useNavigate()


    useEffect(() => {
        const idx = navItems.findIndex(e => e.link === pathname)
        if (idx !== selected) setSelected(idx)
    }, [pathname]);


    return (
            <Tabbar>
                {
                    navItems.map(item => (
                        <Tabbar.Item key={item.id} text={item.name} selected={item.id === selected}
                                     onClick={() => navigate(item.link)}>
                            {item.icon}
                        </Tabbar.Item>
                    ))
                }

            </Tabbar>
    );
}

