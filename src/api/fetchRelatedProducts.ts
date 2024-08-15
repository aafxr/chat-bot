import axios from "axios";
import {ProductDetails} from "../core/classes/ProductDetails";


type FetchRelatedProductsResponse = {
    request: any,
    success: boolean
    result: ProductDetails[]
}

export async function fetchRelatedProducts(p: ProductDetails){
    const res = await axios.post<FetchRelatedProductsResponse>(`https://refloor-bot.ru/api/getRelated.php?code=${p.ProductArticleForChatBot}`)
    if(res.status > 199 && res.status < 300 ){
        return res.data.result
    }
}