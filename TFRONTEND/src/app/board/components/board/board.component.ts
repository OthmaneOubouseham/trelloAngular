import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BoardsService } from "src/app/shared/services/boards.service";
import { BoardService } from "../../services/board.service";
import { filter, Observable } from "rxjs";
import { BoardInterface } from "src/app/shared/types/boards.interface";
// Update the import path below if the actual location is different
// Update the import path below if the actual location is different


@Component({
  selector: 'board',
  templateUrl: './board.component.html',
})

export class BoardComponent implements OnInit {
    boardId: string | undefined ;
    board$: Observable<BoardInterface> | null | undefined;

    constructor(private boardsService: BoardsService, private route: ActivatedRoute, private boardService: BoardService) {
        const boardId = this.route.snapshot.paramMap.get('boardId');
        if(!boardId) {
            throw new Error('Board ID is required');
        }
        this.boardId = boardId;
        this.board$ = this.boardService.board$.pipe(filter(Boolean));
    }
    ngOnInit(): void {
        this.fetchData();
    }
    fetchData(): void {
        this.boardsService.getBoard(this.boardId!).subscribe((board)=>{
            console.log('Board data:', board);
            this.boardService.setBoard(board);
        });
    }

}