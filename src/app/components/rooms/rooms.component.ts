import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.rooms = this.roomService.getRooms();
  }

  onViewDetails(roomId: number) {
    console.log("Button clicked for Room:", roomId);

    // if (!this.authService.isLoggedIn()) {
    //   console.log("User not logged in → redirecting to Login");
    //   this.router.navigate(['/auth/login'], {
    //     queryParams: { returnUrl: `/rooms/${roomId}` }
    //   });
    //   return;
    // }

    this.router.navigate(['/rooms', roomId]);
  }
}
