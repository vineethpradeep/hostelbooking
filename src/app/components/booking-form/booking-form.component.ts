import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { BookingFormDto } from '../../models/booking-form.model';

declare const bootstrap: any; // bootstrap JS modal

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  bookingForm!: FormGroup;

  // Messages displayed inside the Bootstrap modal
  successMessage: string | null = null;
  errorMessage: string | null = null;

  // ======= HARD-CODED SETTINGS (change if needed) =======
  private readonly propertyIdFixed = 1; // MUST exist in DB (avoid FK failure)
  private readonly userIdFixed = 11;
  private readonly bedIdFixed = 1;
  // ======================================================

  constructor(private fb: FormBuilder, private api: BookingService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadHardcodedIds();
    //this.syncPlannedCheckout();
  }

  private initForm() {
    this.bookingForm = this.fb.group({
      bookingId: [0],
      bookingNumber: ['', Validators.required],

      propertyId: [this.propertyIdFixed, Validators.required],
      userId: [this.userIdFixed, Validators.required],

      bedId: [this.bedIdFixed, Validators.required], // will be patched to hard-coded value

      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
     // plannedCheckOutDate: ['', Validators.required], // mirrored from checkOutDate

      monthlyRent: [null, [Validators.required, Validators.min(1)]],
      securityDeposit: [null, [Validators.required, Validators.min(0)]],

      bookingType: ['', Validators.required],
      status: ['Active'],

      specialRequests: ['']
    });
  }

  // Patch the hard-coded ids (and booking number)
  private loadHardcodedIds() {
    this.bookingForm.patchValue({
      bedId: this.bedIdFixed,
      propertyId: this.propertyIdFixed,
      userId: this.userIdFixed,
      bookingNumber: this.generateBookingNumber()
    });
  }

  // Keep plannedCheckOutDate in-sync with checkOutDate
/*   private syncPlannedCheckout() {
    this.bookingForm.get('checkOutDate')?.valueChanges.subscribe((d) => {
      if (d) {
        this.bookingForm.patchValue({ plannedCheckOutDate: d });
      }
    });
  } */

  // Show Bootstrap modal popup (success or error)
  private showPopup() {
    const modalEl = document.getElementById('popupAlert');
    if (!modalEl) return;
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  // Called from parent (if you use that flow)
  startCreate() {
    this.bookingForm.reset({
      bookingId: 0,
      bookingNumber: this.generateBookingNumber(),
      propertyId: this.propertyIdFixed,
      userId: this.userIdFixed,
      bedId: this.bedIdFixed,
      status: 'Active'
    });
    this.successMessage = null;
    this.errorMessage = null;
  }

  // Save handler (Create)
  save() {
    // reset messages first
    this.successMessage = null;
    this.errorMessage = null;

    // AUTO-FILL required hidden/derived fields before validation
    this.bookingForm.patchValue({
      bedId: this.bedIdFixed,
      propertyId: this.propertyIdFixed,
      userId: this.userIdFixed,
      bookingNumber: this.bookingForm.value.bookingNumber || this.generateBookingNumber(),
     // plannedCheckOutDate: this.bookingForm.value.checkOutDate
    });

    // Debugging: inspect the form and validity
    console.log('FORM VALUE BEFORE SUBMIT:', this.bookingForm.getRawValue());
    console.log('FORM VALID:', this.bookingForm.valid);

    // If invalid -> mark and show error popup
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      this.errorMessage = 'Please fill all required fields.';
      this.showPopup();
      return;
    }

    // Map to DTO (types expected by backend)
    const dto: BookingFormDto = {
      bookingId: Number(this.bookingForm.value.bookingId) || 0,
      bookingNumber: String(this.bookingForm.value.bookingNumber),
      propertyId: Number(this.bookingForm.value.propertyId),
      userId: Number(this.bookingForm.value.userId),
      bedId: Number(this.bookingForm.value.bedId),
      checkInDate: this.bookingForm.value.checkInDate, // string 'YYYY-MM-DD' is okay for JSON
      checkOutDate: this.bookingForm.value.checkOutDate,
      // plannedCheckOutDate: this.bookingForm.value.plannedCheckOutDate,
      monthlyRent: Number(this.bookingForm.value.monthlyRent),
      securityDeposit: Number(this.bookingForm.value.securityDeposit),
      status: String(this.bookingForm.value.status),
      bookingType: String(this.bookingForm.value.bookingType),
      specialRequests: this.bookingForm.value.specialRequests ? String(this.bookingForm.value.specialRequests) : null,
      //plannedCheckOutDate: ''
    };

    // Debug DTO
    console.log('DTO SENT TO API:', dto);

    // Call API
    this.api.createBooking(dto).subscribe({
      next: () => {
        this.successMessage = 'Booking created successfully!';
        this.errorMessage = null;

        // reset + reapply hard-coded ids for next create
        this.bookingForm.reset();
        this.loadHardcodedIds();

        this.showPopup(); // success popup
      },
      error: (err) => {
        console.error('API ERROR:', err);

        // show meaningful message from backend if present
        this.successMessage = null;
        this.errorMessage = err?.error?.message || err?.message || 'Booking creation failed.';
        this.showPopup(); // error popup
      }
    });
  }

  cancel() {
    this.bookingForm.reset();
    this.loadHardcodedIds();
    this.successMessage = null;
    this.errorMessage = null;
  }

  private generateBookingNumber(): string {
    const prefix = 'BK';
    const ts = new Date().getTime().toString().slice(-6);
    return `${prefix}${ts}`;
  }

  // Template helper
  get f() {
    return this.bookingForm.controls;
  }
}
