import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css'],
})
export class AlertMessageComponent implements OnInit {

  msg!:string;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data :any,
    public service : NotificationService
  
  ){

  }
  ngOnInit(): void {
    this.msg = this.data.message;
    debugger;
   
  }

}
