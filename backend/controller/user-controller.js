import { UserService } from "../service/user-service.js";
import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from "../config.js";
import cookieParser from "cookie-parser";

export class UserController{
    static async login(req,res){
        const {correo, contraseña} = req.body;
        
        try{
            const user = await UserService.login({correo,contraseña});
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

    static async createUser(req,res){
        const {nombre, correo, contraseña, cedula} = req.body;
        try{
            const user = await UserService.createUser({nombre, correo, contraseña, cedula});
            res.status(201).json({success: true, message: 'User created successfully', user});
        } catch(error){
            if(error.message === 'EMAIL_ALREADY_REGISTERED'){
                res.status(400).json({success: false, message: 'Email already registered'});
            } else {
                res.status(500).json({success: false, message: 'Internal server error'});
            }
        }
    }
}