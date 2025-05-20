import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CurrentUserInterface } from '../types/currentUser.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    currentUser$ = new BehaviorSubject<CurrentUserInterface | null>(null);


    constructor(private http: HttpClient) {}

    getCurrentUser(): Observable<CurrentUserInterface>{
        const url = 'http://localhost:4001/api/users';
        return this.http.get<CurrentUserInterface>(url);
    }

    setCurrentUser(currentUser: CurrentUserInterface | null): void {
        this.currentUser$.next(currentUser);
    }

 }