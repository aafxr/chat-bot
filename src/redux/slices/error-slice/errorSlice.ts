import {createSlice, PayloadAction} from "@reduxjs/toolkit";


type ErrorSliceState = {
    message: string
}

const initialState : ErrorSliceState = {
    message: ''
}

const errorSlice = createSlice({
    name: 'errorMessage',
    initialState,
    reducers: {
        setErrorMessage(state, action: PayloadAction<string>){
            state.message = action.payload
        }
    }
})


export const errorSliceReducer = errorSlice.reducer
export const {setErrorMessage} = errorSlice.actions