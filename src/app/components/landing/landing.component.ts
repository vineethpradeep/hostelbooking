import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ServicesComponent } from '../services/services.component';
import { FeaturedRoomsComponent } from '../featured-rooms/rooms.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { FacilitiesComponent } from '../facilities/facilities.component';
import { StatsCounterComponent } from '../stats-counter/stats-counter.component';
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeroComponent,
    AboutUsComponent,
    ServicesComponent,
    FeaturedRoomsComponent,
    TestimonialsComponent,
    FacilitiesComponent,
    StatsCounterComponent,
    BookingComponent,
  ],
  templateUrl: './landing.component.html',
})
export class LandingComponent {}
