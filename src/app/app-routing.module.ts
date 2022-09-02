import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Routes
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent },
  {path: 'home', component: AppComponent, canActivate: [AuthenticationService]},
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
