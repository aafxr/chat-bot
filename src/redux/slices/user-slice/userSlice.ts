import {TgUser} from "../../../core/classes/TgUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppUser} from "../../../core/classes/AppUser";
import {Company} from "../../../core/classes/Company";

interface UserSliceState {
    tg_user?: TgUser
    app_user?: AppUser
    userCompanies: Company[]
}

const initialState: UserSliceState = {
    userCompanies: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAppUser(state, action: PayloadAction<AppUser>) {
            state.app_user = action.payload
        },
        setTgUser(state, action: PayloadAction<TgUser>) {
            state.tg_user = action.payload
        },
        setUserCompanies(state, action: PayloadAction<Company[]>){
            state.userCompanies = action.payload
        }
    }
})


export const {setAppUser, setTgUser, setUserCompanies} = userSlice.actions
export const userReducer = userSlice.reducer