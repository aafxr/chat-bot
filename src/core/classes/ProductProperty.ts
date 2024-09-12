export class ProductProperty{
    id: string
    code: string
    name: string
    value: string


    constructor(prop: Partial<ProductProperty> = {}) {
        this.id = prop.id !== undefined ? prop.id : ''
        this.code = prop.code !== undefined ? prop.code : ''
        this.name = prop.name !== undefined ? prop.name : ''
        this.value = prop.value !== undefined ? prop.value : ''
    }
}