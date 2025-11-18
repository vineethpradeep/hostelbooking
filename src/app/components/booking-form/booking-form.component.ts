import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ApiService } from '../../services/api.service';
import { BookingFormDto } from '../../models/booking-form.model';

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

  // FIXED VALUES (no hardcode variables, direct values)
  private readonly propertyIdFixed = 101;
  private readonly userIdFixed = 1;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadBookings();
  }

  private initForm() {
    this.bookingForm = this.fb.group({
      bookingId: [0],
      bookingNumber: ['', Validators.required],

      // FIXED VALUES HERE
      propertyId: [this.propertyIdFixed, [Validators.required]],
      userId: [this.userIdFixed, [Validators.required]],

      bedId: [null, [Validators.required, Validators.min(1)]],
      checkInDate: ['', Validators.required],
      checkOutDate: [''],
      plannedCheckOutDate: ['', Validators.required],
      monthlyRent: [0, [Validators.required, Validators.min(0)]],
      securityDeposit: [0, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      bookingType: ['', Validators.required],
      specialRequests: ['']
    });
  }

  loadBookings() {
    this.loading = true;
    this.api.getBookings().subscribe({
      next: (data: BookingFormDto[]) => {
        this.bookings = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load bookings';
        console.error(err);
        this.loading = false;
      }
    });
  }

  startCreate() {
    this.editing = true;
    this.selectedId = null;

    this.bookingForm.reset({
      bookingId: 0,
      bookingNumber: this.generateBookingNumber(),

      // FIXED VALUES HERE TOO
      propertyId: this.propertyIdFixed,
      userId: this.userIdFixed,

      monthlyRent: 0,
      securityDeposit: 0
    });
  }

  startEdit(b: BookingFormDto) {
    this.editing = true;
    this.selectedId = b.bookingId;

    this.bookingForm.patchValue({
      bookingId: b.bookingId,
      bookingNumber: b.bookingNumber,

      // IGNORE API VALUES → ALWAYS FIXED
      propertyId: this.propertyIdFixed,
      userId: this.userIdFixed,

      bedId: b.bedId,
      checkInDate: b.checkInDate ?? '',
      checkOutDate: b.checkOutDate ?? '',
      plannedCheckOutDate: b.plannedCheckOutDate ?? '',
      monthlyRent: b.monthlyRent,
      securityDeposit: b.securityDeposit,
      status: b.status,
      bookingType: b.bookingType,
      specialRequests: b.specialRequests ?? ''
    });
  }

  cancel() {
    this.editing = false;
    this.selectedId = null;
    this.bookingForm.reset();
  }

  save() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const dto: BookingFormDto = this.formToDto(this.bookingForm.value);

    if (this.selectedId && this.selectedId > 0) {
      this.api.updateBooking(dto).subscribe({
        next: () => {
          this.loadBookings();
          this.cancel();
        },
        error: () => {
          this.errorMessage = 'Update failed';
        }
      });
    } else {
      this.api.createBooking(dto).subscribe({
        next: () => {
          this.loadBookings();
          this.cancel();
        },
        error: () => {
          this.errorMessage = 'Create failed';
        }
      });
    }
  }

  deleteBooking(id: number) {
    if (!confirm('Delete this booking?')) return;

    this.api.deleteBooking(id).subscribe({
      next: () => this.loadBookings(),
      error: () => {
        this.errorMessage = 'Delete failed';
      }
    });
  }

  private formToDto(value: any): BookingFormDto {
    return {
      bookingId: Number(value.bookingId) || 0,
      bookingNumber: String(value.bookingNumber),

      // ALWAYS FIXED
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

  private generateBookingNumber(): string {
    const prefix = 'BK';
    const ts = new Date().getTime().toString().slice(-6);
    return `${prefix}${ts}`;
  }

  get f() {
    return this.bookingForm.controls;
  }
}
