import React, {useState} from 'react';
import {Button, Input, Section} from "@telegram-apps/telegram-ui";

import {PageHeader} from "../../components/PageHeader";
import {Company} from "../../core/classes/Company";
import {companyFields} from "../CompaniesPage";


type CompanyEditState = {
    company: Company
    hasChange: boolean
}

const defaultState: CompanyEditState = {
    company: new Company(),
    hasChange: false
}


export function CompanyEdit() {
    const [st, setState] = useState(defaultState)


    function handleChangeField(key: keyof Company, val: string) {
        const c = new Company(st.company)
        // @ts-ignore
        c[key] = val
        setState({...st, company: c, hasChange: true})
    }


    function handleSaveChanges() {

    }

    return (
        <div className='wrapper'>
            <PageHeader title='Редактировать'/>
            <div className='wrapper-content'>
                <Section className='sectionBlock'>
                    {companyFields.map(e => (
                        <Input
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
