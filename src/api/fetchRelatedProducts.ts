import axios from "axios";
import {ProductDetails} from "../core/classes/ProductDetails";


export async function fetchRelatedProducts(p: ProductDetails){
    const res = await axios.post(`https://moscow.fargospc.ru/app/tg/getRelated.php?code=${p.ProductArticleForChatBot}`)
    if(res.status > 199 && res.status < 300 ){
        return res.data
    }
}