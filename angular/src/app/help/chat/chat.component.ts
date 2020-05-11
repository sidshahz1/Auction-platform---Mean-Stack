import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatServiceService } from 'src/app/shared/chat-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messageText;
  messageArray=[];

  constructor(public chatService: ChatServiceService,public userservice: UserService,public dialogRef: MatDialogRef<ChatComponent>,@Inject(MAT_DIALOG_DATA) public data) {
    this.chatService.newMessage().subscribe(data=>{
      this.messageArray.push(data);
      console.log(data);
    })
   }

  ngOnInit(): void {
    this.join();
    this.data.ticket.info.messages.forEach(messageitem => {
      var newMessage={user:messageitem.sender,message:messageitem.message};
      this.messageArray.push(newMessage);
    });
  }

  onNoClick(): void {
    this.dialogRef.close(0);
  }

  join(){
    console.log("passing join request to service file");
    this.chatService.joinRoom({room:this.data.ticket.info._id});
  };

  sendMessage(){
    console.log("passing message send request to service file");
    this.chatService.sendMessage({
      user:this.data.ticket.user,
      room:this.data.ticket.info._id,
      message:this.messageText
    });
    this.messageText=null;
  };


}
