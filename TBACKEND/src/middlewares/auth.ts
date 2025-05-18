import { Request, Response, NextFunction } from 'express';
import { ExpressRequestInterface } from "../types/expressRequest.interface";
import jwt from "jsonwebtoken";
import { secret } from "../config"; // Adjust the path to your configuration file
import { UserDocument } from "../types/user.interface";
import userModel from "../models/user";

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.sendStatus(401);
            return;
        }

        const token = authHeader.split(' ')[1];
        const data = jwt.verify(token, secret) as { id: string; email: string };
        const userId = data.id;

        const user = await userModel.findById(userId);
        if (!user) {
            res.sendStatus(401);
            return;
        }

        (req as ExpressRequestInterface).user = user;
        next();
    } catch (err) {
        res.sendStatus(401);
    }
};

export default authMiddleware;