import { BehaviorSubject } from "rxjs";
import { BoardInterface } from "src/app/shared/types/boards.interface";
import { Injectable } from "@angular/core";

@Injectable()


export class BoardService {
    board$ = new BehaviorSubject<BoardInterface | null>(null)
    setBoard(board: BoardInterface | null): void {
        this.board$.next(board);
    }
}