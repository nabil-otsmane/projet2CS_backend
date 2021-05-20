import { Request, Response } from "express";
import {Tenant} from "../entity/Tenant";
import {User} from "../entity/User" ;
 
export async function getTenants(_req:Request, res:Response){
    const Tenants =await Tenant.find(); 
    const len=Tenants.length;
    let  user = new Array();
    for (let i = 0; i < len ; i++) {
            console.log(Tenants[0].idUser)
            user[i] = await User.find({
            where : {idUser : Tenants[0].idUser}
        });
      }
  res.json(user)
}