import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { MyGiftyPageComponent } from './components/my-gifty-page/my-gifty-page.component';
import { FriendsPageComponent } from './components/friends-page/friends-page.component';
import { CalendarPageComponent } from './components/calendar-page/calendar-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'about', component: AboutComponent },
  { path: 'my-gifty', component: MyGiftyPageComponent, canActivate: [AuthGuard] },
  { path: 'friends', component: FriendsPageComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarPageComponent, canActivate: [AuthGuard] },
  //{ path: 'friends/:id', component: FriendProfileComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }