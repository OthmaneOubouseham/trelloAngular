import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardInterface } from '../types/boards.interface';

@Injectable()
export class BoardsService {
  constructor(private http: HttpClient) {}

  getBoards(): Observable<BoardInterface[]> {
    const url = 'http://localhost:4001/api/boards';
    return this.http.get<BoardInterface[]>(url);
  }
}
