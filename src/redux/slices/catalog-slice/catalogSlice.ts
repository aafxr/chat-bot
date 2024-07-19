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
        setCatalogFilter(state, action: PayloadAction<string>){
            if(state.catalog) {
                state.catalog.setFilter(action.payload)
                state.catalog = new Catalog(state.catalog)
            }
        }
    },
})

export const { setCatalog, setCatalogFilter } = catalogSlice.actions

export const catalogReducer = catalogSlice.reducer