import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor() { }

  private socket= io('http://localhost:3000');

  joinRoom(data){
    console.log("sending room join request to server");
    this.socket.emit("join",data);
  }

  newUserJoined(){
    let observable= new Observable<{user:string,message:string}>(observer=>{
      this.socket.on('new user joined',(data)=>{
        observer.next(data);
      });
      return ()=>{this.socket.disconnect();}
    })
    return observable;
  }

  leaveRoom(data){
    console.log("sending leave join request to server");
    this.socket.emit("leave",data);
  }

  userLeft(){
    let observable= new Observable<{user:string,message:string}>(observer=>{
      this.socket.on('user left',(data)=>{
        observer.next(data);
      });
      return ()=>{this.socket.disconnect();}
    })
    return observable;
  }

  sendMessage(data){
    console.log("sending message request to server");
    this.socket.emit("message",data);
  }

  newMessage(){
    let observable= new Observable<{user:string,message:string}>(observer=>{
      this.socket.on('new message',(data)=>{
        observer.next(data);
      });
      return ()=>{this.socket.disconnect();}
    })
    return observable;
  }

}
