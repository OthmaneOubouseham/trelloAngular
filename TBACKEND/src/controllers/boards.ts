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
};

export const createBoard = async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
    try{
        if(!req.user) {
            res.sendStatus(401);
            return;
        }
        const newBoard = new boardModel({
            title: req.body.title,
            userId: req.user.id
        });
        const savedboard = await newBoard.save();
        

        res.send(savedboard);
    }catch (err) {
        next(err);
    }
};
