import {sendRemoveUserCompany} from "../../api/sendRemoveUserCompany";
import {sendCreateNewCompany} from "../../api/sendCreateNewCompany";
import {fetchUserCompanies} from "../../api/fetchUserCompanies";
import {setAppUser, setOrders, setUserCompanies} from "../../redux/slices/user-slice";
import {sendUpdateCompany} from "../../api/sendUpdateCompany";
import {fetchUserData} from "../../api/fetchUserData";
import {AppUser} from "../classes/AppUser";
import {Company} from "../classes/Company";
import {TgService} from "./TgService";
import {store} from "../../redux/store";
import {sendUpdateUser} from "../../api/sendUpdateUser";
import {Order} from "../classes/Order";

export class UserService {
    static async getAppUser() {
        const res = await fetchUserData(TgService.getInitData())
        if (res) {
            if("orders" in res && Array.isArray(res.orders)){
                const orders: Order[] = (res.orders as Order[]).map(o => new Order(o))
                store.dispatch(setOrders(orders))
            }

            if("organizations" in res && Array.isArray(res.organizations)){
                const organizations: Company[] = (res.organizations as Company[]).map(c => new Company(c))
                store.dispatch(setUserCompanies(organizations))
            }
            const user = new AppUser(res)

            store.dispatch(setAppUser(user))
            return user
        }
    }


    static async updateAppUser(user: AppUser){
        const res = await sendUpdateUser(user)
        if(res.ok){
            store.dispatch(setAppUser(new AppUser(res.data)))
        }else{
            return Promise.reject(new Error(res.message))
        }
    }


    static async getUserCompanies(u: AppUser) {
        const res = await fetchUserCompanies(u.id)
        if (res) {
            return res.map(r => new Company(r))
        }
    }


    static async newCompany(u: AppUser, c: Company) {
        return await sendCreateNewCompany(u, c)
    }


    static async updateCompany(u: AppUser, c: Company) {
        return await sendUpdateCompany(u, c)
    }

    /**
     * make request to remove company and update store
     * @param u
     * @param c
     */
    static async removeCompany(u: AppUser, c: Company) {
        return new Promise<boolean>((resolve) => {
            Telegram.WebApp.showConfirm(`Удалить компанию "${c.fullName || c.name || c.id}"`, resolve)
        })
            .then(async (r) =>{
                if (!r) return r

                const res = await sendRemoveUserCompany(u,c)
                if(res && res.ok) {
                    const companies = store.getState().user.userCompanies.filter(el => el.id !== c.id)
                    store.dispatch(setUserCompanies(companies))
                }
                return false
            }
    )
    }
}