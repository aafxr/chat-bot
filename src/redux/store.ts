import { configureStore } from '@reduxjs/toolkit'
import {catalogReducer} from "./slices/catalog-slice";
import {userReducer} from "./slices/user-slice";
import {errorSliceReducer} from "./slices/error-slice";

export const store = configureStore({
    reducer: {
        catalog: catalogReducer,
        user: userReducer,
        error: errorSliceReducer
    },
    // @ts-ignore
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch