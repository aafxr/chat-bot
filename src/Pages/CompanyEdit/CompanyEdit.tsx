import React, {ReactNode, useEffect, useState} from 'react';
import {Button, Caption, Cell, Input, Section} from "@telegram-apps/telegram-ui";

import {PageHeader} from "../../components/PageHeader";
import {Company} from "../../core/classes/Company";
import {companyFields} from "../CompaniesPage";
import {useLocation, useNavigate, useParams} from "react-router";
import {UserService} from "../../core/services/UserService";
import {useAppUser} from "../../redux/hooks/useAppUser";
import {useAppDispatch} from "../../redux/hooks";
import {updateCompany} from "../../redux/slices/user-slice";
import {useUserCompanies} from "../../redux/hooks/useUserCompanies";


type CompanyEditState = {
    company: Company
    hasChange: boolean
    message: ReactNode
}

const defaultState: CompanyEditState = {
    company: new Company(),
    hasChange: false,
    message: null
}


export function CompanyEdit() {
    const {companyID} = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppUser()
    const companies = useUserCompanies()
    const [st, setState] = useState(defaultState)

    const isNewCompany = !companyID


    useEffect(() => {
        if(!companyID) return
        const id =  +companyID!
        const c = companies.find(c => c.id === id)
        if(c) setState({
            ...st,
            company: c
        })
    }, [companies, companyID]);



    function handleChangeField(key: keyof Company, val: string) {
        const c = new Company(st.company)
        // @ts-ignore
        c[key] = val
        setState({...st, company: c, hasChange: true})
    }


    function handleSaveChanges() {
        if (!user) return

        const c = st.company

        const msg = c.validate()

        if (msg !== "ok") {
            setState({
                ...st,
                message: <Message text={msg}/>
            })
            return
        }


        isNewCompany
            ? UserService.newCompany(user, c)
                .then(() => {
                    dispatch(updateCompany(c))
                    navigate('/companies')
                })
                .catch((e) => {
                    setState({
                        ...st,
                        message: <Message text={`Не удалось добавить компанию. Попробуйте отправить еще раз.`}/>
                    })
                })
            : UserService.updateCompany(user, c)
                .then(() => {
                    dispatch(updateCompany(c))
                    navigate('/companies')
                })
                .catch((e) => {
                    setState({
                        ...st,
                        message: <Message text={`Не удалось обновить компанию. Попробуйте отправить еще раз.`}/>
                    })
                })
    }

    return (
        <div className='wrapper'>
            <PageHeader title='Редактировать'/>
            <div className='wrapper-content'>
                {st.message}
                <Section className='sectionBlock'>
                    {companyFields.map(e => (
                        <Input
                            key={e.key}
                            className='inputBase'
                            header={e.val}
                            placeholder={e.val}
                            value={st.company[e.key]}
                            onChange={event => handleChangeField(e.key, event.target.value)}
                        />
                    ))}
                </Section>
            </div>
            <Section className='sectionBlock wrapper-footer'>
                <Button
                    className='w-full'
                    size='m'
                    onClick={handleSaveChanges}
                    disabled={!st.hasChange}
                >
                    Сохранить
                </Button>
            </Section>
            <div className='wrapper-footer-spacer'/>
        </div>
    );
}


type MessageProps = {
    text: string
}

function Message({text}: MessageProps) {
    return (
        <Section className='sectionBlock'>
            <Cell
                before={<Caption>{text}</Caption>}
            />
        </Section>
    )
}

