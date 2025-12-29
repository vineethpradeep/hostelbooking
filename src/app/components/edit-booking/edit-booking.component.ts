/* import { CommonModule } from '@angular/common';
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
  } */
/* import { CommonModule } from '@angular/common';
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
  } */
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { BookingService } from '../../services/booking.service';
import { PaymentService } from '../../services/payments.service';
import { BookingFormDto } from '../../models/booking-form.model';

declare var bootstrap: any;

/* ✅ Booking Steps */
enum BookingStep {
  Booking = 1,
  Payment = 2,
  Confirmation = 3
}

@Component({
  selector: 'app-edit-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-booking.component.html'
})
export class EditBookingComponent implements OnInit {

  BookingStep = BookingStep;
  step: BookingStep = BookingStep.Booking;

  bookingForm!: FormGroup;
  paymentForm!: FormGroup;

  /* 🔒 Temporary hardcoded values */
  propertyIdFixed = 3;
  bedIdFixed = 3;
  userIdFixed = 8;

  @Input() monthlyRent!: number;

  monthsList = [1,2,3,4,5,6,7,8,9,10,11,12];

  bookingId!: number;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {

    /* 🏠 BOOKING FORM */
    this.bookingForm = this.fb.group({
      moveInDate: ['', Validators.required],
      duration: ['', Validators.required],
      monthlyRent: [8000, Validators.required],
      securityDeposit: [2000, Validators.required],
      checkOutDate: [''],
      specialReq: ['']
    });

    /* 💳 PAYMENT FORM */
    this.paymentForm = this.fb.group({
      paymentMethod: ['Cash', Validators.required],
      totalAmount: [0, [Validators.required, Validators.min(1)]],
      notes:[]
    });

     this.bookingForm.get('moveInDate')?.valueChanges
    .subscribe(() => this.updateCheckoutDate());

  this.bookingForm.get('duration')?.valueChanges
    .subscribe(() => this.updateCheckoutDate());

  }

 updateCheckoutDate() {
  const moveIn = this.bookingForm.get('moveInDate')?.value;
  const months = Number(this.bookingForm.get('duration')?.value);
  const rent = Number(this.bookingForm.get('monthlyRent')?.value);
  const deposit = Number(this.bookingForm.get('securityDeposit')?.value);

  if (!moveIn || !months) return;

  // 📅 Calculate checkout date
  const d = new Date(moveIn);
  d.setMonth(d.getMonth() + months);

  // 💰 Calculate total amount
  const totalAmount = (rent * months) + deposit;

  // 🔥 IMPORTANT: stop infinite loop
  this.bookingForm.patchValue(
    {
      checkOutDate: d.toISOString().split('T')[0]
    },
    { emitEvent: false }
  );

  this.paymentForm.patchValue(
    {
      totalAmount: totalAmount
    },
    { emitEvent: false }
  );
}


  /* ➡️ Step navigation */
  goToStep(step: BookingStep) {
    if (step === BookingStep.Payment && this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }
    this.step = step;
  }

  /* ✅ Called from payment form submit */
  submitPayment() {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }
    this.openConfirmModal();
  }

  /* 🧾 Open confirmation modal */
  openConfirmModal() {
    const modal = new bootstrap.Modal(
      document.getElementById('confirmBookingModal')
    );
    modal.show();
  }

  /* ✅ Confirm button in modal */
  confirmBooking() {
    const modal = bootstrap.Modal.getInstance(
      document.getElementById('confirmBookingModal')
    );
    modal?.hide();

    this.save();
  }

save() {

  const bookingDto: BookingFormDto = {
    bookingId: 0,
    bookingNumber: 'BK' + Math.floor(100000 + Math.random() * 900000),
    propertyId: this.propertyIdFixed,
    bedId: this.bedIdFixed,
    userId: this.userIdFixed,
    checkInDate: this.bookingForm.value.moveInDate,
    checkOutDate: this.bookingForm.value.checkOutDate,
    monthlyRent: this.bookingForm.value.monthlyRent,
    securityDeposit: this.bookingForm.value.securityDeposit,
    durationMonths: this.bookingForm.value.duration,
    status: 'Booked',
    specialRequests: this.bookingForm.value.specialReq
  };

  this.bookingService.createBooking(bookingDto).subscribe({
    next: (booking: any) => {

      // ✅ FIX IS HERE
      this.bookingId = booking.BookingId;

      console.log('BOOKING ID FROM API 👉', this.bookingId);

      const paymentDto = {
        bookingId: this.bookingId,
        paymentMethod: this.paymentForm.value.paymentMethod,
        totalAmount: Number(this.paymentForm.value.totalAmount)
      };

      console.log('FINAL PAYMENT PAYLOAD 👉', paymentDto);

      this.paymentService.createPayment(paymentDto).subscribe({
        next: () => {
          this.step = BookingStep.Confirmation;
        },
        error: err => console.error('Payment Error', err)
      });
    },
    error: err => console.error('Booking Error', err)
  });
}




  get f() {
    return this.bookingForm.controls;
  }
}


 