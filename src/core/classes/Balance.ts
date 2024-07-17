/**
 * структура описывает остаток товара на складах
 */
export class Balance{
    Quantity: string
    TradeArea_Id: string
    TradeArea_Name: string

    constructor(b: Partial<Balance> = {}) {
        this.Quantity = b.Quantity !== undefined ? b.Quantity : ''
        this.TradeArea_Id = b.TradeArea_Id !== undefined ? b.TradeArea_Id : ''
        this.TradeArea_Name = b.TradeArea_Name !== undefined ? b.TradeArea_Name : ''
    }
}