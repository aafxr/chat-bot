/**
 * структура описывает остаток товара на складе
 */
export class Balance{
    /** количество товара */
    Quantity: string
    /** ид склада */
    TradeArea_Id: string
    /** название (город) склада */
    TradeArea_Name: string

    constructor(b: Partial<Balance> = {}) {
        this.Quantity = b.Quantity !== undefined ? b.Quantity : ''
        this.TradeArea_Id = b.TradeArea_Id !== undefined ? b.TradeArea_Id : ''
        this.TradeArea_Name = b.TradeArea_Name !== undefined ? b.TradeArea_Name : ''
    }
}