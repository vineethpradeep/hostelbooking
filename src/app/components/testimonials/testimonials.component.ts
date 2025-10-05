import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

interface Testimonial {
  text: string;
  author: string;
  rating: number;
  logo: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      text: `The best Hostel in the city! The staff were friendly and the rooms were clean and comfortable. Highly recommend!`,
      author: 'Alexander Vasquez',
      rating: 4.5,
      logo: '',
    },
    {
      text: `Amazing experience! The location is perfect, and the amenities are top-notch. Will definitely be back! Neet and Higienic rooms. With good Romm service and support staff. `,
      author: 'Jessica Williams',
      rating: 5,
      logo: '',
    },
  ];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    dots: true,
    nav: false,
    items: 1,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
  };
}
