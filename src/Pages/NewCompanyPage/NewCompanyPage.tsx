import React from 'react';
import {Company} from "../../core/classes/Company";
import {usePersistStateHook} from "../../hooks/usePersistStateHook";

type NewCompanyPageState = {

}

const defaultState: NewCompanyPageState ={
    company: Company

}
export function NewCompanyPage() {
    const [state, setState] = usePersistStateHook("newCompany", defaultState)

    return (
        <div></div>
    );
}

