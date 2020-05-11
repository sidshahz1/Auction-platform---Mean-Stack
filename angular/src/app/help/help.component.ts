import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../shared/chat-service.service';
import { UserService } from '../shared/user.service';
import { ChatComponent } from './chat/chat.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  user: string;
  room: string;
  messageText: string;
  messageArray:Array<{user:string,message:string}>=[];
  itemArray;
  selectedItemId;
  selectedItemName;
  selectedItemSeller;
  issue;
  ticketList;
  selectedTicketInfo;

  displayedColumns: string[] = ['ticketId', 'productName', 'view'];

  constructor(public chatService: ChatServiceService, public userservice: UserService, public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    this.userservice.getItemList().subscribe(res=>{
      console.log(res);
      this.itemArray=res;
    })
    this.userservice.getTicketList().subscribe(res=>{
      this.ticketList=res;
      console.log(res);
    })
  }

  

  sendTicket(){
    this.itemArray.forEach(item => {
      if(item.id==this.selectedItemId){
        this.selectedItemName=item.name;
        this.selectedItemSeller=item.sellerId;
      }
    });
    var ticket={
      sellerId:this.selectedItemSeller,
      productId:this.selectedItemId,
      productName:this.selectedItemName,
      issue:this.issue
    }
    console.log(this.selectedItemId+" "+this.issue+" "+this.selectedItemName+" "+this.selectedItemSeller);
    this.userservice.generateTicket(ticket).subscribe(res=>{
      console.log(res);
      this.userservice.getTicketList().subscribe(res=>{
        this.ticketList=res;
        console.log(res);
      })
    })
  }

  openChat(ticketId){
    this.userservice.getTicketInfo(ticketId).subscribe(res=>{
      this.selectedTicketInfo=res;
      this.opendialoge();
    })
  }

  opendialoge(){
    const dialogRef = this.dialog.open(ChatComponent, {
      width: '350px',
      height: '400px',
      data: {ticket:this.selectedTicketInfo}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.leave();
      // if(result==0){
      //   this.errormessage="image upload failed";
      //   setTimeout(()=>this.errormessage=false,4000);
      // }
      // else{
      //   this.successmessage="product added successfully";
      //   setTimeout(()=>this.successmessage=false,4000);
      // }
    });
  }


  leave(){
    console.log("passing join request to service file");
    this.chatService.leaveRoom({room:this.selectedTicketInfo.info._id});
  };
  

}
