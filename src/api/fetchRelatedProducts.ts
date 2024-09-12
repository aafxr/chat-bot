import axios from "axios";
import {ProductDetails} from "../core/classes/ProductDetails";
import {NetworkError} from "../core/errors";


type FetchRelatedProductsResponse = {
    request: any,
    success: boolean
    result: ProductDetails[]
}

export async function fetchRelatedProducts(p: ProductDetails){
    try {
        const res = await axios.post<FetchRelatedProductsResponse>(`https://refloor-bot.ru/api/getRelated.php?code=${p.ProductArticleForChatBot}`)
        if(res.status > 199 && res.status < 300 ){
            return res.data.result
        }
    } catch (e){
        if (axios.isAxiosError(e)) throw NetworkError.connectionError()
        throw e
    }
}