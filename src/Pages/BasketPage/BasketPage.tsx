import React from 'react';
import {Link} from "react-router-dom";

import {Caption, Cell, Section, Text} from "@telegram-apps/telegram-ui";
import {useUserBasket} from "../../redux/hooks/useUserBasket";
import {PageHeader} from "../../components/PageHeader";

export function BasketPage() {
    const basket = useUserBasket()

    return (
        <div className='wrapper'>
            <PageHeader arrow title='Корзина'/>
            <div className='wrapper-content'>
                {!basket.length
                    ? (
                        <Section className='sectionBlock'>
                            <Cell >
                                <Text>Корзина пустая, вернуться в&nbsp;
                                    <Link to={'/catalog'} className='link'>каталог</Link>
                                </Text>
                            </Cell>
                        </Section>)
                    : (<Section className='sectionBlock'>
                            {basket.items.map(el => (
                                <Cell description={
                                    <>
                                        <Caption>{el.count}&nbsp;{el.measure}</Caption>
                                        <Caption>{el.packCount}&nbsp;{el.packMeasure}</Caption>
                                    </>
                                }>{el.title}</Cell>
                            ))}

                        </Section>
                    )
                }

            </div>
            <div className='wrapper-footer-spacer'/>
        </div>
    );
}

