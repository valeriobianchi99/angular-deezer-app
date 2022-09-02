import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})

/*** Saved Component, alias your library ***/
export class SavedComponent implements OnInit {

  // Properties and flags
  @Input('tracks') tracks: any[] = [];
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();
  filtro: string = '';
  username: string = '';
  onDelete = false;

  constructor() {}

  // Getting current username
  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('logged')).username;
  }

  // Remove song from library
  unsave(id:number):void{ 
    this.remove.emit(id);
  }

  // Filter songs
  search():void{
    if(!this.filtro) this.tracks = JSON.parse(localStorage.getItem(this.username)).data;
    else{
      var newList = this.tracks.filter(el=> el.title.toLowerCase().indexOf(this.filtro)>-1 || el.artist.name.toLowerCase().indexOf(this.filtro)>-1 || el.album.title.indexOf(this.filtro)>-1);
      this.tracks = newList;
    }
  }

  // Controls if there are saved tracks for current user
  thereAreTracks():boolean{
    if(JSON.parse(localStorage.getItem('accounts')).find(el=>el.username === this.username)){
      return JSON.parse(localStorage.getItem('accounts')).find(el=>el.username === this.username).data.songs.length>0;
    }
    else return false;
  }

}
/*** End of Saved Component ***/