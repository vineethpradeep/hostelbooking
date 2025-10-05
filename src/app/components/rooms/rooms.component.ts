import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { RoomService, Room } from '../../services/room.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, RouterModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent {
  rooms: Room[];
  constructor(private roomService: RoomService) {
    this.rooms = this.roomService.getRooms();
  }
  pages = [1, 2];
}
