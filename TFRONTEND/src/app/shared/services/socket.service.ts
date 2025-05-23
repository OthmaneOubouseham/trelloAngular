import { Injectable, Injector } from "@angular/core";
import { CurrentUserInterface } from "src/app/auth/types/currentUser.interface";
import { io, Socket } from "socket.io-client";
import { AuthService } from "src/app/auth/services/auth.service";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})

export class SocketService {
    socket: Socket | null = null;

    constructor(private injector: Injector) {}

    setupSocketConnection(currentUser: CurrentUserInterface): void {
        const authService = this.injector.get(AuthService);
        this.socket = io('http://localhost:4001', {
            auth:{
                token: currentUser.token,

            }
        })
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }

    }

    emit(eventName: string, message: any): void {
        if (this.socket) {
            this.socket.emit(eventName, message);
        }
    }
    listen<T>(eventName: string): Observable<T> {
    const socket = this.socket;
    if (!socket) {
      throw new Error('Socket connection is not established');
    }

    return new Observable((subscriber) => {
      socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
  on(event: string, callback: (...args: any[]) => void): void {
  if (this.socket) {
    this.socket.on(event, callback);
  }
}

}