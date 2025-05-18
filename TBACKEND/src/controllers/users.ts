import {NextFunction, Request, Response} from "express";
import userModel from "../models/user";
import { UserDocument } from "../types/user.interface";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";
import { secret } from "../config"; // Adjust the path to your configuration file

const normalizeUser = (user: UserDocument) => {
    const token = jwt.sign({id: user._id,  email: user.email}, secret)
    return {
        id: user._id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        token: token,
    };
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const newUser = new userModel({
            username: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        const savedUser = await newUser.save();
        res.send(normalizeUser(savedUser));
        console.log("User created", savedUser);
    }catch (err) {
        next(err);
    }

};