import React from 'react';
import {Link} from "react-router-dom";
import {Icon16Chevron} from "@telegram-apps/telegram-ui/dist/icons/16/chevron";
import {Avatar, Caption, Cell, Headline, Section} from "@telegram-apps/telegram-ui";


import {useAppUser} from "../../redux/hooks/useAppUser";
import {PageHeader} from "../../components/PageHeader";
import {TgUser} from "../../core/classes/TgUser";

import './ProfilePage.scss'
import {useUserCompanies} from "../../redux/hooks/useUserCompanies";
import {useUserOrders} from "../../redux/hooks/useUserOrders";
import {useUserBasket} from "../../redux/hooks/useUserBasket";




type Field<K extends keyof TgUser> = {
    id: number;
    key: K;
    value: string
};

const fields: Array<Field<keyof TgUser>> = [
    {
        id: 0,
        key: "first_name",
        value: "Имя"
    },
    {
        id: 1,
        key: "last_name",
        value: "Фамилия"
    },
    {
        id: 2,
        key: "username",
        value: "Ник"
    },
    {
        id: 3,
        key: "phone",
        value: "Телефон"
    },
];


export function ProfilePage() {
    const user = useAppUser()
    const companies = useUserCompanies()
    const orders = useUserOrders()
    const basket = useUserBasket()



    const nav = [
        {
            id: 0,
            name: "Корзина",
            link: "/basket",
            count: basket.length
        },
        {
            id: 1,
            name: "Заказы",
            link: "/orders",
            count: orders.length
        },
        {
            id: 2,
            name: "Мои компании",
            link: "/companies",
            count: companies.length
        },
    ];


    if (!user) {
        return <>unauthorized</>
    }

    return (
        <div className='profile profile-container wrapper'>
            <PageHeader title={"Профиль"}/>
            <div className='wrapper-header'>
                <Cell
                    before={
                        <Avatar
                            src={user.tgUser?.photo_url}
                            size={48}
                            fallbackIcon={
                                <span className="profile-fallback">
                                            {`${user.tgUser?.first_name[0].toUpperCase()}${user.tgUser?.last_name[0].toUpperCase()}`}
                                        </span>
                            }
                        />
                    }
                >
                    <Headline
                        weight={"1"}
                        plain
                    >
                        {`${user.tgUser?.first_name} ${user.tgUser?.last_name[0].toUpperCase()}`}
                    </Headline>
                </Cell>
            </div>
            {/*



            */}
            <div className='wrapper-content'>
                <Section
                    className='sectionBlock'
                    header={"Персональная информация"}
                >
                    {!!user && !!user.tgUser && fields.map(k => (
                            <Cell
                                key={k.id}
                                before={<Caption weight={"2"}>{k.value}</Caption>}
                                after={<Caption weight={"2"}>{user.tgUser?.[k.key]}</Caption>}
                            />
                        )
                    )}
                </Section>
                <Section
                    className='sectionBlock'
                    header={"Опции"}
                >
                    {nav.map(n => (
                        <Link key={n.id} to={n.link} className='blok'>
                            <Cell
                                before={<Caption>{n.name}</Caption>}
                                after={
                                <>
                                    <Caption>{n.count}</Caption>
                                    <Icon16Chevron/>
                                </>}
                            />
                        </Link>
                    ))}
                </Section>
            </div>
            {/*



            */}
            <div className='wrapper-footer-spacer'/>


        </div>
    );
}
