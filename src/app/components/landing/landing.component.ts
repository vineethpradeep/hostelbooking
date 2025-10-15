import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ServicesComponent } from '../services/services.component';
import { FeaturedRoomsComponent } from '../featured-rooms/rooms.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { LandingMenuComponent } from '../landing-menu/landing-menu.component';
import { FacilitiesComponent } from '../facilities/facilities.component';
import { StatsCounterComponent } from '../stats-counter/stats-counter.component';
import { MenuComponent } from '../menu/menu.component';

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
    MenuComponent,
    FacilitiesComponent,
    StatsCounterComponent,
  ],
  templateUrl: './landing.component.html',
})
export class LandingComponent {}
