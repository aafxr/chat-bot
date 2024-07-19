import {DBStoreDescriptionType} from "../../types/DBStoreDescriptionType";
import {StoreName} from "../../types/StoreName";

export const DB_NAME = 'fargospc'
export const DB_VERSION = 41

export const DB_STORES: DBStoreDescriptionType[] = [
    {
        name: StoreName.ITEMS,
        key: 'id',
        indexes: [],
    },
    {
        name: StoreName.SECTIONS,
        key: 'id',
        indexes: [],
    },
    {
        name: StoreName.STORE,
        key: 'name',
        indexes: [],
    },
    {
        name: StoreName.PRODUCT_DETAILS,
        key: 'id',
        indexes: [],
    },
    {
        name: StoreName.ORDERS,
        key: 'id',
        indexes: [],
    },
]