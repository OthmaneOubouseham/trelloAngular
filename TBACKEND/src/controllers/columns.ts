import { NextFunction, Response } from "express";
import { ExpressRequestInterface } from "../types/expressRequest.interface";
import ColumnModel from "../models/column";
import { Server } from "socket.io";
import { Socket } from "../types/socket.interface";
import { SocketEventsEnum } from "../types/socketEvents.enum";
import { getErrorMessage } from "../helpers";

export const getColumns = async (
  req: ExpressRequestInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const columns = await ColumnModel.find({ boardId: req.params.boardId });
    res.send(columns);
  } catch (err) {
    next(err);
  }
};

export const createColumn = async (
  io: Server,
  socket: Socket,
  data: { boardId: string; title: string }
) => {
  try {
    if (!socket.user) {
      socket.emit(
        SocketEventsEnum.columnsCreateFailure,
        "User is not authorized"
      );
      return;
    }
    const newColumn = new ColumnModel({
      title: data.title,
      boardId: data.boardId,
      userId: socket.user.id,
    });
    const savedColumn = await newColumn.save();
    console.log("savedColumn (before emit):", savedColumn); // log AVANT l'emit
    io.to(data.boardId).emit(
      SocketEventsEnum.columnsCreateSuccess,
      savedColumn
    );
    console.log("savedColumn", savedColumn); // inutile après l'emit
  } catch (err) {
    console.error("Error in createColumn:", err); // log l'erreur côté serveur
    socket.emit(SocketEventsEnum.columnsCreateFailure, getErrorMessage(err));
  }
};
export const createColumns = async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
    try{
        if(!req.user) {
            res.sendStatus(401);
            return;
        }
        const newColumn = new ColumnModel({
            title: req.body.title,
            userId: req.user.id,
            boardId: req.params.boardId
        });
        const savedboard = await newColumn.save();
        

        res.send(savedboard);
    }catch (err) {
        next(err);
    }
};