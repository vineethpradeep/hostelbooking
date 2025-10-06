import { Routes } from '@angular/router';
import { RoomsComponent } from './components/rooms/rooms.component';
import { LandingComponent } from './components/landing/landing.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
    { path: 'facilities', component: FacilitiesComponent },
  { path: 'rooms/:id', component: RoomDetailsComponent },
  { path: '**', redirectTo: '' },
];
