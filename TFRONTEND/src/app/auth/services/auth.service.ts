import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, filter } from 'rxjs';
import { CurrentUserInterface } from '../types/currentUser.interface';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from '../types/registerrequest.interface';
import { LoginRequestInterface } from '../types/loginRegister.interface';

@Injectable()
export class AuthService {
    currentUser$ = new BehaviorSubject<CurrentUserInterface | null>(null);

    isLogged$ = this.currentUser$.pipe(filter((currentUser) => currentUser !== undefined),
        map(Boolean)
    );


    constructor(private http: HttpClient) {}

    getCurrentUser(): Observable<CurrentUserInterface>{
        const url = 'http://localhost:4001/api/users';
        return this.http.get<CurrentUserInterface>(url);
    }

    setCurrentUser(currentUser: CurrentUserInterface | null): void {
        this.currentUser$.next(currentUser);
    }

    register(registerRequet: RegisterRequestInterface): Observable<CurrentUserInterface> {
        const url = 'http://localhost:4001/api/users';
        return this.http.post<CurrentUserInterface>(url, registerRequet);

    }
    login(loginRequest: LoginRequestInterface): Observable<CurrentUserInterface> {
        const url = 'http://localhost:4001/api/users/login';
        return this.http.post<CurrentUserInterface>(url, loginRequest);

    }

    setToken(currentUser: CurrentUserInterface | null): void {
        if (currentUser) {
            localStorage.setItem('token', currentUser.token);
        } else {
            localStorage.removeItem('token');
        }
    }
 }