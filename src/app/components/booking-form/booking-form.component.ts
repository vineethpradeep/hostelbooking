import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


import { Observable } from 'rxjs';
import { BookingFormDto } from '../../models/booking-form.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

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

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadBookings();
  }

  private initForm() {
    this.bookingForm = this.fb.group({
      bookingId: [0],
      bookingNumber: ['', [Validators.required]],
      propertyId: [null, [Validators.required, Validators.min(1)]],
      userId: [null, [Validators.required, Validators.min(1)]],
      bedId: [null, [Validators.required, Validators.min(1)]],
      checkInDate: ['', [Validators.required]],               // 'YYYY-MM-DD'
      checkOutDate: [''],                                    // optional
      plannedCheckOutDate: ['', [Validators.required]],
      monthlyRent: [0, [Validators.required, Validators.min(0)]],
      securityDeposit: [0, [Validators.required, Validators.min(0)]],
      status: ['', [Validators.required]],
      bookingType: ['', [Validators.required]],
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
      error: (err: any) => {
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
      monthlyRent: 0,
      securityDeposit: 0
    });
  }

  startEdit(b: BookingFormDto) {
    this.editing = true;
    this.selectedId = b.bookingId;
    // Patch form — keep fields in ISO date 'YYYY-MM-DD' format
    this.bookingForm.patchValue({
      bookingId: b.bookingId,
      bookingNumber: b.bookingNumber,
      propertyId: b.propertyId,
      userId: b.userId,
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
      // Update
      this.api.updateBooking(dto).subscribe({
        next: (resp: any) => {
          this.loadBookings();
          this.cancel();
        },
        error: (err: any) => {
          console.error(err);
          this.errorMessage = 'Update failed';
        }
      });
    } else {
      // Create
      this.api.createBooking(dto).subscribe({
        next: (resp: any) => {
          this.loadBookings();
          this.cancel();
        },
        error: (err: any) => {
          console.error(err);
          this.errorMessage = 'Create failed';
        }
      });
    }
  }

  deleteBooking(id: number) {
    if (!confirm('Delete this booking?')) return;
    this.api.deleteBooking(id).subscribe({
      next: () => this.loadBookings(),
      error: (err: any) => {
        console.error(err);
        this.errorMessage = 'Delete failed';
      }
    });
  }

  private formToDto(value: any): BookingFormDto {
    // ensure date fields are in YYYY-MM-DD format (HTML date input gives this)
    const dto: BookingFormDto = {
      bookingId: Number(value.bookingId) || 0,
      bookingNumber: String(value.bookingNumber),
      propertyId: Number(value.propertyId),
      userId: Number(value.userId),
      bedId: Number(value.bedId),
      checkInDate: value.checkInDate, // expected 'YYYY-MM-DD'
      checkOutDate: value.checkOutDate ? value.checkOutDate : null,
      plannedCheckOutDate: value.plannedCheckOutDate,
      monthlyRent: Number(value.monthlyRent),
      securityDeposit: Number(value.securityDeposit),
      status: String(value.status),
      bookingType: String(value.bookingType),
      specialRequests: value.specialRequests ? String(value.specialRequests) : null
    };
    return dto;
  }

  private generateBookingNumber(): string {
    const prefix = 'BK';
    const ts = new Date().getTime().toString().slice(-6);
    return `${prefix}${ts}`;
  }

  // convenience getters for template
  get f() {
    return this.bookingForm.controls;
  }
}
function startCreate() {
  throw new Error('Function not implemented.');
}

function startEdit(b: any, BookingDto: any) {
  throw new Error('Function not implemented.');
}

