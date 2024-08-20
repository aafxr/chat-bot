export class Company{
    id: number
    name: string
    fullName: string
    address: string
    country: string
    city: string
    INN: string

    constructor(c: Partial<Company> = {}) {
        this.id         = c.id !== undefined ? c.id : -1
        this.name       = c.name !== undefined ? c.name : ''
        this.fullName   = c.fullName !== undefined ? c.fullName : ''
        this.address    = c.address !== undefined ? c.address : ''
        this.country    = c.country !== undefined ? c.country : ''
        this.city       = c.city !== undefined ? c.city : ''
        this.INN        = c.INN !== undefined ? c.INN : ''
    }


    validate() : string{
        if(this.name === ""){
            return "Необходимо указать имя компании"
        }
        if(this.fullName === ""){
            return "Необходимо указать полное имя компании"
        }
        if(this.address === ""){
            return "Необходимо указать адресс компании"
        }
        if(this.country === ""){
            return "Необходимо указать страну компании"
        }
        if(this.city === ""){
            return "Необходимо указать город компании"
        }
        if(this.INN === ""){
            return "Необходимо указать ИНН компании"
        } else if (/^\d{10}$/.test(this.INN)){
            return "ИНН должен содержать 10 цифр"
        }

        return "ok"
    }
}