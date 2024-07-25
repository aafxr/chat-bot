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
                                    <div className='profile-image mt-2'>
                                        <Image className='img-abs' src={user.tgUser?.photo_url || '/placeholder_image.png'} alt={user.tgUser?.fullName} roundedCircle/>
                                    </div>
                                    <Subtitle className='align-content-center mt-2'>{user.tgUser?.fullName}</Subtitle>
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
