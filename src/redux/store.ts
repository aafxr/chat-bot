import { configureStore } from '@reduxjs/toolkit'
import {catalogReducer} from "./slices/catalog-slice";
import {orderReducer} from "./slices/order-slice";
import {userReducer} from "./slices/user-slice";
import {basketReducer} from "./slices/basket-slice/basketSlice";

export const store = configureStore({
    reducer: {
        catalog: catalogReducer,
        order: orderReducer,
        user: userReducer,
        basket: basketReducer
    },
    // @ts-ignore
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch