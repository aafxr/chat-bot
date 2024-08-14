import {CatalogItem} from "../core/classes/CatalogItem";
import axios from "axios";
import {ProductDetails} from "../core/classes/ProductDetails";


type FetchElementDetailResponse = {
    product: ProductDetails,
    request: any,
    success: boolean
}


export async function fetchElementDetail(item: CatalogItem){
    const res = await axios.get<FetchElementDetailResponse>(`https://reflor-bot.ru/api/getDetail.php?code=${item.apiCode}`)
    if(res.status > 199 &&  res.status < 300){
        return res.data.success ? res.data.product : undefined
    }
}