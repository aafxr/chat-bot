import React from 'react';
import {Company} from "../../core/classes/Company";
import {usePersistStateHook} from "../../hooks/usePersistStateHook";

import {PageHeader} from "../../components/PageHeader";
import {Container} from "../../components/Container";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

import './NewCompanyPage.scss'
import {CompanyService} from "../../core/services/CompanyService";
import {botFetch} from "../../axios";


type NewCompanyPageState = {
    company: Company
    errorMessage?: string
}


const defaultState: NewCompanyPageState = {
    company: new Company()
}


export function NewCompanyPage() {
    const [state, setState] = usePersistStateHook("newCompany", defaultState)

    function handleCompanyFieldChange(key: keyof Company & string, v: string) {
        const c = new Company(state.company)
        // @ts-ignore
        c[key] = v.trim()
        setState({...state, company: c})
    }


    function handleCreateCompany(){
        CompanyService
            .createNewCompany(state.company)
            .then(() => {
                setState({company: new Company()})
                console.log('company successful created')
            })
            .catch((e: Error) => {
                console.error(e)
                setState({...state, errorMessage: e.message})
            })

    }


    function handleFetchMe(){
        botFetch.get('/api/me')
            .then(console.log)
            .catch(console.error)
    }


    return (
        <div className='companyForm wrapper'>
            <div className='wrapper-header'>
                <PageHeader title={"Компания"}/>
            </div>

            <div className='wrapper-content'>
                <Container className='companyForm-container'>
                    {state.errorMessage && <div>{state.errorMessage}</div>}
                    <label htmlFor="company-name">Название</label>
                    <Input
                        id='company-name'
                        className='companyForm-input'
                        placeholder='Название'
                        value={state?.company.name}
                        onChange={e => handleCompanyFieldChange('name', e)}
                    />

                    <label htmlFor='company-fullname'>Полное название</label>
                    <Input
                        id='company-fullname'
                        className='companyForm-input'
                        placeholder='Полное название'
                        value={state?.company.fullName}
                        onChange={e => handleCompanyFieldChange('fullName', e)}
                    />

                    <label htmlFor='company-address'>Адресс</label>
                    <Input
                        id='company-address'
                        className='companyForm-input'
                        placeholder='Адресс'
                        value={state?.company.address}
                        onChange={e => handleCompanyFieldChange('address', e)}
                    />

                    <label htmlFor='company-city'>Город</label>
                    <Input
                        id='company-city'
                        className='companyForm-input'
                        placeholder='Город'
                        value={state?.company.city}
                        onChange={e => handleCompanyFieldChange('city', e)}
                    />

                    <label htmlFor='company-country'>Страна</label>
                    <Input
                        id='company-country'
                        className='companyForm-input'
                        placeholder='Страна'
                        value={state?.company.country}
                        onChange={e => handleCompanyFieldChange('country', e)}
                    />

                    <label htmlFor='company-inn'>ИНН</label>
                    <Input
                        id='company-inn'
                        className='companyForm-input'
                        placeholder='ИНН'
                        value={state?.company.INN}
                        onChange={e => handleCompanyFieldChange('INN', e)}
                    />

                    <Button
                        className='companyForm-btn'
                        onClick={handleCreateCompany}
                    >
                        Добавить
                    </Button>
                    <Button
                        className='companyForm-btn'
                        onClick={handleFetchMe}
                    >
                        me
                    </Button>
                </Container>
            </div>

        </div>
    );
}

