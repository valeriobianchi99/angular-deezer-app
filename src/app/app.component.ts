import { Component, OnInit } from '@angular/core';
import { DeezerService } from './services/deezer.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarService } from './services/snackbar.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/*** App Component, principal component of the app ***/
export class AppComponent implements OnInit {
  
  // Properties and flags
  savedSongs: any[] = [];
  subscription: Subscription;
  loggedUser: any = {};
  loading:boolean = false;
  timeoutHandle: any;

  // Constructor
  constructor(private deezer: DeezerService, private router: Router, private snackBar: SnackbarService, private loaderServ: LoaderService){}

  ngOnInit(){
    this.loaderServ.show();
    setTimeout(()=>this.loaderServ.hide(), 1800);
    this.loggedUser = JSON.parse(localStorage.getItem('logged'));
    // Getting saved songs
    if(JSON.parse(localStorage.getItem('accounts')).find(el=>el.username===this.loggedUser.username).data.songs){
        this.savedSongs = JSON.parse(localStorage.getItem('accounts')).find(el=>el.username===this.loggedUser.username).data.songs;
        if(!this.savedSongs) this.savedSongs = [];
    }
    this.timeoutHandle = setTimeout(
      ()=>{localStorage.removeItem('logged')}, 180000
    );
  }

  // If the users click on the screen, he's still logged for 180 seconds. If doesn't click in that time, the session finishes
  stillLogged():void{
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = window.setTimeout(
      ()=>{localStorage.removeItem('logged')}, 180000
    );
  }

  // Show the spinner and set time out to close it
  showSpinner():void{
    this.loaderServ.show();
    setTimeout(()=>this.loaderServ.hide(), 2700);
  }

  // Save a song
  addSavedSong(id: number){
    this.subscription = this.deezer.getTrack(id).subscribe(
      res=>{
        console.log(res);
        this.savedSongs.push(res);
        var accounts = JSON.parse(localStorage.getItem('accounts')).filter(el=>el.username!==this.loggedUser.username);
        var accountToSave = JSON.parse(localStorage.getItem('accounts')).find(el=>el.username===this.loggedUser.username);
        accountToSave.data.songs.push(res);
        localStorage.setItem('accounts', JSON.stringify([accountToSave, ...accounts]));
        this.snackBar.openSnackbar('Brano aggiunto alla libreria', 'Chiudi');
      }
    );
  }

  // Delete a song
  deleteSong(id:number){
    var accounts = JSON.parse(localStorage.getItem('accounts')).filter(el=>el.username!==this.loggedUser.username);
    var accountToSave = JSON.parse(localStorage.getItem('accounts')).find(el=>el.username===this.loggedUser.username);
    accountToSave.data.songs = accountToSave.data.songs.filter(el=>el.id!=id);
    this.savedSongs = accountToSave.data.songs;
    localStorage.setItem('accounts', JSON.stringify([accountToSave, ...accounts]));
    this.snackBar.openSnackbar('Brano rimosso dalla libreria', 'Chiudi');
  }

}
/*** End of App component  ***/