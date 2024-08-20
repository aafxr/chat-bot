import React from 'react';
import {Link} from "react-router-dom";
import {Icon16Chevron} from "@telegram-apps/telegram-ui/dist/icons/16/chevron";
import {Avatar, Caption, Cell, Headline, Section} from "@telegram-apps/telegram-ui";


import {useAppUser} from "../../redux/hooks/useAppUser";
import {PageHeader} from "../../components/PageHeader";
import {TgUser} from "../../core/classes/TgUser";

import './ProfilePage.scss'


const nav = [
    {
        id: 0,
        name: "Корзина",
        link: "/basket",
    },
    {
        id: 1,
        name: "Заказы",
        link: "/orders",
    },
    {
        id: 2,
        name: "Мои компании",
        link: "/companies",
    },
];

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
                                after={<Icon16Chevron/>}
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


/*
<PageHeader title={'Профиль'}/>
            <div className='wrapper-content'>
                <Link to={'/Teleeeg_bot/test'} className={'link'}>test</Link>

                {user
                    ? (
                        <>
                            <Container>
                                <div className='profile-content'>
                                    <div className='profile-image'>
                                        <Image className='img-abs' src={user.tgUser?.photo_url || '/placeholder_image.png'} alt={user.tgUser?.fullName} roundedCircle/>
                                    </div>
                                    <div className='profile-inner'>
                                        <Subtitle className='profile-name'>{user.tgUser?.fullName}</Subtitle>
                                        <dl>
                                            <dt>Имя</dt>
                                            <dd>{user.first_name}</dd>
                                        </dl>
                                        <dl>
                                            <dt>Никнейм</dt>
                                            <dd>{user.username}</dd>
                                        </dl>
                                        <dl>
                                            <dt>Телефон</dt>
                                            <dd>{user.phone}</dd>
                                        </dl>
                                        <dl>
                                            <dt>Страна</dt>
                                            <dd>{user.country}</dd>
                                        </dl>
                                        <dl>
                                            <dt>Город</dt>
                                            <dd>{user.city}</dd>
                                        </dl>
                                        <dl>
                                            <dt>Организация</dt>
                                            <dd>{user.org}</dd>
                                        </dl>
                                        <dl>
                                            <dt>Манаджер</dt>
                                            <dd>{user.manager}</dd>
                                        </dl>


                                    </div>
                                </div>
                            </Container>
                            <Spacer/>
                        </>
                    ) : (
                        <Container>
                            <p>Вы не авторизованы</p>
                        </Container>
                    )
                }


            </div>
 */
