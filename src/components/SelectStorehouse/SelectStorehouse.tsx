import React from 'react';
import {Select} from "@telegram-apps/telegram-ui";
import {useAppUser} from "../../redux/hooks/useAppUser";
import {StorehouseService, StoreHouseType} from "../../core/services/StorehouseService";

type SelectStorehouseProps = {
    onChange?: (sh: StoreHouseType) => unknown
}

export function SelectStorehouse({onChange}: SelectStorehouseProps) {
    const user = useAppUser()
    const storehouses = StorehouseService.getStoreHousesList()


    function handleStorehouseChange(storehouseId: string){
        const sh = storehouses.find(sh => sh.id === storehouseId)
        if (sh && onChange) onChange(sh)
    }

    return (
        <Select header='Склад' onChange={e => handleStorehouseChange(e.target.value)}>
            {
                storehouses.map(sh => (
                    <option
                        key={sh.id}
                        selected={user?.storehouseId === sh.id}
                        value={sh.id}
                    >{sh.storehouse}</option>
                ))
            }
        </Select>
    );
}

