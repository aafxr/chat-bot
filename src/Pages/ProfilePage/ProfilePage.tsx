import React from 'react';

import {useAppUser} from "../../redux/hooks/useAppUser";
import {Container} from "../../components/Container";
import {Subtitle} from "../../components/Subtitle";
import {Spacer} from "../../components/Spacer";
import {Title} from "../../components/Title";
import {Image} from "react-bootstrap";

import './ProfilePage.scss'



export function ProfilePage() {
    const user = useAppUser()


    return (
        <div className='profile wrapper'>
            <div className='wrapper-header'>
                <Container className='pt-2 pb-2'>
                    <Title>Профиль</Title>
                </Container>
            </div>
            <div className='wrapper-content'>
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
        </div>
    );
}
