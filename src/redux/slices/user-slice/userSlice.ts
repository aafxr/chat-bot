import {TgUser} from "../../../core/classes/TgUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppUser} from "../../../core/classes/AppUser";
import {Company} from "../../../core/classes/Company";
import {Basket} from "../../../core/classes/Basket";

interface UserSliceState {
    tg_user?: TgUser
    app_user?: AppUser
    userCompanies: Company[]
    orders: Array<any>
    basket: Basket
}

const initialState: UserSliceState = {
    userCompanies: [],
    orders:[],
    basket: new Basket()
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /**
         * just replace app user info by given payload
         * @param state
         * @param action
         */
        setAppUser(state, action: PayloadAction<AppUser>) {
            state.app_user = action.payload
        },
        /**
         * just replace tg user info by given payload
         * @param state
         * @param action
         */
        setTgUser(state, action: PayloadAction<TgUser>) {
            state.tg_user = action.payload
        },
        /**
         * replace companies by given array of companies
         * @param state
         * @param action
         */
        setUserCompanies(state, action: PayloadAction<Company[]>){
            state.userCompanies = action.payload
        },
        /**
         * update existing company or push new
         * @param state
         * @param action
         */
        updateCompany(state, action: PayloadAction<Company>){
            const p = action.payload
            const idx = state.userCompanies.findIndex(e => e.id === p.id)
            if(idx !== -1){
                state.userCompanies[idx] = p
                return
            }
            state.userCompanies.push(p)
        }
    }
})


export const {
    setAppUser,
    setTgUser,
    setUserCompanies,
    updateCompany
} = userSlice.actions
export const userReducer = userSlice.reducer