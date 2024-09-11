import React, {useState} from 'react';
import {Button, Modal, Placeholder, Title} from "@telegram-apps/telegram-ui";
import {SelectStorehouse} from "../../SelectStorehouse";
import {UserService} from "../../../core/services/UserService";
import {StoreHouseType} from "../../../core/services/StorehouseService";
import {useAppUser} from "../../../redux/hooks/useAppUser";
import {AppUser} from "../../../core/classes/AppUser";
import {Subtitle} from "../../Subtitle";


type SelectStoreHouseModalProps = {
    open?: boolean
    onOpenChange?: (open: boolean) => unknown
}


export function SelectStoreHouseModal({open, onOpenChange}: SelectStoreHouseModalProps) {
    const user = useAppUser()
    const [sh, setStorehouse] = useState<StoreHouseType>()

    function handleSave() {
        if (!sh || !user) return
        const u = new AppUser(user)
        u.storehouseId = sh.id
        UserService.updateAppUser(u)
            .catch(console.error)
            .finally(() => onOpenChange?.(false))
    }


    return (
        <Modal
            // className='modal'
            open={open}
            onOpenChange={onOpenChange}

        >
            <Placeholder>
                <Subtitle >Ближайший к вам склад</Subtitle>
                <SelectStorehouse onChange={setStorehouse} />
                <Button
                    stretched
                    disabled={!sh}
                    onClick={handleSave}
                >Сохранить</Button>
            </Placeholder>
        </Modal>
    );
}

