import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {Order} from "../../../core/classes/Order";
import {OrderItem} from "../../../core/classes/OrderItem";
import {CatalogItem} from "../../../core/classes/CatalogItem";
import {OrderService} from "../../../core/services/OrderService";

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
            state.order = new Order(action.payload)
            OrderService.saveOrder(state.order).catch(console.error)
        },
        addProduct(state, action: PayloadAction<OrderItem>) {
            state.order.add(action.payload)
            state.order = new Order(state.order)
            OrderService.saveOrder(state.order).catch(console.error)
        },
        setProduct(state, action: PayloadAction<OrderItem>) {
            state.order.set(action.payload)
            state.order = new Order(state.order)
            OrderService.saveOrder(state.order).catch(console.error)
        },
        removeProduct(state, action: PayloadAction<CatalogItem>) {
            delete state.order.orders[action.payload.id]
            state.order = new Order(state.order)
            OrderService.removeOrder().catch(console.error)
        },
        resetOrder(state) {
            state.order = new Order()
            OrderService.saveOrder(state.order).catch(console.error)
        }

    },
})

export const {
    setOrder,
    setProduct,
    addProduct,
    removeProduct,
} = orderSlice.actions

export const orderReducer = orderSlice.reducer