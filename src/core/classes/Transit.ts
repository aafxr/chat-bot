export class Transit{
    Storehouse: string
    Transit_Strings: {
        Quantity: string
        TradeArea_Id: string
        TradeArea_Name: string
    }



    constructor(t:Partial<Transit> = {}) {
        this.Storehouse = t.Storehouse !== undefined ? t.Storehouse : ''
        this.Transit_Strings = t.Transit_Strings !== undefined ? t.Transit_Strings : {
            Quantity: '',
            TradeArea_Name: '',
            TradeArea_Id: ''
        }
    }


}