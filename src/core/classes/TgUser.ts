export class TgUser {
    id: string
    first_name: string
    last_name: string
    nickname: string
    photo_url: string

    constructor(u: Partial<TgUser> = {}) {
        this.id = u.id !== undefined ? u.id : ''
        this.first_name = u.first_name !== undefined ? u.first_name : ''
        this.last_name = u.last_name !== undefined ? u.last_name : ''
        this.nickname = u.nickname !== undefined ? u.nickname : ''
        this.photo_url = u.photo_url !== undefined ? u.photo_url : ''
    }


    get fullName(){
        return `${this.last_name} ${this.first_name}`
    }
}