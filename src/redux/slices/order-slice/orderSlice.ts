import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {Order} from "../../../core/classes/Order";
import {OrderItem} from "../../../core/classes/OrderItem";
import {CatalogItem} from "../../../core/classes/CatalogItem";

interface OrderState {
    order: Order
    orderShow: boolean
}

const initialState: OrderState = {
    order: new Order(),
    orderShow: false
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder(state, action: PayloadAction<Order>) {
            state.order = action.payload
            state.order = new Order(state.order)
        },
        addProduct(state, action: PayloadAction<OrderItem>) {
            state.order.add(action.payload)
            state.order = new Order(state.order)
        },
        setProduct(state, action: PayloadAction<OrderItem>) {
            state.order.set(action.payload)
            state.order = new Order(state.order)
        },
        removeProduct(state, action: PayloadAction<CatalogItem>) {
            delete state.order.orders[action.payload.id]
            state.order = new Order(state.order)
        },
        showOrder(state) {
            state.orderShow = true
        },
        hideOrder(state) {
            state.orderShow = false
        }

    },
})

export const {
    setOrder,
    setProduct,
    addProduct,
    removeProduct,
    showOrder,
    hideOrder
} = orderSlice.actions

export const orderReducer = orderSlice.reducer