import {CatalogPhotoType} from "../../types/CatalogPhotoType";
import {ProductProperty} from "./ProductProperty";
import {ProductDetails} from "./ProductDetails";
import {Balance} from "./Balance";

export class Product{
    id: string
    title: string
    apiCode: string
    apiUID: null | any
    currency: string
    preview: string
    price: string
    photo: CatalogPhotoType[]
    properties: ProductProperty[]

    details: ProductDetails | null


    constructor(item: Partial<Product> = {}) {
        this.id = item.id !== undefined ? item.id : ''
        this.title = item.title !== undefined ? item.title : ''
        this.apiCode = item.apiCode !== undefined ? item.apiCode : ''
        this.apiUID = item.apiUID !== undefined ? item.apiUID : ''
        this.currency = item.currency !== undefined ? item.currency : 'RUB'
        this.preview = item.preview !== undefined ? item.preview : ''
        this.price = item.price !== undefined ? item.price : ''
        this.photo = item.photo !== undefined ? item.photo : []
        this.properties = item.properties !== undefined ? item.properties : []
        this.details = item.details  ? new ProductDetails(item.details) : null
    }

    isInStorehouse(shId: Balance['TradeArea_Id']){
        if(!this.details) return false
        return !!this.details.Balance_Strings.find(bs => bs.TradeArea_Id === shId)
    }
}