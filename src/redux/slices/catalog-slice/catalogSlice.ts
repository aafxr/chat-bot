import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Catalog} from "../../../core/classes/Catalog";
import {FavoriteType} from "../../../types/FavoriteType";

interface CatalogState {
    catalog?: Catalog
    favorite: FavoriteType
}

const initialState: CatalogState = {
    favorite: {}
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
        },
        setFavorite(state, action: PayloadAction<FavoriteType>){
            state.favorite = action.payload
        }
    },
})

export const { setCatalog, setCatalogFilter, setFavorite } = catalogSlice.actions

export const catalogReducer = catalogSlice.reducer