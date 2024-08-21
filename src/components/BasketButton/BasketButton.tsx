import React from 'react';
import {useNavigate} from "react-router";
import {Button} from "@telegram-apps/telegram-ui";

import {useUserBasket} from "../../redux/hooks/useUserBasket";
import {BasketIcon} from "../svg";

import './BasketButton.scss'


export type BasketButtonProps = {}


export function BasketButton({}: BasketButtonProps) {
    const basket = useUserBasket()
    const navigate = useNavigate()


    if(!basket.length){
        return null
    }


    return (
        <Button
            className='basketButton'
            mode="filled"
            size='m'
            onClick={() => navigate('/basket')}
        >
            <BasketIcon className='icon-16'/>
        </Button>
    );
}

