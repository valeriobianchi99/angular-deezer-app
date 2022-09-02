import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/*** Deezer Service, to call the Deezer API ***/
export class DeezerService {

  // Constructor 
  constructor(private http: HttpClient) { }

  // Get query results in the Search Component
  getResults(query: string):Observable<any>{
    return this.http.get('https://api.deezer.com/search?q='+query).pipe(
      map(res=>{return res})
    );
  }

  // Get tracklist from chart
  getTracklist(url: string){
    return this.http.get(url).pipe(
      map(res=>{return res})
    );
  }

  // Get album object
  getAlbum(id: number):Observable<any>{
    return this.http.get('https://api.deezer.com/album/'+id.toString()).pipe(
      map(res=>{ return res})
    );
  }

  // Get track
  getTrack(id: number):Observable<any>{
    return this.http.get('https://api.deezer.com/track/'+id.toString()).pipe(
      map(res=>{ return res })
    );
  }

}
/*** End of Deezer service  ***/