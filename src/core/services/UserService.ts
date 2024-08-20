import {fetchUserCompanies} from "../../api/fetchUserCompanies";
import {fetchUserData} from "../../api/fetchUserData";
import {AppUser} from "../classes/AppUser";
import {Company} from "../classes/Company";
import {TgService} from "./TgService";
import {sendCreateNewCompany} from "../../api/sendCreateNewCompany";
import {sendUpdateCompany} from "../../api/sendUpdateCompany";

export class UserService{
    static async getAppUser(){
        const res =  await fetchUserData(TgService.getInitData())
        console.log(res)
        if(res) return new AppUser(res)
    }


    static async getUserCompanies(u: AppUser){
        const res = await fetchUserCompanies(u.id)
        if(res){
            return res.map(r => new Company(r))
        }
    }



    static async newCompany(u: AppUser, c: Company){
        return await sendCreateNewCompany(u, c)
    }


    static async updateCompany(u: AppUser, c: Company){
        return await sendUpdateCompany(u, c)
    }
}