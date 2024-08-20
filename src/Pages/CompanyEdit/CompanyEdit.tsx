import React, {ReactNode, useState} from 'react';
import {Button, Caption, Cell, Input, Section} from "@telegram-apps/telegram-ui";

import {PageHeader} from "../../components/PageHeader";
import {Company} from "../../core/classes/Company";
import {companyFields} from "../CompaniesPage";
import {useLocation, useNavigate} from "react-router";
import {UserService} from "../../core/services/UserService";
import {useAppUser} from "../../redux/hooks/useAppUser";
import {useAppDispatch} from "../../redux/hooks";
import {updateCompany} from "../../redux/slices/user-slice";


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
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppUser()
    const [st, setState] = useState(defaultState)

    const isNewCompany = pathname.endsWith('new')


    function handleChangeField(key: keyof Company, val: string) {
        const c = new Company(st.company)
        // @ts-ignore
        c[key] = val
        setState({...st, company: c, hasChange: true})
    }


    function handleSaveChanges() {
        if (!user) return

        const c = st.company

        for(const f of companyFields){
            if (!c[f.key]){
                setState({
                    ...st,
                    message: <Message text={`Необходимо заполнить поле "${f.val}"`} />
                })
                return
            }
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
                        message: <Message text={`Не удалось добавить компанию. Попробуйте отправить еще раз.`} />
                    })
                })
            :UserService.updateCompany(user, c)
                .then(() => {
                    dispatch(updateCompany(c))
                    navigate('/companies')
                })
                .catch((e) => {
                    setState({
                        ...st,
                        message: <Message text={`Не удалось обновить компанию. Попробуйте отправить еще раз.`} />
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
        <Section>
            <Cell
                before={<Caption>{text}</Caption>}
            />
        </Section>
    )
}

