import React from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {Button, Cell, Headline, Section, Text} from "@telegram-apps/telegram-ui";

import {BasketDetailsComponent} from "../../components/BasketDetailsComponent";
import {useUserBasket} from "../../redux/hooks/useUserBasket";
import {PageHeader} from "../../components/PageHeader";
import {Container} from "../../components/Container";
import {Currency} from "../../constants/currency";

import './BasketPage.scss'
import {Block} from "../../components/Block";


const formatter = new Intl.NumberFormat(navigator.language, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
})



export function BasketPage() {
    const basket = useUserBasket()
    const navigate = useNavigate()


    function handleSendOrder(){
        navigate('/confirmOrder')
    }

    return (
        <div className='wrapper basketPage'>
            <PageHeader arrow title='Корзина'/>
            <div className='wrapper-content'>
                {!basket.length
                    ? (
                        <Block className='mt-4'>
                                <Text>Корзина пустая, вернуться в&nbsp;
                                    <Link to={'/catalog'} className='link'>каталог</Link>
                                </Text>
                        </Block>)
                    : (<section className='sectionBlock'>
                            {basket.items.map(el => (
                                <BasketDetailsComponent
                                    key={el.id}
                                    className='basketPage-item'
                                    bd={el}
                                />
                            ))}

                        </section>
                    )
                }

            </div>
            <div className='wrapper-footer'>
                <div className='basketPage-footer'>
                    <Container>
                        <div className='basketPage-summary'>
                            <Headline weight='1'>Всего:</Headline>
                            <Headline weight='1'>{formatter.format(basket.totalPrice)}&nbsp;{Currency['RUB']}</Headline>
                        </div>
                    </Container>
                    <Button
                        size='l'
                        className='basketPage-orderBtn'
                        onClick={handleSendOrder}
                        disabled={!basket.length }
                    >Оформить заказ</Button>
                </div>
            </div>
        </div>
    );
}
