export class User{
    id: number
    first_name: string
    last_name: string
    username: string
    photo_url: string


    constructor(u: Partial<User> = {}) {
        this.id = u.id !== undefined ? u.id : -1
        this.first_name = u.first_name !== undefined ? u.first_name : ''
        this.last_name = u.last_name !== undefined ? u.last_name : ''
        this.username = u.username !== undefined ? u.username : ''
        this.photo_url = u.photo_url !== undefined ? u.photo_url : ''
    }


    get fullName(){
        return `${this.last_name} ${this.first_name}`
    }
}