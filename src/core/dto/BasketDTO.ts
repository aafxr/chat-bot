import {AppUser} from "../classes/AppUser";
import {Company} from "../classes/Company";
import {Basket, BasketDetail} from "../classes/Basket";

export class BasketDTO{
    items: BasketDetail[]
    comment: string
    userId: AppUser['id']
    userPhone: AppUser['phone']
    companyID: Company['id']

    constructor(b:Basket) {
        this.items = b.items
        this.comment = b.comment
        this.userId = b.userId
        this.userPhone = b.userPhone
        this.companyID = b.companyID || b.company?.id || 0
    }
}