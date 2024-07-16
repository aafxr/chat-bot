import {DBStoreDescriptionType} from "../../types/DBStoreDescriptionType";
import {StoreName} from "../../types/StoreName";
import {IndexName} from "../../types/IndexName";

export const DB_NAME = 'fargospc'
export const DB_VERSION = 40

export const DB_STORES: DBStoreDescriptionType[] = [
    {
        name: StoreName.ITEMS,
        key: 'id',
        indexes: [],

    }
]