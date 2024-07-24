import {User} from "../../../core/classes/User";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserSliceState{
    user?: User
}

const initialState: UserSliceState = {

}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser(state, action: PayloadAction<User>){
            state.user = action.payload
        }
    }
})


export const {setUser} = userSlice.actions
export const userReducer = userSlice.reducer