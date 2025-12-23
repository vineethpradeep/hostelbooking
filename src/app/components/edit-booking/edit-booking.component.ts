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
import { Component, Input} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { BookingFormDto } from '../../models/booking-form.model';

@Component({
  selector: 'app-edit-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-booking.component.html',
  styleUrl: './edit-booking.component.css',
})
export class EditBookingComponent {

  step = 1;

  bookingForm!: FormGroup;
  paymentForm!: FormGroup;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  @Input() monthlyRent!: number;

  propertyIdFixed = 3;
  bedIdFixed = 3;
  userIdFixed = 5;

  monthsList = [1,2,3,4,5,6,7,8,9,10,11,12];

  constructor(private fb: FormBuilder, private api: BookingService) {}


  ngOnInit(): void {
     console.log('✅ UserDashboardComponent loaded');

    this.bookingForm = this.fb.group({
      property: ['Property A'],
      roomType: ['Single Bed'],
      moveInDate: ['', Validators.required],
      duration: ['', Validators.required],

      monthlyRent: [8000],
      securityDeposit: [2000],

      checkOutDate: [''],   // hidden field but required internally
      specialReq: [''],

      bookingNumber: [''],
      propertyId: [''],
      bedId: ['']
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['Cash', Validators.required],
      notes: ['']
    });

    // Auto update checkout date
    this.bookingForm.get('moveInDate')?.valueChanges.subscribe(() => this.updateCheckoutDate());
    this.bookingForm.get('duration')?.valueChanges.subscribe(() => this.updateCheckoutDate());
  }

  // ------------------------------
  // AUTO CALCULATE CHECKOUT DATE
  // ------------------------------
  private updateCheckoutDate() {
    const moveIn = this.bookingForm.get('moveInDate')?.value;
    const months = Number(this.bookingForm.get('duration')?.value);

    console.log("CHECKOUT UPDATE: moveIn=", moveIn, "duration=", months);

    if (!moveIn || !months || months <= 0) {
      console.log("Not enough data to calculate checkout date");
      return;
    }

    const d = new Date(moveIn);
    d.setMonth(d.getMonth() + months);

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');

    const finalDate = `${yyyy}-${mm}-${dd}`;

    console.log("✔ Checkout calculated:", finalDate);

    this.bookingForm.patchValue({ checkOutDate: finalDate }, { emitEvent: false });
  }

  goToStep(stepNo: number) {
    if (stepNo === 2 && this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }
    this.step = stepNo;
  }

  submitPayment() {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }
    this.save();
  }

  private generateBookingNumber(): string {
    return 'BK' + Math.floor(100000 + Math.random() * 900000);
  }

  save() {
    // Ensure checkout date is computed before saving
    this.updateCheckoutDate();

    if (!this.bookingForm.value.checkOutDate) {
      this.errorMessage = "Checkout date calculation failed.";
      return;
    }

    this.bookingForm.patchValue({
      propertyId: this.propertyIdFixed,
      bedId: this.bedIdFixed,
      bookingNumber: this.bookingForm.value.bookingNumber || this.generateBookingNumber()
    });
  
 
    const dto: BookingFormDto = {
      bookingId: 0,
      bookingNumber: this.bookingForm.value.bookingNumber,

      propertyId: Number(this.propertyIdFixed),
      bedId: Number(this.bedIdFixed),
      userId: Number(this.userIdFixed),

      checkInDate: this.bookingForm.value.moveInDate,
      checkOutDate: this.bookingForm.value.checkOutDate,

      monthlyRent: Number(this.bookingForm.value.monthlyRent),
      securityDeposit: Number(this.bookingForm.value.securityDeposit),

      durationMonths: Number(this.bookingForm.value.duration),

      status: "Booked",
      specialRequests: this.bookingForm.value.specialReq,

      paymentMethod: this.paymentForm.value.paymentMethod,
      paymentNotes: this.paymentForm.value.notes
    };

    console.log("📌 FINAL DTO SENT:", dto);

    this.api.createBooking(dto).subscribe({
      next: () => {
        this.successMessage = "Booking Created Successfully!";
        this.goToStep(3);
      },
      error: err => {
        this.errorMessage = err.error?.message || "Booking failed";
      }
    });
  }

  get f() { return this.bookingForm.controls; }
}


 