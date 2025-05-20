import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CurrentUserInterface } from "../types/currentUser.interface";

@Injectable()
export class AuthService {
  constructor( private http: HttpClient ) { }

  getCurrentUser(): Observable<CurrentUserInterface | null> {
    const url = "http://localhost:4001/api/user";
    return this.http.get<CurrentUserInterface | null>(url);

  }
}