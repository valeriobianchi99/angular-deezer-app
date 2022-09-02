import { Component, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeezerService } from '../services/deezer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

/*** Search Component, the homepage  ***/
export class SearchComponent {

 // Properties and flags
 query: string;
 subscription: Subscription;
 playlist: any = [];
 album: any = { };
 contributors: any[] = [];
 showProgressBar: boolean = false;

 // Event emitters
 @Output() save: EventEmitter<any> = new EventEmitter<any>();
 @Output() delete: EventEmitter<any> = new EventEmitter<any>();

 // Constructor
 constructor(private deezer: DeezerService ){
   // To keep the search alive when page is refreshed
   if(sessionStorage.getItem('query')){
     this.query = sessionStorage.getItem('query');
     this.search();
   }
 }

 // Query to Deezer on input event
 search(){
   if(this.query && this.query !=' '){
    sessionStorage.setItem('query', this.query);
    this.subscription = this.deezer.getResults(this.query).subscribe(
      res => {       
            this.playlist = res['data'];
          }
    );
  }
  else {
    this.clear();
  }
 }

 // Gets album from Deezer with ID passed by param
 getAlbum(song: any){
   if(song.album.id !== this.album.id){
    this.album = {
      id: null,
      cover: '',
      artist: '',
      title: '',
      tracks: [],
      date: ''
    };
    this.subscription = this.deezer.getAlbum(song.album.id).subscribe(
      res=>{
        this.album.id = res.id;
        this.album.cover = res.cover;
        this.album.artist = res.artist.name;
        this.album.title = res.title;
        this.subscription = this.deezer.getTracklist(res.tracklist).subscribe(
          res=>{
            this.album.tracks=res['data'];
          }
        );
        this.album.date = res.release_date;
      }
    );
  }
 }

 // Close the album 
  closeAlbum():void{
    this.album = {};
  }
  
  // To clear query string and album
  clear():void {
    sessionStorage.clear();
    this.playlist=[];
    this.album={};
    this.query = '';
  }

  // Emits song ID to save it
  saveSong(id:number):void{
    this.save.emit(id);
  }

  // Emits song ID to delete it
  deleteSong(id:number):void {
    this.delete.emit(id);
  }

  // Emits songs ID for all the album
  saveAlbum():void {
    for(let i = 0; i<this.album.tracks.length;i++){
      this.saveSong(this.album.tracks[i].id);
    }
  }

  // Emits song ID to delete all the album
  deleteAlbum():void {
    for(let i = 0; i<this.album.tracks.length;i++){
      this.deleteSong(this.album.tracks[i].id)
    }
  }

  // Controls if a song is saved
  isSaved(id:number):boolean{
    var user = JSON.parse(localStorage.getItem('logged'));
    if(!JSON.parse(localStorage.getItem('accounts')).find(el=>el.username===user.username).data.songs) return false;
    else {
      var list = JSON.parse(localStorage.getItem('accounts')).find(el=>el.username===user.username).data.songs;
      return list.find(el=>el.id===id);
    }
  }

  // Controls if all the album is saved
  savedAlbum():boolean{
    if(this.album.id){
      var count = 0;
      for(let i = 0; i<this.album.tracks.length;i++){
        if(!this.isSaved(this.album.tracks[i].id)){
          count ++;
        }
      }
      return count == 0;
    }
    else {
      return false;
    }
  }

}
/*** End of search component  ***/