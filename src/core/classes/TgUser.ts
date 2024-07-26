export class TgUser {
    id: string
    first_name: string
    last_name: string
    username: string
    photo_url: string

    phone: string


    constructor(u: Partial<TgUser> = {}) {
        this.id = u.id !== undefined ? u.id : ''
        this.first_name = u.first_name !== undefined ? u.first_name : ''
        this.last_name = u.last_name !== undefined ? u.last_name : ''
        this.username = u.username !== undefined ? u.username : ''
        this.photo_url = u.photo_url !== undefined ? u.photo_url : ''
        this.phone = u.phone !== undefined ? u.phone : ''
    }


    get fullName(){
        return `${this.last_name} ${this.first_name}`
    }
}