import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ServicesComponent } from '../services/services.component';
import { FeaturedRoomsComponent } from '../featured-rooms/rooms.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeroComponent,
    AboutUsComponent,
    ServicesComponent,
    FeaturedRoomsComponent,
    TestimonialsComponent,
  ],
  templateUrl: './landing.component.html',
})
export class LandingComponent {}
