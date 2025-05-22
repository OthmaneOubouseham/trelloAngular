import { Request, Response, NextFunction } from "express";
import boardModel from "../models/board";
import {Server, Socket} from "socket.io";
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

export const getBoard = async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
    try{
        if(!req.user) {
            res.sendStatus(401);
            return;
        }
        const board = await boardModel.findOne({userId: req.user.id, _id: req.params.boardId});
        if(!board) {
            res.sendStatus(404);
            return;
        }
        res.send(board);

    }catch (err) {
        next(err);
    }
};
export const joinBoard = (io: Server, socket: Socket, data: {boardId: string}) => {
    console.log('joinBoard event received:', data.boardId);
    socket.join(data.boardId);
}

export const leaveBoard = (io: Server, socket: Socket, data: {boardId: string}) => {
    console.log('leaveBoard event received:', data.boardId);
    socket.leave(data.boardId);
}
