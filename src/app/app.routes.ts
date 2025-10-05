import { Routes } from '@angular/router';
import { RoomsComponent } from './components/rooms/rooms.component';
import { LandingComponent } from './components/landing/landing.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'rooms/:id', component: RoomDetailsComponent },
  { path: '**', redirectTo: '' },
];
