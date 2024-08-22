import {Link} from "react-router-dom";
import React, {ReactNode, useState} from 'react';
import {Button, Caption, Cell, Section, Spinner} from "@telegram-apps/telegram-ui";

import {useUserCompanies} from "../../redux/hooks/useUserCompanies";
import {useArrowBack} from "../../redux/hooks/useArrowBack";
import {UserService} from "../../core/services/UserService";
import {useAppUser} from "../../redux/hooks/useAppUser";
import {PageHeader} from "../../components/PageHeader";
import {Company} from "../../core/classes/Company";

type CompanyField = {
    key: keyof Omit<Company, "id" | "validate">
    val: string
}

export const companyFields: CompanyField[] = [
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
    showSnakeBar: boolean
}

const defaultState: CompaniesPageState = {
    companies: [],
    loading: false,
    message: '',
    showSnakeBar: false
}

export function CompaniesPage() {
    useArrowBack()
    const [st, setState] = useState(defaultState)
    const user = useAppUser()
    const companies = useUserCompanies()


    function handleRemoveCompanyClick(e: React.MouseEvent<HTMLButtonElement>, c: Company) {
        e.stopPropagation()
        e.preventDefault()
        if (!user) return
        UserService.removeCompany(user, c).catch(console.error)
    }


    return (
        <div className='wrapper'>
            <PageHeader arrow title='Мои компании'/>
            <div className='wrapper-content'>
                {st.loading && <Spinner size='m'/>}
                {!!st.message && (
                    <Section className='sectionBlock'>
                        <Cell before={st.message}/>
                    </Section>
                )}

                <Section className='sectionBlock'>
                    <Link to='/company/new'>
                        <Cell before={
                            <Caption>
                                Добавить компанию&nbsp;
                                <Button size='s' mode='plain'>+</Button>
                            </Caption>
                        }/>
                    </Link>
                </Section>

                {companies.map(c => (
                    <Link to={`/company/${c.id}`}>
                        <Section
                            key={c.id}
                            className='sectionBlock'
                            header={c.name}
                            footer={
                                <Button
                                    mode='plain'
                                    onClick={(e) => handleRemoveCompanyClick(e, c)}
                                >
                                    Удалить
                                </Button>
                            }
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

