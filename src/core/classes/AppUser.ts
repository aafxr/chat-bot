export class AppUser {
    id: number
    telegram_id: string
    first_name: string
    username: string
    activity: string
    created_at: string
    updated_at: string
    stage: string
    article: any | null
    product: any | null
    order_available: number
    trade_area: any | null
    basket_item_id: any | null
    manager: number
    org: string
    buttonstat: any | null
    inputstat: any | null
    city: string
    request: number
    phone: number
    country: string


    constructor(u: Partial<AppUser> = {}) {
        this.id = u.id !== undefined ? u.id : -1
        this.telegram_id = u.telegram_id !== undefined ? u.telegram_id : ''
        this.first_name = u.first_name !== undefined ? u.first_name : ''
        this.username = u.username !== undefined ? u.username : ''
        this.activity = u.activity !== undefined ? u.activity : ''
        this.created_at = u.created_at !== undefined ? u.created_at : ''
        this.updated_at = u.updated_at !== undefined ? u.updated_at : ''
        this.stage = u.stage !== undefined ? u.stage : ''
        this.article = u.article !== undefined ? u.article : null
        this.product = u.product !== undefined ? u.product : null
        this.order_available = u.order_available !== undefined ? u.order_available : -1
        this.trade_area = u.trade_area !== undefined ? u.trade_area : null
        this.basket_item_id = u.basket_item_id !== undefined ? u.basket_item_id : null
        this.manager = u.manager !== undefined ? u.manager : -1
        this.org = u.org !== undefined ? u.org : ''
        this.buttonstat = u.buttonstat !== undefined ? u.buttonstat : null
        this.inputstat = u.inputstat !== undefined ? u.inputstat : null
        this.city = u.city !== undefined ? u.city : ''
        this.request = u.request !== undefined ? u.request : -1
        this.phone = u.phone !== undefined ? u.phone : -1
        this.country = u.country !== undefined ? u.country : ''
    }
}