import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-booking',
  imports: [
    CommonModule,
  FormsModule,
  ReactiveFormsModule
],
  templateUrl: './edit-booking.component.html',
  styleUrl: './edit-booking.component.css'
})
export class EditBookingComponent {
 step = 1;
  bookingForm: FormGroup;
  paymentForm: FormGroup;
  constructor(private fb: FormBuilder) {

    this.bookingForm = this.fb.group({
      roomType: ['Single Bed'],
      moveInDate: [''],
      duration: [''],
      specialReq: ['']
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['Cash'],
      notes: ['']
    });
  }

  goToStep(s: number) {
    this.step = s;
  }

  updateSpecialReq(event: any) {
    this.bookingForm.patchValue({
      specialReq: event.target.innerHTML
    });
  }
}
