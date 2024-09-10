export type StoreHouseType = {
    id: string
    storehouse: string
}

const storehouses: StoreHouseType[] = [
    {
        id: "65bb02e7-e5a3-11e9-a1cf-902b3434e458",
        storehouse: "Иркутск"
    },
    {
        id: "09c1272d-d8f5-11ed-b2c2-000c29db8c61",
        storehouse: "Казань"
    },
    {
        id: "6ec71f71-e5a3-11e9-a1cf-902b3434e458",
        storehouse: "Красноярск"
    },
    {
        id: "e3b35c38-65f0-11eb-bfb1-902b3434e458",
        storehouse: "Москва Север"
    },
    {
        id: "7925636e-e5a3-11e9-a1cf-902b3434e458",
        storehouse: "Москва Юг"
    },
    {
        id: "90edd745-e5a3-11e9-a1cf-902b3434e458",
        storehouse: "Новосибирск Основной"
    },
    {
        id: "b3efb00e-e5a3-11e9-a1cf-902b3434e458",
        storehouse: "Самара"
    },
    {
        id: "9919f0c7-e5a3-11e9-a1cf-902b3434e458",
        storehouse: "Санкт-Петербург"
    },
    {
        id: "55f8722c-c937-11ed-b2bc-000c29db8c61",
        storehouse: "Тюмень"
    },
    {
        id: "d2b7a144-cd4f-11ed-b2c1-000c29db8c61",
        storehouse: "Уфа"
    },
    {
        id: "a857fd19-e5a3-11e9-a1cf-902b3434e458",
        storehouse: "Челябинск"
    }]


export class StorehouseService {
    static getStoreHousesList(){
        return storehouses
    }
}