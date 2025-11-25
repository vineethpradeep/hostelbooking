import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';
import { RoomFilterComponent } from '../room-filter/room-filter.component';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RouterModule, RoomFilterComponent],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];
  allRooms: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.allRooms = this.roomService.getRooms();
    this.rooms = [...this.allRooms];
  }

  goBack() {
    this.router.navigate(['/rooms']);
  }
  onViewDetails(roomId: number) {
    this.router.navigate(['/rooms', roomId]);
  }

  onFilterChanged(filters: any) {
    this.rooms = this.allRooms.filter((room) => {
      const matchesSearch =
        !filters.search ||
        room.name.toLowerCase().includes(filters.search.toLowerCase());

      const matchesMinPrice =
        !filters.minPrice || room.price >= filters.minPrice;

      const matchesMaxPrice =
        !filters.maxPrice || room.price <= filters.maxPrice;

      const matchesCapacity =
        !filters.capacity || room.capacity >= filters.capacity;

      return (
        matchesSearch && matchesMinPrice && matchesMaxPrice && matchesCapacity
      );
    });
  }
}
