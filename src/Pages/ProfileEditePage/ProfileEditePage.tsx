import React, {useEffect, useState} from 'react';
import {Button} from "@telegram-apps/telegram-ui";

import {useAppUser} from "../../redux/hooks/useAppUser";

import './ProfileEditePage.scss'
import {AppUser} from "../../core/classes/AppUser";

type ProfileEditePageState = {
    changed: boolean
    user: AppUser
}

const defaultState: ProfileEditePageState = {
    changed: false,
    user: new AppUser()
}

export function ProfileEditePage() {
    const user = useAppUser()
    const [s, setState] = useState(defaultState)


    useEffect(() => {
        if (!user) return
        setState({...s, user: new AppUser(user)})
    }, []);


    return (
        <div className='wrapper profileEdite'>
            {/*<div className='wrapper-header'>*/}
            {/*    <PageHeader title='Редактировать ' />*/}
            {/*</div>*/}
            <div className='wrapper-content'>

            </div>
            <div className='wrapper-footer'>
                <div className='profileEdite-footer'>
                    <Button className='profileEdite-footerBtn profileEdite-footerBtn-save' size='l'>
                        Сохранить
                    </Button>
                    <Button className='profileEdite-footerBtn profileEdite-footerBtn-cancel' size='l' mode='gray'>
                        Назад
                    </Button>
                </div>
            </div>
        </div>
    );
}

