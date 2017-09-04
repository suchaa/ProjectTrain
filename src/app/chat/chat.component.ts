import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service'; 

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {

  message;
  messageData=[];
  constructor(private chatService: ChatService) { }

 ngOnInit() {
    this.chatService.getMessages().subscribe((message)=>{
      this.messageData.push(message);
    });
  }

  sendMessage(){
    this.chatService.sendMessage(this.message);
  }

}
