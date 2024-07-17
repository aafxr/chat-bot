import {Balance} from "./Balance";
import {Price} from "./Price";
import {Transit} from "./Transit";
import {CatalogItem} from "./CatalogItem";

export class ProductDetails{
    id: CatalogItem['id']
    Balance_Strings: Balance[]
    LinkToSite: string
    PackUnitMeasure: string
    PackUnitQuantity: string
    ProductArticle: string
    ProductArticleForChatBot: string
    ProductId: string
    ProductName: string

    Price_MRC: Price
    Price_RRC: Price

    Transit:Transit
    TransitAmount: string
    UnitOfMeasure: string

    constructor(p: Partial<ProductDetails> = {}) {
        this.id = p.id !== undefined ? p.id : ''
        this.Balance_Strings = p.Balance_Strings !== undefined
            ? p.Balance_Strings.map(b => new Balance(b))
            : []
        this.LinkToSite = p.LinkToSite !== undefined ? p.LinkToSite : ''
        this.PackUnitMeasure = p.PackUnitMeasure !== undefined ? p.PackUnitMeasure : ''
        this.PackUnitQuantity = p.PackUnitQuantity !== undefined ? p.PackUnitQuantity : ''
        this.ProductArticle = p.ProductArticle !== undefined ? p.ProductArticle : ''
        this.ProductArticleForChatBot = p.ProductArticleForChatBot !== undefined ? p.ProductArticleForChatBot : ''
        this.ProductId = p.ProductId !== undefined ? p.ProductId : ''
        this.ProductName = p.ProductName !== undefined ? p.ProductName : ''
        this.Price_MRC = p.Price_MRC !== undefined ? new Price(p.Price_MRC) : new Price()
        this.Price_RRC = p.Price_RRC !== undefined ? new Price(p.Price_RRC) : new Price()
        this.Transit = p.Transit !== undefined ? new Transit(p.Transit) : new Transit()
        this.TransitAmount = p.TransitAmount !== undefined ? p.TransitAmount : ''
        this.UnitOfMeasure = p.UnitOfMeasure !== undefined ? p.UnitOfMeasure : ''
    }
}