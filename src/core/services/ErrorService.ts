export class ErrorService{
    static handleError(e:  Error){
        return async () => {
            console.log(e)
        }
    }
}