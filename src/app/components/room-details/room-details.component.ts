import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { EditBookingComponent } from '../edit-booking/edit-booking.component';

import { RoomService } from '../../services/room.service';
import { Rooms } from '../../models/room.model';
import { Rating } from '../../models/rating.model';
import { Review } from '../../models/review.model';

interface StarSet {
  fullStars: number[];
  halfStar: boolean;
  emptyStars: number[];
}

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    EditBookingComponent
  ],
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  room?: Rooms;
  rating!: Rating;

  stars: StarSet = { fullStars: [], halfStar: false, emptyStars: [] };
  reviewStars: StarSet[] = [];

  bookingFormVisible = false;

  @ViewChild(EditBookingComponent)
  bookingFormCmp!: EditBookingComponent;

    monthlyRentAmount: number = 8000;
   
  newReview: Partial<Review> = {
    name: '',
    email: '',
    text: '',
    rating: 0
  };

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {}

  // =============================
  // INIT
  // =============================
  ngOnInit(): void {
    //debugger;
    const propertyId = Number(this.route.snapshot.paramMap.get('propertyId'));
    const roomId = Number(this.route.snapshot.paramMap.get('roomId'));

    this.roomService.getRoomById(propertyId, roomId).subscribe({
      next: (room) => {
        if (!room) {
          console.error('Room not found');
          return;
        }

        //debugger;
        this.room = room;

        // ⭐ Create Rating locally (NO API)
      /*   this.rating = {
          id: room.RoomId,
          name: room.RoomName,
          price: room.Price,
          image: room.Image,
          rating: 4.2,
          size: '120 sq ft',
          capacity: room.Capacity,
          bed: room.TotalBeds > 1 ? 'Shared' : 'Single',
          services: room.Features,
          description: 'Comfortable room with all facilities',
          reviews: []
        }; */

        //this.stars = this.getStars(this.rating.rating ?? 0);
        this.reviewStars = [];
      },
      error: (err) => {
        console.error('Room API failed', err);
      }
    });
  }

  // =============================
  // STAR LOGIC
  // =============================
  getStars(rating: number): StarSet {
    const fullStars = Array.from({ length: Math.floor(rating) }, (_, i) => i);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = Array.from(
      { length: 5 - Math.ceil(rating) },
      (_, i) => i
    );
    return { fullStars, halfStar, emptyStars };
  }

  // =============================
  // REVIEW
  // =============================
  submitReview(): void {
    if (!this.newReview.name || !this.newReview.text || !this.newReview.rating) {
      alert('Please fill all required fields.');
      return;
    }

    const review: Review = {
      name: this.newReview.name,
      email: this.newReview.email,
      text: this.newReview.text,
      rating: this.newReview.rating,
      date: new Date().toLocaleDateString(),
      avatar: 'assets/img/room/avatar/default-avatar.jpg'
    };

    this.rating.reviews ??= [];
    this.rating.reviews.push(review);

    this.reviewStars =
      this.rating.reviews.map(r => this.getStars(r.rating));

    this.newReview = { name: '', email: '', text: '', rating: 0 };
    alert('Review submitted successfully!');
  }

  // =============================
  // BOOKING
  // =============================
  openBookingForm(): void {
    this.bookingFormVisible = true;
  }

  closeBookingForm(): void {
    this.bookingFormVisible = false;
  }
}
