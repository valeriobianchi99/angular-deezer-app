import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})

/*** Authentication Service ***/
export class AuthenticationService {

  constructor(private router: Router, private snackBarServ: SnackbarService) { }

  // CanActivate method
  canActivate():boolean {
    if (localStorage.getItem('logged')){
      return true;
    }
    else{
      this.snackBarServ.openSnackbar('Sessione scaduta, caricamento...','Chiudi');
      setTimeout(()=>this.router.navigate(['login']), 2700);
      return false;
    }
  }
}
/*** End of Authentication Service ***/