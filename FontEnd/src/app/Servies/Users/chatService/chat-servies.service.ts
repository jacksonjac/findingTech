import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class UserChatServicesService {
  private socket: Socket;
  private baseUrl: string = "http://localhost:3000";

  constructor(private http: HttpClient) {
    this.socket = io(this.baseUrl);
    const userid = localStorage.getItem("Userid");
    if (userid) {
      this.register(userid);
    }
  }

  register(userid: string): void {
    console.log("user service passsing")
    this.socket.emit('register', userid);
  }

  // Method to get chat history
  getChatHistory(technicianId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/chat/history/${technicianId}`);
  }

  // Method to emit a message to the server
  sendMessage(message: any, callback: (response: any) => void): void {
    this.socket.emit('message', message, callback);
  }

  // Method to listen for new messages from the server
  receiveMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('Newmessage', (message) => {
        console.log("Received message:", message);
        observer.next(message);
      });
    });
  }

  // Method to disconnect the socket
  disconnect(): void {
    this.socket.disconnect();
  }
}
