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

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newUser = new userModel({
            username: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        const savedUser = await newUser.save();
        res.send(normalizeUser(savedUser));
        console.log("User created", savedUser);
    } catch (err) {
        next(err);
    }
};

import bcrypt from "bcrypt"; // Add this import at the top of the file
import { ExpressRequestInterface } from "../types/expressRequest.interface";

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await userModel.findOne({ email: req.body.email }).select('+password');
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        res.send(normalizeUser(user));
    } catch (err) {
        next(err);
    }
};
export const currentUser = async (req: ExpressRequestInterface, res: Response, next: NextFunction): Promise<void> => {
    if(!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
        }
    res.send(normalizeUser(req.user));
};