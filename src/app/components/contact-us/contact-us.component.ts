// src/app/pages/contact-us/contact-us.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactUsComponent {
  form: FormGroup;
  submitting = false;
  submitSuccess = false;
  submitError = '';
  

  constructor(private fb: FormBuilder,private contactService: ContactService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
  
    if (this.form.invalid || this.submitting) return;

    this.submitting = true;
    this.submitSuccess = false;
    this.submitError = '';

    const payload = {
      yourName: this.form.value.name,
      emailAddress: this.form.value.email,
      subject: this.form.value.subject,
      message: this.form.value.message
    };

    this.contactService.sendMessage(payload).subscribe({
      next: () => {
        this.submitSuccess = true;
        this.form.reset();
        this.submitting = false;
      },
      error: (err: any) => {
        this.submitError = 'Failed to send message. Try again.';
        console.error(err);
        this.submitting = false;
      }
    });
  }
}