import { NextFunction, Response } from "express";
import { ExpressRequestInterface } from "../types/expressRequest.interface";
import columnModel from "../models/column";
import { Server, Socket as IOSocket } from "socket.io";
import { SocketEventsEnum } from "../types/socketEvents.enum";
import { getErrorMessage } from "../helpers";

// Étend le type Socket pour inclure 'user'
interface UserSocket extends IOSocket {
  user?: { id: string };
}

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
export const createColumn = async (
  io: Server,
  socket: UserSocket,
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
    const newColumn = new columnModel({
      title: data.title,
      boardId: data.boardId,
      userId: socket.user.id,
    });
    const savedColumn = await newColumn.save();
    io.to(data.boardId).emit(
      SocketEventsEnum.columnsCreateSuccess,
      savedColumn
    );
    console.log("savedColumn", savedColumn);
  } catch (err) {
    socket.emit(SocketEventsEnum.columnsCreateFailure, getErrorMessage(err));
  }
};
