import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { combineLatest, filter, map, Observable, Subscription } from 'rxjs';
import { BoardsService } from 'src/app/shared/services/boards.service';
import { ColumnsService } from 'src/app/shared/services/columns.service';
import { SocketService } from 'src/app/shared/services/socket.service';
import { BoardInterface } from 'src/app/shared/types/boards.interface'
import { ColumnInterface } from 'src/app/shared/types/column.interface';
import { SocketEventsEnum } from 'src/app/shared/types/socketEvents.enum';
import { BoardService } from '../../services/board.service';
import { ColumnInputInterface } from 'src/app/shared/types/columnInput.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit, OnDestroy {
  boardId: string;
  data$: Observable<{
    board: BoardInterface;
    columns: ColumnInterface[];
  }>;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private boardsService: BoardsService,
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService,
    private socketService: SocketService,
    private columnsService: ColumnsService,
    private http: HttpClient
  ) {
    const boardId = this.route.snapshot.paramMap.get('boardId');

    if (!boardId) {
      throw new Error('Cant get boardID from url');
    }

    this.boardId = boardId;
    this.data$ = combineLatest([
      this.boardService.board$.pipe(filter(Boolean)),
      this.boardService.columns$,
    ]).pipe(
      map(([board, columns]) => ({
        board,
        columns,
      }))
    );
  }

  ngOnInit(): void {
    this.socketService.emit(SocketEventsEnum.boardsJoin, {
      boardId: this.boardId,
    });
    this.fetchData();
    this.initializeListeners();

    // IMPORTANT : écoute l'événement columnsCreateSuccess UNE SEULE FOIS
    this.socketService.on(SocketEventsEnum.columnsCreateSuccess, (column: ColumnInterface) => {
      this.boardService.addColumn(column);
    });
  }

  initializeListeners(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.boardService.leaveBoard(this.boardId);
      }
    });
  }

  fetchData(): void {
    this.boardsService.getBoard(this.boardId).subscribe((board) => {
      this.boardService.setBoard(board);
    });
    this.columnsService.getColumns(this.boardId).subscribe((columns) => {
      this.boardService.setColumns(columns);
    });
  }

  createColumn(title: string, data: any) {
    const boardId = data?.board?._id || data?.board?.id;
    if (!boardId) return;

    const url = `http://localhost:4001/api/boards/${boardId}/columns`;
    const body = { title };

    const sub = this.http.post(url, body).subscribe({
      next: (column: any) => {
        data.columns.push(column);
      },
      error: (err) => {
        console.error('Erreur lors de la création de la colonne', err);
      }
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
