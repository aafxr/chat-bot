/**
 * описывает поступление товара на склад
 */
export class Transit{
    /** название (город) склада */
    Storehouse: string
    /** поступающще количество товара на склад */
    Transit_Strings: {
        /** количество товара */
        Quantity: string
        /** ид склада */
        TradeArea_Id: string
        /** название (город) склада */
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