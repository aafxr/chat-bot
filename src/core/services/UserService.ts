import {TgUser} from "../classes/TgUser";
import {fetchUserData} from "../../api/fetchUserData";
import {AppUser} from "../classes/AppUser";
import {fetchUserCompanies} from "../../api/fetchUserCompanies";
import {Company} from "../classes/Company";

export class UserService{
    static async getAppUser(u: TgUser){
        const res =  await fetchUserData(u.id)
        if(res){
            res.tgUser = u
            return new AppUser(res)
        }
    }


    static async getUserCompanies(u: AppUser){
        const id = u.tgUser?.id
        if(!id) return
        const res = await fetchUserCompanies(id)
        if(res){
            return res.map(r => new Company(r))
        }
    }
}