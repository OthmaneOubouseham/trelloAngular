import { NextFunction, Response } from "express";
import { ExpressRequestInterface } from "../types/expressRequest.interface";
import columnModel from "../models/column";

export const getColumns = async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
    try{
        if(!req.user) {
            res.sendStatus(401);
            return;
        }
        const columns = await columnModel.find({userId: req.user.id});
        res.send(columns);
    }catch (err) {
        next(err);
    }
};