import React, {ReactNode, useState} from 'react';
import {Caption, Cell, IconButton, Section, Spinner} from "@telegram-apps/telegram-ui";

import {PageHeader} from "../../components/PageHeader";
import {Company} from "../../core/classes/Company";
import {Link} from "react-router-dom";

type CompanyField = {
    key: keyof Company
    val: string
}

export  const companyFields: CompanyField[] = [
    {
        key: 'INN',
        val: 'ИНН'
    },
    {
        key: 'name',
        val: 'Имя'
    },
    {
        key: 'fullName',
        val: 'Полное имя'
    },
    {
        key: 'country',
        val: 'Страна'
    },
    {
        key: 'city',
        val: 'Город'
    },
    {
        key: 'address',
        val: 'Адрес'
    },
]

type CompaniesPageState = {
    loading: boolean
    companies: Company[]
    message: ReactNode
}

const defaultState: CompaniesPageState = {
    companies: [
        new Company({
            INN: '213546542',
            name: 'refloor',
            city: 'russia',
            country: 'novosibirsk',
            address: 'krasnoyrsk 35'
        }),
        new Company({
            INN: '3213151542',
            name: 'QP',
            city: 'russia',
            country: 'novosibirsk',
            address: 'krasnoyrsk 35'
        }),
        new Company({
            INN: '3213151542',
            name: 'fargo clasic',
            city: 'russia',
            country: 'novosibirsk',
            address: 'krasnoyrsk 35'
        })
    ],
    loading: false,
    message: ''
}

export function CompaniesPage() {
    const [st, setState] = useState(defaultState)


    return (
        <div className='wrapper'>
            <PageHeader title='Мои компании'/>
            <div className='wrapper-content'>
                {st.loading && <Spinner size='m'/>}
                {!!st.message && (
                    <Section className='sectionBlock'>
                        <Cell before={st.message}/>
                    </Section>
                )}

                <Section className='sectionBlock'>
                    <Cell before={
                        <Link to='/company/new'>
                            <Caption>
                                Добавить компанию&nbsp;
                                <IconButton mode='plain'>
                                    <span className='icon-16'>+</span>
                                </IconButton>
                            </Caption>
                        </Link>
                    }/>
                </Section>

                {st.companies.map(c => (
                    <Link to={`/company/${c.id}`}>
                        <Section
                            key={c.id}
                            className='sectionBlock'
                            header={c.name}
                            footer={<Caption>{c.address}</Caption>}
                        >
                            {companyFields.map(e => (
                                <Cell
                                    key={e.key}
                                    before={<Caption>{e.val}</Caption>}
                                    after={<Caption>{c[e.key]}</Caption>}
                                />
                            ))}
                        </Section>
                    </Link>
                ))
                }
            </div>
            <div className='wrapper-footer-spacer'/>
        </div>
    );
}

