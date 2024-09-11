import {useNavigate} from "react-router";
import React, {useEffect, useState} from 'react';
import {Button, Section, Select, Caption} from "@telegram-apps/telegram-ui";

import {StorehouseService, StoreHouseType} from "../../core/services/StorehouseService";
import {UserService} from "../../core/services/UserService";
import {useAppUser} from "../../redux/hooks/useAppUser";
import {AppUser} from "../../core/classes/AppUser";

import './ProfileEditePage.scss'
import {SelectStorehouse} from "../../components/SelectStorehouse";

type ProfileEditePageState = {
    changed: boolean
    user: AppUser
    storehouses: StoreHouseType[]
    message: string
}

const defaultState: ProfileEditePageState = {
    changed: false,
    user: new AppUser(),
    storehouses: [],
    message: ''
}

export function ProfileEditePage() {
    const navigate = useNavigate()
    const user = useAppUser()
    const [s, setState] = useState(defaultState)


    useEffect(() => {
        if (!user) return
        setState({...s, user: new AppUser(user)})
        const shl = StorehouseService.getStoreHousesList()
        setState({
            ...s,
            changed: false,
            user: new AppUser(user),
            storehouses: shl
        })
    }, []);


    function handleStorehouseChange(sh: StoreHouseType) {
        const newUser = new AppUser(s.user)
        if (newUser.storehouseId !== sh.id) {
            newUser.storehouseId = sh.id
            setState({...s, changed: true, user: newUser})
        }
    }


    function handleSave() {
        if (!s.changed) return
        UserService.updateAppUser(s.user)
            .then(() => navigate(-1))
            .catch(e => setState({...s, message: e.message}))
    }


    function handleCancel() {
        navigate(-1)
    }


    return (
        <div className='wrapper profileEdite'>
            <div className='wrapper-content'>
                {s.message && (
                    <Section className='sectionBlock'>
                        <Caption>{s.message}</Caption>
                    </Section>
                )}
                <Section className='sectionBlock'>
                    <div className='profileEdite-field'>
                        <SelectStorehouse onChange={handleStorehouseChange}/>
                    </div>
                </Section>
            </div>
            <div className='wrapper-footer'>
                <div className='profileEdite-footer'>
                    <Button
                        className='profileEdite-footerBtn profileEdite-footerBtn-save'
                        size='l'
                        onClick={handleSave}
                        disabled={!s.changed}
                    >
                        Сохранить
                    </Button>
                    <Button
                        className='profileEdite-footerBtn profileEdite-footerBtn-cancel'
                        size='l'
                        mode='gray'
                        onClick={handleCancel}
                    >
                        Назад
                    </Button>
                </div>
            </div>
        </div>
    );
}

