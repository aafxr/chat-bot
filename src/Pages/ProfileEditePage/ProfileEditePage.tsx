import {useNavigate} from "react-router";
import React, {useEffect, useState} from 'react';
import {Button, Section, Select} from "@telegram-apps/telegram-ui";

import {StorehouseService, StoreHouseType} from "../../core/services/StorehouseService";
import {useAppUser} from "../../redux/hooks/useAppUser";
import {AppUser} from "../../core/classes/AppUser";

import './ProfileEditePage.scss'

type ProfileEditePageState = {
    changed: boolean
    user: AppUser
    storehouses: StoreHouseType[]
}

const defaultState: ProfileEditePageState = {
    changed: false,
    user: new AppUser(),
    storehouses: []
}

export function ProfileEditePage() {
    const navigate = useNavigate()
    const user = useAppUser()
    const [s, setState] = useState(defaultState)


    useEffect(() => {
        if (!user) return
        setState({...s, user: new AppUser(user)})
        StorehouseService.getStoreHousesList()
            .then(shl => setState({
                changed: false,
                user: new AppUser(user),
                storehouses: shl
            }))
    }, []);


    function handleStorehouseChange(sh: StoreHouseType){

    }


    function handleSave() {

    }


    function handleCancel() {
        navigate(-1)
    }


    return (
        <div className='wrapper profileEdite'>
            <div className='wrapper-content'>
                <Section className='sectionBlock'>
                    <div className='profileEdite-field'>
                        <Select header='Склад'>
                            {
                                s.storehouses.map(sh => (
                                    <option
                                        key={sh.id}
                                        selected={user?.storehouseId === sh.id}
                                        onClick={() => handleStorehouseChange(sh)}
                                    >{sh.storehouse}</option>
                                ))
                            }
                        </Select>

                    </div>
                </Section>
            </div>
            <div className='wrapper-footer'>
                <div className='profileEdite-footer'>
                    <Button
                        className='profileEdite-footerBtn profileEdite-footerBtn-save'
                        size='l'
                        onClick={handleSave}
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

