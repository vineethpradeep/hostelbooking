import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegisterModel } from '../../../models/register.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitting = false;
  error: string | null = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      propertyId: [0],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern(/^\+?\d{7,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(group: FormGroup) {
    return group.get('password')?.value === group.get('confirmPassword')?.value
      ? null : { passwordMismatch: true };
  }


  submit() {
    this.error = null;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const formVal = this.registerForm.value;
    const payload: RegisterModel = {
      propertyId: 1,
      firstName: formVal.firstName,
      lastName: formVal.lastName,
      emailAddress: formVal.emailAddress,
      phoneNumber: formVal.phoneNumber,
      password: formVal.password,
      roleIds:[3]
    };
    this.authService.register(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/auth/login'], { queryParams: { registered: '1' } });
      },
      error: (err: { error: { message: string; }; }) => {
        this.submitting = false;
        this.error = err?.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
