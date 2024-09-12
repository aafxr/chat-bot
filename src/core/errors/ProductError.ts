import {CustomError} from "./CustomError";
import {Product} from "../classes/Product";
import {ErrorCode} from "./ErrorCode";

export class ProductError extends CustomError{
    static detailsNotFound(p: Product){
        return new ProductError(`меиаданные товара "${p.title}" не найдены`, ErrorCode.PRODUCT_DETAILS_NOT_FOUND)
    }
}