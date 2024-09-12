import {Basket} from "../classes/Basket";
import {sendOrder} from "../../api/sendOrder";
import {AppUser} from "../classes/AppUser";
import {TgService} from "./TgService";
import {BasketDTO} from "../dto/BasketDTO";
import {Order} from "../classes/Order";
import {store} from "../../redux/store";
import {setBasket, setOrders} from "../../redux/slices/user-slice";
import {ErrorService} from "./ErrorService";
import {Product} from "../classes/Product";
import {ProductError} from "../errors/ProductError";


export class BasketService {
    /**
     * send order to chatbot server and if request success remove basket record from tg cloud
     */
    static async submitBasket(b: Basket, user: AppUser) {
        b.companyID = b.company?.id || 0
        b.userId = user.id
        b.userPhone = user.phone

        const basketDto = new BasketDTO(b)

        const res = await sendOrder(basketDto, user)

        if (res && res.ok) {
            TgService.removeBasket().catch(ErrorService.handleError)
            const o = new Order(res.data)
            const orders: Order[] = store.getState().user.orders
            store.dispatch(setOrders([...orders, o]))
            BasketService.resetBasket()
            return true
        }
        return false
    }

    /**
     * загрузка корзины из облака
     */
    static initBasket() {
        try {
            TgService.getBasket()
                .then(b => store.dispatch(setBasket(b)))
                .catch(ErrorService.handleError)
        } catch (e) {
            ErrorService.handleError(e as Error)
        }
    }

    /**
     * добавить указанное количество товара в орзину
     * @param p продукт
     * @param quantity количество продуккта
     */
    static addProduct(p: Product, quantity: number) {
        try {
            const b = new Basket(store.getState().user.basket)
            if (!p.details) throw ProductError.detailsNotFound(p)
            b.setProduct(p, p.details, quantity)
            store.dispatch(setBasket(b))
            this.saveBasket()
        } catch (e) {
            ErrorService.handleError(e as Error)
        }
    }

    /**
     * удалить продукт из корзины
     * @param p продукт
     */
    static removeProduct(p: Product) {
        try {
            const b = new Basket(store.getState().user.basket)
            b.removeProduct(p)
            store.dispatch(setBasket(b))
            this.saveBasket()
        } catch (e) {
            ErrorService.handleError(e as Error)
        }
    }

    /**
     * сбросить корзину
     */
    static resetBasket() {
        store.dispatch(setBasket(new Basket()))
        this.saveBasket()
    }


    /**
     * сохранить текущуб корзину в облаке
     */
    static saveBasket() {
        try {
            TgService.setBasket(store.getState().user.basket).catch(ErrorService.handleError)
        } catch (e) {
            ErrorService.handleError(e as Error)
        }
    }


}