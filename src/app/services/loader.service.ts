import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/*** Loader Service, to manage show and hide the Mat Spinner  ***/
export class LoaderService {

  // Properties
  isLoading = new Subject<boolean>();

  constructor() { }

  // Show method
  show():void{
    this.isLoading.next(true);
  }

  // Hide method
  hide():void {
    this.isLoading.next(false);
  }
}
/*** End of Loader Service ***/