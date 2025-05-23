import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ColumnInterface } from "../types/column.interface";
import { ColumnInputInterface } from "../types/columnInput.interface";
import { SocketService } from "./socket.service";
import { SocketEventsEnum } from "../types/socketEvents.enum";

@Injectable()

export class ColumnsService {
    columns$: any;
    constructor(private http: HttpClient, private socketService: SocketService) {}

    getColumns(boardId: string): Observable<ColumnInterface[]> {
        const url = `http://localhost:4001/api/boards/${boardId}/columns`;
        return this.http.get<ColumnInterface[]>(url);
    }
    createColumn(columnInput: ColumnInputInterface): void {
    this.socketService.emit(SocketEventsEnum.columnsCreate, columnInput);
  }
  createBoard(boardId: string): Observable<ColumnInterface> {
      const url = `http://localhost:4001/api/boards/${boardId}/columns`;
      return this.http.post<ColumnInterface>(url, { boardId });
    }

}