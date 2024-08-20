import React, {ReactNode, useRef, useState} from 'react';
import {Button, Caption, Cell, IconButton, Section, Snackbar, Spinner} from "@telegram-apps/telegram-ui";

import {PageHeader} from "../../components/PageHeader";
import {Company} from "../../core/classes/Company";
import {Link} from "react-router-dom";
import {useUserCompanies} from "../../redux/hooks/useUserCompanies";
import {Modal, ModalHeader, Placeholder} from "react-bootstrap";
import {ModalClose} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import {Icon28Close} from "@telegram-apps/telegram-ui/dist/icons/28/close";
import {UserService} from "../../core/services/UserService";
import {useAppUser} from "../../redux/hooks/useAppUser";

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
    const [st, setState] = useState(defaultState)
    const user = useAppUser()
    const companies = useUserCompanies()


    function handleRemoveCompanyClick(e: React.MouseEvent<HTMLButtonElement>, c: Company){
        e.stopPropagation()
        e.preventDefault()
        if(! user ) return
        UserService.removeCompany(user, c).catch(console.error)
    }


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
                    <Link to='/company/new'>
                        <Cell before={
                            <Caption>
                                Добавить компанию&nbsp;
                                <IconButton mode='plain'>
                                    <span className='icon-16'>+</span>
                                </IconButton>
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

