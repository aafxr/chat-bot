import { configureStore } from '@reduxjs/toolkit'
import {catalogReducer} from "./slices/catalog-slice";
import {orderReducer} from "./slices/order-slice";
import {userReducer} from "./slices/user-slice";

export const store = configureStore({
    reducer: {
        catalog: catalogReducer,
        order: orderReducer,
        user: userReducer,
    },
    // @ts-ignore
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch