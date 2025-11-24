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
import { HeroComponent } from './components/hero/hero.component';
import { UsersComponent } from './components/users/users.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';

import { UsersDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/dashboard/dashboard-home/dashboard-home.component';


export const routes: Routes = [

  // -------------------------
  // PUBLIC (Before Login)
  // -------------------------
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
      { path: 'bookings', component: BookingFormComponent }
    ]
  },

  // -------------------------
  // ADMIN DASHBOARD
  // -------------------------
  {
    path: 'dashboard',
    component: DashBoardLayoutComponent,
    children: [
      { path: '', component: AdminDashboardComponent },  
      { path: 'rooms', component: RoomsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'booking-list', component: BookingListComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'facilities', component: FacilitiesComponent },
      { path: 'rooms/:id', component: RoomDetailsComponent }
    ]
  },

  // -------------------------
  // USER DASHBOARD (Direct URL)
  // -------------------------
  {
    path: 'user-dashboard',
    component: UsersDashboardComponent
  },

  // REDIRECT DEFAULT
  { path: '**', redirectTo: '' }
];
