import React, {useEffect, useState} from 'react';

import {useAppUser} from "../../redux/hooks/useAppUser";

import {Icon24ChevronRight} from "@telegram-apps/telegram-ui/dist/icons/24/chevron_right";
import {Avatar, Text, Title} from "@telegram-apps/telegram-ui";
import {Container} from "../../components/Container";

import './ProfilePage.scss'



export function ProfilePage() {
    const user = useAppUser()


    if(!user){
        return <>unauthorized</>
    }

    return (
        <div className='profile wrapper'>
            <Container>
                <Avatar src={user.tgUser?.photo_url} size={48} />
                <Text>{user.tgUser?.fullName}</Text>
                <Icon24ChevronRight />

            </Container>


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
