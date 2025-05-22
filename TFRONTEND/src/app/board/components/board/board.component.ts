import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { BoardsService } from "src/app/shared/services/boards.service";
import { BoardService } from "../../services/board.service";
import { filter, Observable } from "rxjs";
import { BoardInterface } from "src/app/shared/types/boards.interface";
import { SocketService } from "src/app/shared/services/socket.service";
import { SocketEventsEnum } from "src/app/shared/types/socketEvents.enum";
// Update the import path below if the actual location is different
// Update the import path below if the actual location is different


@Component({
  selector: 'board',
  templateUrl: './board.component.html',
})

export class BoardComponent implements OnInit {
    boardId: string | undefined ;
    board$: Observable<BoardInterface> | null | undefined;

    constructor(private boardsService: BoardsService, private route: ActivatedRoute, private boardService: BoardService, 
        private socketService: SocketService, private router: Router
    ) {
        const boardId = this.route.snapshot.paramMap.get('boardId');
        if(!boardId) {
            throw new Error('Board ID is required');
        }
        this.boardId = boardId;
        this.board$ = this.boardService.board$.pipe(filter(Boolean));
    }
    ngOnInit(): void {
        this.socketService.emit(SocketEventsEnum.boardsJoin, {boardId: this.boardId});
        this.fetchData();
        this.initializeListeners();
    }

    initializeListeners(): void{
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                console.log('Navigation started:', event);
                this.boardService.leaveBoard(this.boardId);
            }
        })

    }

    fetchData(): void {
        this.boardsService.getBoard(this.boardId!).subscribe((board)=>{
            console.log('Board data:', board);
            this.boardService.setBoard(board);
        });
    }

}