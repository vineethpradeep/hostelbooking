import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';
import { RoomFilterComponent } from '../room-filter/room-filter.component';
import { Rooms } from '../../models/room.model';

/* export interface Room {
  id: number;
  name: string;
  price: number;
  image: string;
  rating?: number;
  size: string;
  capacity: number;
  bed: string;
  services: string[];
  description?: string;
  reviews?: Review[];
} */
@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RouterModule, RoomFilterComponent],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})



export class RoomsComponent implements OnInit {
rooms: Rooms[] = [];

  allRooms: Rooms[] = [];   // ✅ correct type

  propertyId:number=3;
  

  constructor(
    private router: Router,
    private authService: AuthService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    
  
      const propertyId = 3;
   this.roomService.getRoomsByProperty(propertyId).subscribe({
    next: (data) => {
        this.rooms = data;   // ✅ display copy
        debugger;
      },
      error: (err) => console.error('API Error:', err)
    });
  }


  goBack() {
    this.router.navigate(['/rooms']);
  }
 onViewDetails(roomId: number) {

  const propertyId = 3; // 🔴 replace with dynamic propertyId later

  const isUserDashboard =
    this.router.url.startsWith('/user-dashboard');

  if (isUserDashboard) {
    // 🔐 Logged-in user → stay in dashboard
    this.router.navigate([
      '/user-dashboard',
      propertyId,
      'rooms',
      roomId
    ]);
  } else {
    // 🌍 Public user
    this.router.navigate([
      '/',
      propertyId,
      'rooms',
      roomId
    ]);
  }
}


// 🔥 THIS CONNECTS YOUR FILTER COMPONENT
  onFilterChanged(filters: any) {
    this.roomService.filterRooms(
      this.propertyId,
      filters.minPrice,
      filters.maxPrice,
      filters.capacity
    ).subscribe({
      next: data => this.rooms = data,
      error: err => console.error(err)
    });
  }

}
