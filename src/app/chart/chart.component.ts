import { Component, Output, EventEmitter } from '@angular/core';
import { DeezerService } from '../services/deezer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

/*** Chart Component, to see the top songs of your country  ***/
export class ChartComponent  {

  // Properties
  tracks:any = [];
  subscription: Subscription;

  // Event emitters
  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();


  // Constructor
  constructor(private deezer: DeezerService) { 
    // Getting chart tracklist from Deezer as array
    this.subscription = this.deezer.getTracklist('https://api.deezer.com/chart/0/tracks').subscribe(
      res=> {
        this.tracks = res['data'];
        this.order(this.tracks);
      }
    );
  }

  // Emits song ID to save it
  saveSong(id:number){
    this.save.emit(id);
  }

  // Emits song ID to delete it
  deleteSong(id:number){
    this.delete.emit(id);
  }

  // Order array by rank
  order(array: any[]){
    array.sort((a,b)=> b['rank']-a['rank'])
  }

  // Controls if a song is already saved
  saved(id: number):boolean {
    var username = JSON.parse(localStorage.getItem('logged')).username;
    if(!localStorage.getItem(username)) return false;
    else{
      var list = JSON.parse(localStorage.getItem(username)).data;
      return list.find(el=>el.id===id);
    }
  }

}
/*** End of Chart Component  ***/