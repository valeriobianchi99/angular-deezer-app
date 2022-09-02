import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})

/*** SnackBar Servce, to call the Mat Snackbar Component ***/
export class SnackbarService {

  //Snackbar properties
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar) { }

  // Open Snackbar with declared configs
  openSnackbar(message: string, action: string):void{
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
/*** End of SnackBar Service ***/