import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';

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
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  BookingStep = BookingStep;
  step: BookingStep = BookingStep.Booking;

  bookingForm!: FormGroup;
  paymentForm!: FormGroup;

  propertyIdFixed = 3;
  bedIdFixed = 3;

  userId!: number;

  @Input() monthlyRent!: number;

  monthsList = [1,2,3,4,5,6,7,8,9,10,11,12];
  bookingId!: number;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit() {

    /* -------------------- BOOKING FORM -------------------- */
    this.bookingForm = this.fb.group({
      moveInDate: ['', Validators.required],
      duration: ['', Validators.required],
      monthlyRent: [{ value: '', disabled: true }, Validators.required],
      securityDeposit: [2000, Validators.required],
      checkOutDate: [''],
      specialReq: ['']
    });

    /* -------------------- PAYMENT FORM -------------------- */
    this.paymentForm = this.fb.group({
      paymentMethod: ['Cash', Validators.required],
      totalAmount: [0, [Validators.required, Validators.min(1)]],
      notes: []
    });

    /* Patch monthly rent */
    if (this.monthlyRent) {
      this.bookingForm.patchValue({
        monthlyRent: this.monthlyRent
      });
    }

    /* Auto update checkout + total */
    this.bookingForm.get('moveInDate')?.valueChanges
      .subscribe(() => this.updateCheckoutDate());

    this.bookingForm.get('duration')?.valueChanges
      .subscribe(() => this.updateCheckoutDate());

    /* -------------------- RESTORE FORM AFTER LOGIN -------------------- */
    const savedForm = sessionStorage.getItem('booking_form_data');
    const savedStep = sessionStorage.getItem('booking_step');

    if (savedForm) {
      const data = JSON.parse(savedForm);

      this.bookingForm.patchValue(data, { emitEvent: false });

      setTimeout(() => {
        this.updateCheckoutDate();
      });

      sessionStorage.removeItem('booking_form_data');
    }

    if (savedStep) {
      this.step = Number(savedStep);
      sessionStorage.removeItem('booking_step');
    }

    /* -------------------- AUTO LOGIN CHECK -------------------- */
    const storedUserId = localStorage.getItem('app_user_id');
    if (storedUserId) {
      this.userId = Number(storedUserId);
    }
  }

  /* =========================================================
     CONTINUE TO PAYMENT
  ========================================================== */
  continueToPayment() {

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const storedUserId = localStorage.getItem('app_user_id');

    /* 🔴 NOT LOGGED IN */
    if (!storedUserId) {

      // Save form + step
      sessionStorage.setItem(
        'booking_form_data',
        JSON.stringify(this.bookingForm.getRawValue())
      );

      //sessionStorage.setItem('booking_step', BookingStep.Payment.toString());

      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: this.router.url }
      });

      return;
    }

    /* 🟢 LOGGED IN */
    this.userId = Number(storedUserId);
    this.step = BookingStep.Payment;
  }

  /* ========================================================= */

  goToStep(step: BookingStep) {
    if (step === BookingStep.Payment && this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }
    this.step = step;
  }

  updateCheckoutDate() {
    const moveIn = this.bookingForm.get('moveInDate')?.value;
    const months = Number(this.bookingForm.get('duration')?.value);
    const rent = Number(this.bookingForm.get('monthlyRent')?.value);
    const deposit = Number(this.bookingForm.get('securityDeposit')?.value);

    if (!moveIn || !months) return;

    const d = new Date(moveIn);
    d.setMonth(d.getMonth() + months);

    const totalAmount = (rent * months) + deposit;

    this.bookingForm.patchValue(
      { checkOutDate: d.toISOString().split('T')[0] },
      { emitEvent: false }
    );

    this.paymentForm.patchValue(
      { totalAmount },
      { emitEvent: false }
    );
  }

  submitPayment() {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }
    this.openConfirmModal();
  }

  openConfirmModal() {
    const modal = new bootstrap.Modal(
      document.getElementById('confirmBookingModal')
    );
    modal.show();
  }

  confirmBooking() {
    const modal = bootstrap.Modal.getInstance(
      document.getElementById('confirmBookingModal')
    );
    modal?.hide();
    this.save();
  }

  /* =========================================================
     SAVE BOOKING + PAYMENT
  ========================================================== */
  save() {

    const bookingDto: BookingFormDto = {
      bookingId: 0,
      bookingNumber: 'BK' + Math.floor(100000 + Math.random() * 900000),
      propertyId: this.propertyIdFixed,
      bedId: this.bedIdFixed,
      userId: this.userId,
      checkInDate: this.bookingForm.value.moveInDate,
      checkOutDate: this.bookingForm.value.checkOutDate,
      monthlyRent: this.bookingForm.get('monthlyRent')?.value,
      securityDeposit: this.bookingForm.value.securityDeposit,
      durationMonths: this.bookingForm.value.duration,
      status: 'Booked',
      specialRequests: this.bookingForm.value.specialReq
    };

    this.bookingService.createBooking(bookingDto).subscribe({
      next: (booking: any) => {

        this.bookingId = booking.BookingId;

        const paymentDto = {
          bookingId: this.bookingId,
          paymentMethod: this.paymentForm.value.paymentMethod,
          totalAmount: Number(this.paymentForm.value.totalAmount)
        };

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
