import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardInterface } from '../types/boards.interface';

@Injectable()
export class BoardsService {
  board$: Observable<BoardInterface> | null | undefined;
  constructor(private http: HttpClient) {}

  getBoards(): Observable<BoardInterface[]> {
    const url = 'http://localhost:4001/api/boards';
    return this.http.get<BoardInterface[]>(url);
  }

  createBoard(title: string): Observable<BoardInterface> {
    const url = 'http://localhost:4001/api/boards';
    return this.http.post<BoardInterface>(url, { title });
  } 

  getBoard(boardId: string): Observable<BoardInterface> {
    const url ="http://localhost:4001/api/boards/" + boardId;
    return this.http.get<BoardInterface>(url);
  }

}
