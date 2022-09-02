import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})

/*** Loader Component  ***/
export class LoaderComponent  {

  // Properties
  isLoading: Subject<boolean> = this.loaderServ.isLoading;
  subscription: Subscription;

  constructor(private loaderServ: LoaderService) { }

}
/*** End of Loader Component  ***/