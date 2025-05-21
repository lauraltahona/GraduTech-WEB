import { UserModel } from "../models/user-model.js";
import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from "../config.js";
import cookieParser from "cookie-parser";
export class UserController{
    static async login(req,res){
        const {correo, contraseña} = req.body;
        console.log(req.body);
        
        
        try{
            const user = await UserModel.login({correo,contraseña});
            const token = jwt.sign({
                id_usuario: user.id_usuario,
                correo: user.correo,
                rol: user.rol
            }, SECRET_JWT_KEY, {
                expiresIn: '1h'
            });
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
            }).status(200).send({user, token});
        } catch(error){
            res.status(401).json({success: false, message: error.message})
        }
    }
}