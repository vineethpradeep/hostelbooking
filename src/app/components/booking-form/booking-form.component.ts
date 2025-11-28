import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { BookingFormDto } from '../../models/booking-form.model';

declare const bootstrap: any;

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  bookingForm!: FormGroup;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  // Months list for dropdown
  monthsList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Hardcoded values
  private readonly propertyIdFixed = 1;
  private readonly userIdFixed = 11;
  private readonly bedIdFixed = 1;

  constructor(private fb: FormBuilder, private api: BookingService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadInitialValues();
    this.autoUpdateCheckoutDate();
    this.autoUpdateWhenCheckInChanges();
  }

  // ======================================================
  // INIT FORM
  // ======================================================
  private initForm() {
    this.bookingForm = this.fb.group({
      bookingId: [0],
      bookingNumber: ['', Validators.required],

      // Hardcoded – no validation
      propertyId: [this.propertyIdFixed],
      bedId: [this.bedIdFixed],

      // Required fields
      checkInDate: ['', Validators.required],
      durationMonths: [null, Validators.required],
      monthlyRent: [null, [Validators.required, Validators.min(1)]],
      securityDeposit: [null, [Validators.required, Validators.min(1)]],
      bookingType: ['', Validators.required],

      // Auto-filled
      checkOutDate: [''],

      status: ['Active'],
      specialRequests: ['']
    });
  }

  // ======================================================
  // LOAD INITIAL VALUES
  // ======================================================
  private loadInitialValues() {
    this.bookingForm.patchValue({
      propertyId: this.propertyIdFixed,
      bedId: this.bedIdFixed,
      bookingNumber: this.generateBookingNumber()
    });
  }

  // ======================================================
  // AUTO CALCULATE CHECKOUT WHEN MONTHS CHANGE
  // ======================================================
  private autoUpdateCheckoutDate() {
    this.bookingForm.get('durationMonths')?.valueChanges.subscribe(months => {
      const checkIn = this.bookingForm.get('checkInDate')?.value;
      if (!months || !checkIn) return;

      const d = new Date(checkIn);
      d.setMonth(d.getMonth() + Number(months));

      this.bookingForm.patchValue({ checkOutDate: this.formatDate(d) });
    });
  }

  // ======================================================
  // AUTO CALCULATE WHEN CHECK-IN CHANGES
  // ======================================================
  private autoUpdateWhenCheckInChanges() {
    this.bookingForm.get('checkInDate')?.valueChanges.subscribe(dateValue => {
      const months = this.bookingForm.get('durationMonths')?.value;
      if (!months || !dateValue) return;

      const d = new Date(dateValue);
      d.setMonth(d.getMonth() + Number(months));

      this.bookingForm.patchValue({ checkOutDate: this.formatDate(d) });
    });
  }

  // Format date → YYYY-MM-DD
  private formatDate(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  // ======================================================
  // SAVE BOOKING
  // ======================================================
  save() {
    this.successMessage = null;
    this.errorMessage = null;

    this.bookingForm.patchValue({
      propertyId: this.propertyIdFixed,
      bedId: this.bedIdFixed,
      bookingNumber: this.bookingForm.value.bookingNumber || this.generateBookingNumber()
    });

    // Show errors if form invalid
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      this.errorMessage = 'Please fill all required fields.';
      this.showPopup();
      return;
    }

    const dto: BookingFormDto = {
      bookingId: 0,
      bookingNumber: this.bookingForm.value.bookingNumber,
      propertyId: this.propertyIdFixed,
      bedId: this.bedIdFixed,

      checkInDate: this.bookingForm.value.checkInDate,
      checkOutDate: this.bookingForm.value.checkOutDate,

      monthlyRent: this.bookingForm.value.monthlyRent,
      securityDeposit: this.bookingForm.value.securityDeposit,
      bookingType: this.bookingForm.value.bookingType,
      durationMonths: this.bookingForm.value.durationMonths,

      status: 'Active',
      specialRequests: this.bookingForm.value.specialRequests,
      userId: this.userIdFixed
    };

    this.api.createBooking(dto).subscribe({
      next: () => {
        this.successMessage = 'Booking created successfully!';
        this.showPopup();
      },
      error: err => {
        this.errorMessage = err?.error?.message || 'Booking failed.';
        this.showPopup();
      }
    });
  }

  // ======================================================
  // CANCEL FORM
  // ======================================================
  cancel() {
    this.bookingForm.reset();
    this.loadInitialValues();
  }

  // ======================================================
  // POPUP
  // ======================================================
  private showPopup() {
    const modalEl = document.getElementById('popupAlert');
    if (modalEl) new bootstrap.Modal(modalEl).show();
  }

  // Generate booking number
  private generateBookingNumber(): string {
    return 'BK' + new Date().getTime().toString().slice(-6);
  }

  get f() {
    return this.bookingForm.controls;
  }
}
