import {CustomError} from "./CustomError";
import {ErrorCode} from "./ErrorCode";

/**
 * класс позволяет создавать ошибки соединения
 */
export class NetworkError extends CustomError{

    static connectionError(){
        return new NetworkError ('нет соединения', ErrorCode.CONNECTION_ERROR)
    }
}