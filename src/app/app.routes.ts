import { Routes } from '@angular/router';

/* Layouts */
import { PublicLayoutComponent } from './components/public/layout/layout.component';
import { DashBoardLayoutComponent } from './components/dashboard/layout/layout.component';
import { UserLayoutComponent } from './components/dashboard/user-layout/user-layout.component';

/* Public Components */
import { HeroComponent } from './components/hero/hero.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';

/* Admin */
import { AdminDashboardComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { UsersComponent } from './components/users/users.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BookingListComponent } from './components/bookings/bookings.component';
import { PropertiesComponent } from './components/properties/properties.component';

/* Tenant */
import { UserDashboardComponent } from './components/dashboard/user-dashboard/user-dashboard.component';
import { EditBookingComponent } from './components/edit-booking/edit-booking.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserDocumentsComponent } from './components/user-documents/user-documents.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

/* Guards */
import { AuthGuard } from './services/auth.guard';
import { TenantGuard } from './services/tenant.guard';
import { AdminGuard } from './services/admin.guard';



export const routes: Routes = [

  // ------------------------------------------------------
  // ✅ PUBLIC ROUTES (NO LOGIN REQUIRED)
  // ------------------------------------------------------
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HeroComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: ':propertyId/rooms/:roomId', component: RoomDetailsComponent },

      { path: 'about', component: AboutUsComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'facilities', component: FacilitiesComponent },

      { path: 'auth/register', component: RegisterComponent },
      { path: 'auth/login', component: LoginComponent }
    ]
  },

  // ------------------------------------------------------
  // ✅ TENANT (USER) DASHBOARD
  // ------------------------------------------------------
  {
    path: 'user-dashboard',
    component: UserLayoutComponent,
    canActivate: [AuthGuard, TenantGuard],
    children: [
      { path: '', component: UserDashboardComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: ':propertyId/rooms/:roomId', component: RoomDetailsComponent },

      { path: 'about', component: AboutUsComponent },
      { path: 'facilities', component: FacilitiesComponent },
      { path: 'contact', component: ContactUsComponent },
      {path:'profile',component:ProfileComponent}
    ]
  },

  // ------------------------------------------------------
  // ✅ ADMIN DASHBOARD
  // ------------------------------------------------------
  {
    path: 'dashboard',
    component: DashBoardLayoutComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
    // { path: 'rooms', component: RoomsComponent },  
     { path: 'properties', component: PropertiesComponent },
     { path: 'users', component: UsersComponent },
     { path: 'users/:userId/documents', component: UserDocumentsComponent },
     { path: 'users/:userId/profile', component: UserProfileComponent },
     { path: 'payments', component: PaymentComponent },
     { path: 'bookings', component: BookingListComponent}, 
     {path:'profile',component:ProfileComponent}
    ]
  },

  // ------------------------------------------------------
  // ✅ FALLBACK
  // ------------------------------------------------------
  { path: '**', redirectTo: '' }
];
