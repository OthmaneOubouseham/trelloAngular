import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ColumnInterface } from "../types/column.interface";

@Injectable()

export class ColumnsService {
    columns$: any;
    constructor(private http: HttpClient) {}

    getColumns(boardId: string): Observable<ColumnInterface[]> {
        const url = `http://localhost:4001/api/boards/${boardId}/columns`;
        return this.http.get<ColumnInterface[]>(url);
    }

}