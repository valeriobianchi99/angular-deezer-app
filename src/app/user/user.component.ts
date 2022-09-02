import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { User } from '../user.model';
import { LoaderService } from '../services/loader.service';

/*** Dialog Component  ***/
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(private dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private router: Router, private snackBarServ: SnackbarService, private loaderServ: LoaderService) {}

  // To close Mat Dialog
  close(): void {
    this.dialogRef.close();
  }

  // To delete an User from the local storage
  deleteUser():void{
    var account = JSON.parse(localStorage.getItem('logged'));
    var newList = JSON.parse(localStorage.getItem('accounts')).filter(el=> el.username !== account.username);
    if(newList.length!=0) localStorage.setItem('accounts', JSON.stringify(newList));
    else localStorage.removeItem('accounts');
    localStorage.removeItem('logged');
    this.dialogRef.close();
    this.loaderServ.show();
    this.snackBarServ.openSnackbar('Utente eliminato, disconnessione...','Chiudi');
    setTimeout(()=>
    {
      this.router.navigate(['../login']);
      this.loaderServ.hide();
    },3000);
  }

}
/*** End of Dialog Component ***/

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

/*** User component, the reserved area of the app ***/
export class UserComponent implements OnInit {

  // Properties and flags
  utente = {};
  formUtente: FormGroup;
  editUser = false;
  confPassword: FormControl;
  type = 'password';
  @Output() signout: EventEmitter<any> = new EventEmitter<any>();

  // Constructor 
  constructor(private builder: FormBuilder, private router: Router, private dialog: MatDialog, private snackBarServ: SnackbarService, private loaderServ: LoaderService) { }

  ngOnInit() {
    // Getting current user from LocalStorage
    this.utente = JSON.parse(localStorage.getItem('logged'));
    // Building the reactive form
    this.formUtente = this.builder.group({
      'firstname':this.utente['firstname'],
      'lastname':this.utente['lastname'],
      'email': new FormControl(this.utente['email'], Validators.email),
      'username': new FormControl({ value: this.utente['username'], disabled: true }),
      'password': this.utente['password']
    });
    this.confPassword = new FormControl('');
  }

  // Set new user
  updateUser():void{
    this.utente = this.formUtente.getRawValue();
    localStorage.setItem('logged', JSON.stringify(this.utente));
    var accounts = JSON.parse(localStorage.getItem('accounts')).filter(el=> el.username !== this.utente['username']);
    localStorage.setItem('accounts', JSON.stringify([this.utente, ...accounts]));
    this.editUser=false;
    this.loaderServ.show();
    setTimeout(
      ()=>
      {
        this.loaderServ.hide();
        this.snackBarServ.openSnackbar('Utente aggiornato.','Chiudi');
      }, 1000);
  }

  // To open the dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // Logout method
  logout():void{
    localStorage.removeItem('logged');
    this.snackBarServ.openSnackbar('Disconnessione...', 'Chiudi');
    setTimeout(()=>this.router.navigate(['../login']), 3000);
    this.signout.emit();
  }

}
/*** End of User Component  ***/