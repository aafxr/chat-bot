import React from 'react';

import {Container} from "../../components/Container";
import {Subtitle} from "../../components/Subtitle";
import {useUser} from "../../redux/hooks/useUser";
import {Spacer} from "../../components/Spacer";
import {Title} from "../../components/Title";
import {Image} from "react-bootstrap";

import './ProfilePage.scss'

export function ProfilePage() {
    const user = useUser()


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
                                    <div className='profile-image mt-2'>
                                        <Image src={user.photo_url} alt={user.fullName} roundedCircle/>
                                    </div>
                                    <Subtitle className='mt-2'>{user.fullName}</Subtitle>
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
