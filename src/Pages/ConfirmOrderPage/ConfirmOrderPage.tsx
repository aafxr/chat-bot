import React, {ReactNode, useState} from 'react';
import {Button, Input, Select, Text, Textarea} from "@telegram-apps/telegram-ui";

import {useUserCompanies} from "../../redux/hooks/useUserCompanies";
import {useUserBasket} from "../../redux/hooks/useUserBasket";
import {setAppUser, setBasket} from "../../redux/slices/user-slice";
import {useAppUser} from "../../redux/hooks/useAppUser";
import {PageHeader} from "../../components/PageHeader";
import {Company} from "../../core/classes/Company";
import {useAppDispatch} from "../../redux/hooks";
import {Basket} from "../../core/classes/Basket";
import {Block} from "../../components/Block";

import './ConfirmOrderPage.scss'
import {UserService} from "../../core/services/UserService";
import {AppUser} from "../../core/classes/AppUser";
import {Link} from "react-router-dom";
import {BasketService} from "../../core/services/basketService";



export function ConfirmOrderPage() {
    const dispatch = useAppDispatch()
    const basket = useUserBasket()
    const user = useAppUser()
    const companies = useUserCompanies()

    const [phone, setPhone] = useState('')
    const [comment, setComment] = useState('')
    const [msg, setMsg] = useState<ReactNode>()


    function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        let text = e.target.value
        setPhone(text)
    }


    function handleSelectCompany(c: Company) {
        basket.company = c
        dispatch(setBasket(new Basket(basket)))
    }


    function handleConfirmOrder(){
        let m : ReactNode
        if(!user) return
        const p = phone.replaceAll(/\D/g, '')
        if(!user.phone){
            if(!/^\d{11,15}/.test(p)){
                m = (
                    <Block>
                        <Text>Не корректно указа номер телефона</Text>
                    </Block>
                )
                setMsg(m)
                return
            }
            const newUser = new AppUser(user)
            newUser.phone = +p
            UserService.updateAppUser(newUser)
                .then(() => dispatch(setAppUser(newUser)))
                .catch(console.error)
        }

        if(!companies.length){
            m = (
                <Block>
                    <Text>добавить <Link to={'/company/new'} className='link'>компанию</Link></Text>
                </Block>
            )
            setMsg(m)
            return
        }

        basket.comment = comment

        BasketService.submitBasket(basket, user)
    }


    return (
        <div className='confirmOrder wrapper'>
            <PageHeader arrow/>
            <div className='wrapper-content confirmOrder-content'>

                {msg}

                {user && !user.phone && (
                    <Block>
                        <Input
                            header={'Телефон'}
                            type='tel'
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                    </Block>
                )}


                <Block>
                    <Select header="Компания">
                        {companies.map(c => (
                            <option
                                key={c.id}
                                selected={basket.company?.id === c.id}
                                onClick={() => handleSelectCompany(c)}
                            >{c.name}</option>

                        ))}
                    </Select>
                </Block>

                <Block>
                    <Textarea
                        header='Комментарий'
                        placeholder='Комментарий к заказу'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                </Block>
            </div>
            <div className='wrapper-footer'>
                <div className='confirmOrder-footer'>
                    <Button
                        className='confirmOrder-confirmBtn'
                        onClick={handleConfirmOrder}
                    >Подтвердить</Button>
                </div>
            </div>
        </div>
    );
}

