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
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-edit-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-booking.component.html',
  styleUrl: './edit-booking.component.css',
})
export class EditBookingComponent implements OnInit {
  step = 1;

  bookingForm!: FormGroup;
  paymentForm!: FormGroup;

  // Duration dropdown list (1–12 months)
  monthsList: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      // Hardcoded (no validation)
      roomType: ['Single Bed'],

      // Required fields
      moveInDate: ['', Validators.required],
      duration: ['', Validators.required],
        monthlyRent: ['', Validators.required],
  securityDeposit: ['', Validators.required],

      // Auto-calculated
      checkOutDate: [''],

      // Optional
      specialReq: [''],
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['Cash', Validators.required],
      notes: ['']
    });

    // Auto-calc checkout date when move-in or duration changes
    this.bookingForm.get('moveInDate')?.valueChanges.subscribe(() => {
      this.updateCheckoutDate();
    });

    this.bookingForm.get('duration')?.valueChanges.subscribe(() => {
      this.updateCheckoutDate();
    });
  }

  // ----------------------------------------
  // AUTO CALCULATE CHECKOUT DATE
  // ----------------------------------------
  private updateCheckoutDate() {
    const moveIn = this.bookingForm.get('moveInDate')?.value;
    const months = this.bookingForm.get('duration')?.value;

    if (!moveIn || !months) {
      this.bookingForm.patchValue({ checkOutDate: '' });
      return;
    }

    const date = new Date(moveIn);
    date.setMonth(date.getMonth() + Number(months));

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    const formatted = `${yyyy}-${mm}-${dd}`;

    this.bookingForm.patchValue({ checkOutDate: formatted }, { emitEvent: false });
  }

  // Go to next or previous step
  goToStep(stepNo: number) {

    // Validate Step-1 before going to Step-2
    if (stepNo === 2) {
      if (this.bookingForm.invalid) {
        this.bookingForm.markAllAsTouched();
        return;
      }
    }

    this.step = stepNo;
  }

  // Update special requirements from editable div
  updateSpecialReq(event: any) {
    this.bookingForm.patchValue({
      specialReq: event.target.innerHTML
    });
  }

  // Getter for easy access
  get f() {
    return this.bookingForm.controls;
  }
}
