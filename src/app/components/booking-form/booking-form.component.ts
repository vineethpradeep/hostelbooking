import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BookingFormDto } from '../../models/booking-form.model';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  bookings: BookingFormDto[] = [];
  bookingForm!: FormGroup;

  editing = false;
  selectedId: number | null = null;
  loading = false;
  errorMessage = '';

  // FIXED VALUES (always same)
  private readonly propertyIdFixed = 101;
  private readonly userIdFixed = 1;

  constructor(private fb: FormBuilder, private api: BookingService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadBookings();
  }

  // -------------------------------
  // Initialize Form with Validators
  // -------------------------------
  private initForm() {
    this.bookingForm = this.fb.group({
      bookingId: [0],
      bookingNumber: ['', Validators.required],

      // FIXED VALUES
      propertyId: [this.propertyIdFixed, Validators.required],
      userId: [this.userIdFixed, Validators.required],

      bedId: [null, [Validators.required, Validators.min(1)]],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      plannedCheckOutDate: ['', Validators.required],

      monthlyRent: [null, [Validators.required, Validators.min(1)]],
      securityDeposit: [null, [Validators.required, Validators.min(0)]],

      bookingType: ['', Validators.required],
      status: ['Active'],   // ADDED so your dto does not break
      specialRequests: ['']
    });
  }

  // -------------------------------
  // Load all bookings
  // -------------------------------
  loadBookings() {
    this.loading = true;
    this.api.getBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load bookings';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // -------------------------------
  // Start creating new booking
  // -------------------------------
  startCreate() {
    this.editing = true;
    this.selectedId = null;

    this.bookingForm.reset({
      bookingId: 0,
      bookingNumber: this.generateBookingNumber(),

      // FIXED VALUES always set again
      propertyId: this.propertyIdFixed,
      userId: this.userIdFixed,

      status: 'Active',
      monthlyRent: null,
      securityDeposit: null
    });
  }

  // -------------------------------
  // Start editing existing booking
  // -------------------------------
  startEdit(b: BookingFormDto) {
    this.editing = true;
    this.selectedId = b.bookingId;

    this.bookingForm.patchValue({
      bookingId: b.bookingId,
      bookingNumber: b.bookingNumber,

      // FIXED VALUES override API
      propertyId: this.propertyIdFixed,
      userId: this.userIdFixed,

      bedId: b.bedId,
      checkInDate: b.checkInDate ?? '',
      checkOutDate: b.checkOutDate ?? '',
      plannedCheckOutDate: b.plannedCheckOutDate ?? '',

      monthlyRent: b.monthlyRent,
      securityDeposit: b.securityDeposit,
      bookingType: b.bookingType,
      status: b.status || 'Active',
      specialRequests: b.specialRequests ?? ''
    });
  }

  // -------------------------------
  // Cancel create/edit
  // -------------------------------
  cancel() {
    this.editing = false;
    this.selectedId = null;
    this.bookingForm.reset();
  }

  // -------------------------------
  // Save booking (Create or Update)
  // -------------------------------
  save() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const dto = this.formToDto(this.bookingForm.value);

    if (this.selectedId && this.selectedId > 0) {
      // UPDATE
      this.api.updateBooking(dto).subscribe({
        next: () => {
          this.loadBookings();
          this.cancel();
        },
        error: () => this.errorMessage = 'Update failed'
      });
    } else {
      // CREATE
      this.api.createBooking(dto).subscribe({
        next: () => {
          this.loadBookings();
          this.cancel();
        },
        error: () => this.errorMessage = 'Create failed'
      });
    }
  }

  // -------------------------------
  // Delete booking
  // -------------------------------
  deleteBooking(id: number) {
    if (!confirm('Delete this booking?')) return;

    this.api.deleteBooking(id).subscribe({
      next: () => this.loadBookings(),
      error: () => this.errorMessage = 'Delete failed'
    });
  }

  // -------------------------------
  // Convert form data → DTO
  // -------------------------------
  private formToDto(value: any): BookingFormDto {
    return {
      bookingId: Number(value.bookingId) || 0,
      bookingNumber: String(value.bookingNumber),

      // Always fixed
      propertyId: this.propertyIdFixed,
      userId: this.userIdFixed,

      bedId: Number(value.bedId),
      checkInDate: value.checkInDate,
      checkOutDate: value.checkOutDate || null,
      plannedCheckOutDate: value.plannedCheckOutDate,

      monthlyRent: Number(value.monthlyRent),
      securityDeposit: Number(value.securityDeposit),

      status: String(value.status),
      bookingType: String(value.bookingType),

      specialRequests: value.specialRequests ? String(value.specialRequests) : null
    };
  }

  // -------------------------------
  // Auto-generate booking number
  // -------------------------------
  private generateBookingNumber(): string {
    const prefix = 'BK';
    const ts = new Date().getTime().toString().slice(-6);
    return `${prefix}${ts}`;
  }

  // Shortcut for form controls in template
  get f() {
    return this.bookingForm.controls;
  }
}
