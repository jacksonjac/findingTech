import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TechChatserviceService {

  private socket: Socket;
  baseUrl = "http://localhost:3000/";

  constructor(private http: HttpClient) {
    this.socket = io(this.baseUrl);
  }

  // Emit a message
  sendMessage(message: any, callback: (response: any) => void): void {
    this.socket.emit('message', message, callback);
  }

  // Listen for messages
  receiveMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('Newmessage', (message:any) => {
        console.log("Received message:", message);
        observer.next(message);
      });
    });
  }

  // Fetch chat history
  getChatHistory(technicianId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/chat/history/${technicianId}`);
  }

  // Register the socket connection with technician ID
  register(technicianId: string): void {
    console.log("tech registre pass")
    this.socket.emit('register', technicianId);
  }
}
