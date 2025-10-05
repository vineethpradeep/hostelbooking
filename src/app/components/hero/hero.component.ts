import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { BookingFormComponent } from '../booking-form/booking-form.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ReactiveFormsModule,
    BookingFormComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  form!: FormGroup;

  slides = [
    { img: 'assets/img/hero-1.jpg' },
    { img: 'assets/img/hero-2.jpg' },
    { img: 'assets/img/hero-3.jpg' },
  ];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    dots: true,
    items: 1,
    nav: false,
    autoplayHoverPause: true,
    autoHeight: true,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      checkIn: [''],
      checkOut: [''],
      guest: ['2 Adults'],
      room: ['1 Room'],
    });
  }

  submit(): void {
    console.log('Form submitted:', this.form.value);
  }
}
