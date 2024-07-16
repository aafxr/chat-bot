import {CatalogPhotoType} from "../../types/CatalogPhotoType";
import {CatalogItemProperty} from "./CatalogItemProperty";

export class CatalogItem{
    id: string
    title: string
    apiCode: string
    apiUID: null | any
    currency: string
    preview: string
    price: string
    photo: CatalogPhotoType[]
    properties: CatalogItemProperty[]


    constructor(item: Partial<CatalogItem> = {}) {
        this.id = item.id !== undefined ? item.id : ''
        this.title = item.title !== undefined ? item.title : ''
        this.apiCode = item.apiCode !== undefined ? item.apiCode : ''
        this.apiUID = item.apiUID !== undefined ? item.apiUID : ''
        this.currency = item.currency !== undefined ? item.currency : ''
        this.preview = item.preview !== undefined ? item.preview : ''
        this.price = item.price !== undefined ? item.price : ''
        this.photo = item.photo !== undefined ? item.photo : []
        this.properties = item.properties !== undefined ? item.properties : []
    }
}