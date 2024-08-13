export type BotResponseType<T> = {
    ok: true
    data: T
} | {
    ok: false
    message: string
}
