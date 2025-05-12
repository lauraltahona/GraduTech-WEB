import { UserModel } from "../models/user-model.js";

export class UserController{
    static async login(req,res){
        console.log(req.body);
        const {correo, contraseña} = req.body;
        
        try{
            const user = await UserModel.login({correo,contraseña});
            res.status(200).json({success: true, data: user});
        } catch(error){
            res.status(401).json({success: false, message: error.message})
        }
    }
}