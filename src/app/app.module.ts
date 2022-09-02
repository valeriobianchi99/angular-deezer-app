import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeezerService } from './services/deezer.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { SearchComponent } from './search/search.component';
import { ChartComponent } from './chart/chart.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { SavedComponent } from './saved/saved.component';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import {MatMenuModule} from '@angular/material/menu';
import { UserComponent, DialogOverviewExampleDialog } from './user/user.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthenticationService } from './services/authentication.service';
import { SnackbarService } from './services/snackbar.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from './loader/loader.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoaderService } from './services/loader.service';


@NgModule({

  // Local Components
  declarations: [
    AppComponent,
    SearchComponent,
    ChartComponent,
    SavedComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    UserComponent,
    DialogOverviewExampleDialog,
    LoaderComponent
  ],

  // Entries
  entryComponents: [DialogOverviewExampleDialog],

  // Import Components
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],

  // Services
  providers: [DeezerService, AuthenticationService, SnackbarService, LoaderService],

  // Bootstrap Component -> Router-outlet
  bootstrap: [MainComponent]

})

export class AppModule { }
