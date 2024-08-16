import React, {} from 'react';
import {Icon16Chevron} from "@telegram-apps/telegram-ui/dist/icons/16/chevron";

import {useAppUser} from "../../redux/hooks/useAppUser";

import {Avatar, Cell, Headline, Section, Text} from "@telegram-apps/telegram-ui";
import {PageHeader} from "../../components/PageHeader";
import {TgUser} from "../../core/classes/TgUser";

import {InfoRow} from "../../components/InfoRow";
import {LinkRow} from "../../components/LinkRow";
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
                <Section className='sectionBlock'>
                    {!!user && !!user.tgUser && (
                        <>
                            {fields.map(k => (
                                <InfoRow key={k.id} before={<Text>{k.value}</Text>}><Text>{user.tgUser?.[k.key]}</Text></InfoRow>
                            ))}
                        </>
                    )}
                </Section>
                <Section className='sectionBlock'>
                    {nav.map(n => (
                        <LinkRow key={n.id} to={n.link} after={<Icon16Chevron/>}>
                            <Text>{n.name}</Text>
                        </LinkRow>
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
