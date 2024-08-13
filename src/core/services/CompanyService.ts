import {Company} from "../classes/Company";
import {sendCreateNewCompany} from "../../api/sendCreateNewCompany";

export class CompanyService{
    static async createNewCompany(c: Company){
        return await sendCreateNewCompany(c)

    }
}