import {sendCreateNewCompany} from "../../api/sendCreateNewCompany";
import {fetchUserCompanies} from "../../api/fetchUserCompanies";
import {sendUpdateCompany} from "../../api/sendUpdateCompany";
import {fetchUserData} from "../../api/fetchUserData";
import {AppUser} from "../classes/AppUser";
import {Company} from "../classes/Company";
import {TgService} from "./TgService";
import {sendRemoveUserCompany} from "../../api/sendRemoveUserCompany";
import {store} from "../../redux/store";
import {setUserCompanies} from "../../redux/slices/user-slice";

export class UserService {
    static async getAppUser() {
        const res = await fetchUserData(TgService.getInitData())
        if (res) return new AppUser(res)
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