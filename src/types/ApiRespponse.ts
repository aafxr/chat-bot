export type ApiResponse<T, R = any> = {
    request: R,
    result: T
    success: boolean

}