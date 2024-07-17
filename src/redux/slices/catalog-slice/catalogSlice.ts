import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Catalog} from "../../../core/classes/Catalog";

interface CatalogState {
    catalog?: Catalog
}

const initialState: CatalogState = {
}

export const catalogSlice = createSlice({
    name: 'catalog',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setCatalog(state, action: PayloadAction<Catalog>){
            state.catalog = action.payload
        },
    },
})

export const { setCatalog } = catalogSlice.actions

export const catalogReducer = catalogSlice.reducer