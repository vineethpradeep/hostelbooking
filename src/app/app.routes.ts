import { Routes } from '@angular/router';
import { RoomsComponent } from './components/rooms/rooms.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PublicLayoutComponent } from './components/public/layout/layout.component';
import { DashBoardLayoutComponent } from './components/dashboard/layout/layout.component';
import { AuthGuard } from './services/auth-guard';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { HeroComponent } from './components/hero/hero.component';

export const routes: Routes = [

  // PUBLIC (Before Login)
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
  { path: '', component: HeroComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'facilities', component: FacilitiesComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'rooms/:id', component: RoomDetailsComponent },
    ]
  },

  // // LOGIN PAGE
  // { path: 'login', component: LoginComponent },

  // DASHBOARD (After Login)
  {
    path: 'dashboard',
    component: DashBoardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
  { path: '', component: DashboardHomeComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'facilities', component: FacilitiesComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'rooms/:id', component: RoomDetailsComponent },
    ]
  }
];
