import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { callback } from 'chart.js/dist/helpers/helpers.core';

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
      this.registerForNotifications(userid);
    }
  }

  register(userid: string): void {
    console.log("user service passsing")
    this.socket.emit('register', userid);
  }
  registerForNotifications(userid: string): void {
    console.log("User service passing notification registration");
    this.socket.emit('registerNotification', userid);
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

  receiveNotifications(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('NewLikeNotification', (notification) => {
        console.log("Received notification:", notification);
        observer.next(notification);
      });
    });
  }

  // Method to disconnect the socket
  disconnect(): void {
    this.socket.disconnect();
  }

  sendLikeNotification(notificationData: any, callback: (response: any) => void): void {

    console.log("emited sendlike notification funtion data",notificationData)
    this.socket.emit('likeNotification', notificationData, (response: any) => {
      callback(response);
    });
  }
  
}


