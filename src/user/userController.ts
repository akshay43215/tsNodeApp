import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import  userModel  from "./userModel";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { User } from "./userTypes";

//create user -----------
export const createUser = async(req:Request, res:Response, next:NextFunction)=> {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        const error = createHttpError(400, 'Please provide all required fields');
        return next(error);
    }  
    
    //db-call
    try{

        const user = await userModel.findOne({email});
        if (user) { 
            const error = createHttpError(400, 'This user already exists');
            return next(error);        
        }
    } catch (error) {
        console.log(error);
        return next(createHttpError(500, "Error while getting user"));
    }

    //hashing
    const hashPassword = bcrypt.hash(password, 10);
    let newUser: User;
    try {
       newUser = await userModel.create({
            name,
            email,
            password: hashPassword
        });
    } catch (error) {
        console.log(error);
        return next(createHttpError(500, "Error while hashing password"));        
    }

    //token generation
    const token = jwt.sign({sub: newUser._id}, config.jwtSecret as string, {expiresIn: '1h',algorithm: 'HS256'});
    //response
    res.status(201).send({message:'success user created..!', accessToken: token})
};

//login user -----------
export const loginUser = async(req:Request, res:Response, next:NextFunction)=> {
    const {email, password} = req.body;

    if (!email || !password) {
        return next(createHttpError(400, "All fields are required"));
    }

    try {
        
        const user = await userModel.findOne({email});
        if (!user) {
            return next(createHttpError(400, "User not found"));
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(createHttpError(400, "Invalid credentials"));
        }

        const token = jwt.sign({sub: user._id}, config.jwtSecret as string, 
            {expiresIn: '1h', algorithm: 'HS256'}
        );
    
        res.status(201).json({message:'success user logIn !', accessToken: token });
    } catch (error) {
        console.log(error);
        return next(createHttpError(500, "Error while logIn user"));            
    }
}