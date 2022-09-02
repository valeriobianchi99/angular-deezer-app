import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

/*** Register Component ***/
export class RegisterComponent implements OnInit {

  // Properties
  user: FormGroup;
  confPassword: FormControl;
  immediateLogin: FormControl;
  type='password';

  // Constructor
  constructor(private builder: FormBuilder, private router: Router, private snackBarServ: SnackbarService) { }

  // Remove logged user info and build the reactive form
  ngOnInit() {
    sessionStorage.clear();
    localStorage.removeItem('logged');
    this.user = this.builder.group(new User());
    this.confPassword = new FormControl('');
    this.immediateLogin = new FormControl(true);
  }

  // Register method
  register(){
    if(localStorage.getItem('accounts')){
      var acc = JSON.parse(localStorage.getItem('accounts'));
      localStorage.setItem('accounts', JSON.stringify([...acc, this.user.value]) )
    }
    else{
      localStorage.setItem('accounts', JSON.stringify([this.user.value]));
    }
    this.snackBarServ.openSnackbar('Utente registrato.','Chiudi');
    console.log(this.immediateLogin);
    
    if(this.immediateLogin.value==true){
      localStorage.setItem('logged', JSON.stringify(this.user.value));
      this.router.navigate(['../home']);
    }
    else{
      this.router.navigate(['']);
    }
  }

  // Controls if the username has already been used
  invalidUsername():boolean{
    if(localStorage.getItem('accounts')){
      return JSON.parse(localStorage.getItem('accounts')).find(el=>el.username===this.user.get('username').value);
    }
    else return false;
  }

}
/*** End of Register Component ***/