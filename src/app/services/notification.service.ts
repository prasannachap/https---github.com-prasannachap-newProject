import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { AlertMessageComponent } from "../components/alert-message/alert-message.component";


@Injectable({
    providedIn: 'root'
})

export class NotificationService {
    constructor(public snackBar: MatSnackBar){

    }

    config: MatSnackBarConfig = {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
    };

    success(msg: string){
        this.config['panelClass'] = ['green'];
        this.snackBar.open(msg, '', this.config);
    }

    warn(msg: string){
        this.config['panelClass'] = ['red'];
        this.snackBar.open(msg, '', this.config);
    }

    showNotification (displayMessage: any){
        this.snackBar.openFromComponent(AlertMessageComponent,{
            data: {
                message: displayMessage
            },
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            
        });
        
    }

}