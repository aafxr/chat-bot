import {ProductDetails} from "../../../core/classes/ProductDetails";
import {Product} from "../../../core/classes/Product";
import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TgService} from "../../../core/services/TgService";
import {AppUser} from "../../../core/classes/AppUser";
import {Company} from "../../../core/classes/Company";
import {TgUser} from "../../../core/classes/TgUser";
import {Basket, BasketDetail} from "../../../core/classes/Basket";
import {Order} from "../../../core/classes/Order";
import {ErrorService} from "../../../core/services/ErrorService";
import {loadOrdersThunk} from "./loadOrdersThunk";

interface UserSliceState {
    tg_user?: TgUser
    app_user?: AppUser
    userCompanies: Company[]
    basket: Basket

    orders: Array<Order>
    ordersLoading: boolean
}

const initialState: UserSliceState = {
    userCompanies: [],
    orders: [],
    basket: new Basket(),
    ordersLoading: false
}


export type BasketProductDetails = {
    product: Product
    details: ProductDetails
    quantity: number
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
        setUserCompanies(state, action: PayloadAction<Company[]>) {
            state.userCompanies = action.payload
        },
        /**
         * update existing company or push new
         * @param state
         * @param action
         */
        updateCompany(state, action: PayloadAction<Company>) {
            const p = action.payload
            const idx = state.userCompanies.findIndex(e => e.id === p.id)
            if (idx !== -1) {
                state.userCompanies[idx] = p
                return
            }
            state.userCompanies.push(p)
        },
        setBasket(state, action: PayloadAction<Basket>) {
            state.basket = action.payload
        },
        /**
         * add product if not exist and rewrite product quantity to payload
         * @param state
         * @param action
         */
        setBasketProductQuantity(state, action: PayloadAction<BasketProductDetails | BasketDetail>) {
            if (action.payload instanceof BasketDetail) {
                state.basket.setBasketDetail(action.payload)
                state.basket = new Basket(state.basket)
                TgService.setBasket(state.basket).catch(ErrorService.handleError)
                return
            }
            const {product, quantity, details} = action.payload
            state.basket.setProduct(product, details, quantity)
            state.basket = new Basket(state.basket)
            TgService.setBasket(state.basket).catch(ErrorService.handleError)
        },
        /**
         * remove product from basket
         * @param state
         * @param action
         */
        removeBasketProduct(state, action: PayloadAction<Product>) {
            state.basket.removeProduct(action.payload)
            state.basket = new Basket(state.basket)
            TgService.setBasket(state.basket).catch(ErrorService.handleError)
        },
        /**
         * rewrite user orders list
         * @param state
         * @param action
         */
        setOrders(state, action: PayloadAction<Order[]>) {
            state.orders = action.payload
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<UserSliceState>) => {
        builder
            .addCase(loadOrdersThunk.pending, (state) => {
            state.ordersLoading = true
        })
            .addCase(loadOrdersThunk.fulfilled, (state, action) => {
                state.orders = action.payload
                state.ordersLoading = false
            })
            .addCase(loadOrdersThunk.rejected, (state) => {
                state.ordersLoading = false
            })
    }
})


export const {
    setAppUser,
    setTgUser,
    setUserCompanies,
    updateCompany,
    setBasketProductQuantity,
    removeBasketProduct,
    setBasket,
    setOrders
} = userSlice.actions
export const userReducer = userSlice.reducer