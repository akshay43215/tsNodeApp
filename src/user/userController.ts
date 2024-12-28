import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import  userModel  from "./userModel";
import bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";
import { config } from "../../config/config";

export const createUser = async(req:Request, res:Response, next:NextFunction)=> {
    const {name, email, password} = req.body;

    //validation
    if (!name || !email || !password) {
        const error = createHttpError(400, 'Please provide all required fields');
        return next(error);
    }  
    
    //db-call
    const user = await userModel.findOne({email});
    if (user) { 
        const error = createHttpError(400, 'User already exists');
        return next(error);        
    }
    //password hashing
    const hashPassword = bcrypt.hashSync(password, 10);
    //process
    const newUser = await userModel.create({
        name,
        email,
        password: hashPassword
    });
    //token generation
    const token = sign({sub: newUser._id}, config.jwtSecret as string, {expiresIn: '1h'});
    //response
    res.status(200).send({message:'success user created..!', accessToken: token})
};