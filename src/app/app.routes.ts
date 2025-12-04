import { Routes } from '@angular/router';

// Components
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

import { BookingListComponent } from './components/booking-list/booking-list.component';
import { AdminDashboardComponent } from './components/dashboard/dashboard-home/dashboard-home.component';

// Guards
import { AuthGuard } from './services/auth.guard';
import { UserLayoutComponent } from './components/dashboard/user-layout/user-layout.component';
import { EditBookingComponent } from './components/edit-booking/edit-booking.component';
import { UserDashboardComponent } from './components/dashboard/user-dashboard/user-dashboard.component';

export const routes: Routes = [

  // ------------------------------------------------------
  // PUBLIC ROUTES
  // ------------------------------------------------------
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HeroComponent },
      { path: 'rooms', component: RoomsComponent },

      // ⭐ Require login before accessing room details
      { path: 'rooms/:id', component: RoomDetailsComponent },

      { path: 'about', component: AboutUsComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'facilities', component: FacilitiesComponent },

      { path: 'auth/register', component: RegisterComponent },
      { path: 'auth/login', component: LoginComponent },

      // Booking → must be logged in
      { path: 'bookings', component: EditBookingComponent }
    ]
  },

  // ------------------------------------------------------
  // ADMIN DASHBOARD (Protected)
  // ------------------------------------------------------
  {
    path: 'dashboard',
    component: DashBoardLayoutComponent,
    // canActivate: [AuthGuard], // ⭐ One guard is enough for whole dashboard
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'booking-list', component: BookingListComponent },

      // No need canActivate again (parent already protected)
      { path: 'rooms/:id', component: RoomDetailsComponent }
    ]
  },

  // ------------------------------------------------------
  // USER DASHBOARD (Protected)
  // ------------------------------------------------------
  {
    path: 'user-dashboard',
    component: UserLayoutComponent,
     children: [
      { path: '', component: UserDashboardComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'booking-list', component: BookingListComponent },
      // No need canActivate again (parent already protected)
      { path: 'rooms/:id', component: RoomDetailsComponent }
    ]
    // canActivate: [AuthGuard]
  },

  // FALLBACK
  { path: '**', redirectTo: '' }
];
