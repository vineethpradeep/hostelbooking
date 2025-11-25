import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { RoomService, Review, Room } from '../../services/room.service';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { EditBookingComponent } from '../edit-booking/edit-booking.component';

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
    BookingFormComponent,
    EditBookingComponent
  ],
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
})
export class RoomDetailsComponent {
  room?: Room;
  roomId!: number;

  stars: StarSet = { fullStars: [], halfStar: false, emptyStars: [] };
  reviewStars: StarSet[] = [];

  // ⭐ NEW — control visibility of booking form
  bookingFormVisible: boolean = false;

  // ⭐ NEW — to call child method startCreate()
  @ViewChild(BookingFormComponent)
  bookingFormCmp!: BookingFormComponent;

  newReview: Partial<Review> = { name: '', email: '', text: '', rating: 0 };

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {}

  ngOnInit() {
    this.roomId = Number(this.route.snapshot.paramMap.get('id'));
    this.room = this.roomService.getRoomById(this.roomId);

    if (this.room) {
      this.stars = this.getStars(this.room.rating ?? 0);
      this.reviewStars =
        this.room.reviews?.map((r) => this.getStars(r.rating ?? 0)) || [];
    }
  }

  getStars(rating: number): StarSet {
    const fullStars = Array.from({ length: Math.floor(rating) }, (_, i) => i);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = Array.from(
      { length: 5 - Math.ceil(rating) },
      (_, i) => i
    );
    return { fullStars, halfStar, emptyStars };
  }

  submitReview() {
    if (
      this.room &&
      this.newReview.name &&
      this.newReview.text &&
      this.newReview.rating
    ) {
      const review: Review = {
        name: this.newReview.name,
        email: this.newReview.email,
        text: this.newReview.text,
        rating: this.newReview.rating,
        date: new Date().toLocaleDateString(),
        avatar: 'assets/img/room/avatar/default-avatar.jpg',
      };

      this.room.reviews?.push(review);

      this.reviewStars =
        this.room.reviews?.map((r) => this.getStars(r.rating ?? 0)) || [];

      this.newReview = { name: '', email: '', text: '', rating: 0 };
      alert('Review submitted successfully!');
    } else {
      alert('Please fill all required fields.');
    }
  }

  // ⭐ NEW — When clicking Book Now
  openBookingForm() {
    this.bookingFormVisible = true;

    // Wait until component renders, then call startCreate()
    setTimeout(() => {
      if (this.bookingFormCmp && this.bookingFormCmp.startCreate) {
        this.bookingFormCmp.startCreate();
      }
    }, 50);
  }

  // ⭐ NEW — When booking form emits close
  closeBookingForm() {
    this.bookingFormVisible = false;
  }
}
