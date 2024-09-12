import {setErrorMessage} from "../error-slice";
import {Order} from "../../../core/classes/Order";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchOrders} from "../../../api/fetchOrders";


export const loadOrdersThunk = createAsyncThunk<Order[]>('loadOrdersThunk', async (_, thunkAPI) => {
    try {
        const res = await fetchOrders()
        if(!res) {
            thunkAPI.dispatch(setErrorMessage('загрузить заказы не удалось'))
            return []
        }
        if (res.ok){
            return res.data.map(o => new Order(o))
        } else{
            return []
        }
    }catch (e){
        thunkAPI.dispatch(setErrorMessage((e as Error).message))
    }
    return []
})