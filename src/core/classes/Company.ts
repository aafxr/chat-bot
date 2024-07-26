export class Company{
    Name: string
    NameFull: string
    INN: string
    Parent: string
    Email: string[]
    UID: string

    constructor(c: Partial<Company> = {}) {
        this.Name = c.Name !== undefined ? c.Name : ''
        this.NameFull = c.NameFull !== undefined ? c.NameFull : ''
        this.INN = c.INN !== undefined ? c.INN : ''
        this.Parent = c.Parent !== undefined ? c.Parent : ''
        this.Email = c.Email !== undefined ? c.Email : []
        this.UID = c.UID !== undefined ? c.UID : ''
    }
}