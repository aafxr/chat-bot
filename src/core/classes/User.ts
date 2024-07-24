export class User{
    id: number
    first_name: string
    last_name: string
    username: string
    photo_url: string


    constructor(u: User) {
        this.id = u.id
        this.first_name = u.first_name
        this.last_name = u.last_name
        this.username = u.username
        this.photo_url = u.photo_url
    }
}