import { BehaviorSubject } from "rxjs";
import { BoardInterface } from "src/app/shared/types/boards.interface";
import { Injectable } from "@angular/core";
import { SocketService } from "src/app/shared/services/socket.service";
import { SocketEventsEnum } from "src/app/shared/types/socketEvents.enum";
import { ColumnInterface } from "src/app/shared/types/column.interface";

@Injectable()


export class BoardService {

    constructor(private socketServcie: SocketService){}


    board$ = new BehaviorSubject<BoardInterface | null>(null)
    columns$ = new BehaviorSubject<ColumnInterface[]>([])


    setBoard(board: BoardInterface | null): void {
        this.board$.next(board);
    }

    leaveBoard(boardId: string | undefined): void{
        this.board$.next(null);
        this.socketServcie.emit(SocketEventsEnum.boardsLeave, {boardId});
    }

    setColumns(columns: ColumnInterface[]): void {
        this.columns$.next(columns);
        
    }
}