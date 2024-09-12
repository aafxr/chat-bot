import {CatalogItem} from "../core/classes/CatalogItem";
import axios from "axios";
import {ProductDetails} from "../core/classes/ProductDetails";
import {NetworkError} from "../core/errors";


type FetchElementDetailResponse = {
    product: ProductDetails,
    request: any,
    success: boolean
}


export async function fetchElementDetail(item: CatalogItem){
    try {
        const res = await axios.get<FetchElementDetailResponse>(`https://refloor-bot.ru/api/getDetail?code=${item.apiCode}`)
        if(res.status > 199 &&  res.status < 300){
            return res.data.success ? res.data.product : undefined
        }
    } catch (e){
        if (axios.isAxiosError(e)) throw NetworkError.connectionError()
        throw e
    }
}
