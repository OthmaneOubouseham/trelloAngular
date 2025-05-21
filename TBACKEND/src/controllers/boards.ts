import { Request, Response, NextFunction } from "express";
import boardModel from "../models/board";
import { ExpressRequestInterface } from "../types/expressRequest.interface";

export const getBoards = async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
    try{
        if(!req.user) {
            res.sendStatus(401);
            return;
        }
        const boards = await boardModel.find({userId: req.user.id});
        res.send(boards);
    }catch (err) {
        next(err);
    }
}