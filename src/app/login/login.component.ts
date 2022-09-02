import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/*** Login Component, the bootstrap of the app ***/
export class LoginComponent implements OnInit {

  // Properties
  user: FormGroup;

  
  // Constructor
  constructor(private builder: FormBuilder, private router: Router, private snackBarServ: SnackbarService) {
    this.user = this.builder.group({
      'username':'',
      'password':''
    });
   }

  // Cleaning localStorage and sessionStorage
  ngOnInit() {
    sessionStorage.clear();
    localStorage.removeItem('logged');
  }

 

  // Login method
  login(){
    if(localStorage.getItem('accounts')){
      var accounts = JSON.parse(localStorage.getItem('accounts'));
      if(accounts.find(el=>el.username===this.user.get('username').value && el.password===this.user.get('password').value)){
        this.router.navigate(['home']);
        localStorage.setItem('logged', JSON.stringify(accounts.find(el=>el.username===this.user.get('username').value && el.password===this.user.get('password').value)));
        this.snackBarServ.openSnackbar('Accesso effettutato come '+this.user.get('username').value, 'Chiudi');
      }
      else {
        this.snackBarServ.openSnackbar('Username o password errati!', 'Chiudi');
      }
    }
    else{
      this.snackBarServ.openSnackbar('Username o password errati!', 'Chiudi');
    }
  }

}
/*** End of Login Component  ***/