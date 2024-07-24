import {TgUser} from "../../../core/classes/TgUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppUser} from "../../../core/classes/AppUser";

interface UserSliceState{
    tg_user?: TgUser
    app_user?: AppUser
}

const initialState: UserSliceState = {

}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser(state, action: PayloadAction<AppUser>){
            state.app_user = action.payload
        },
        setTgUser(state, action: PayloadAction<TgUser>){
            state.tg_user = action.payload
        }
    }
})


export const {setUser, setTgUser} = userSlice.actions
export const userReducer = userSlice.reducer