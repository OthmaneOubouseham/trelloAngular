import { BehaviorSubject } from "rxjs";
import { BoardInterface } from "src/app/shared/types/boards.interface";
import { Injectable } from "@angular/core";
import { SocketService } from "src/app/shared/services/socket.service";
import { SocketEventsEnum } from "src/app/shared/types/socketEvents.enum";

@Injectable()


export class BoardService {

    constructor(private socketServcie: SocketService){}


    board$ = new BehaviorSubject<BoardInterface | null>(null)
    setBoard(board: BoardInterface | null): void {
        this.board$.next(board);
    }

    leaveBoard(boardId: string | undefined): void{
        this.board$.next(null);
        this.socketServcie.emit(SocketEventsEnum.boardsLeave, {boardId});
    }
}