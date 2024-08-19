import {Basket} from "../../../core/classes/Basket";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


type BasketSliceState = {
    basket: Basket
}


const initialState: BasketSliceState = {
    basket: new Basket()
}

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setBasket(state, action: PayloadAction<Basket>){
            state.basket = action.payload
        }
    }
})


export const {setBasket} = basketSlice.actions
export const basketReducer = basketSlice.reducer