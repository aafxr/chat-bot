/**
 * структура описывает стоимость товара за единицу (Value)
 */
export class Price{
    Name: string
    UnitOfMeasure: string
    Value: string

    constructor(p: Partial<Price> = {}) {
        this.Name = p.Name !== undefined ? p.Name : ''
        this.UnitOfMeasure = p.UnitOfMeasure !== undefined ? p.UnitOfMeasure : ''
        this.Value = p.Value !== undefined ? p.Value : ''

    }

}