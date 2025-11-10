import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegisterModel } from '../../../models/register.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [CommonModule, ReactiveFormsModule], // <-- VERY IMPORTANT
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitting = false;
  error: string | null = null;

  // Example roles - in real app fetch from API
  availableRoles = [
    { id: 1, name: 'User' },
    { id: 2, name: 'Admin' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      propertyId: [0, []],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern(/^\+?\d{7,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      roleIds: this.fb.array([], Validators.required)
    }, { validators: this.passwordsMatchValidator });
  }

  // custom validator for password match
  passwordsMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  get roleIdsArray(): FormArray {
    return this.registerForm.get('roleIds') as FormArray;
  }

  onRoleChange(roleId: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.roleIdsArray.push(this.fb.control(roleId));
    } else {
      const idx = this.roleIdsArray.controls.findIndex(c => c.value === roleId);
      if (idx >= 0) this.roleIdsArray.removeAt(idx);
    }
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
      roleIds: formVal.roleIds
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.submitting = false;
        // show success and navigate to login or dashboard
        this.router.navigate(['/auth/login'], { queryParams: { registered: '1' } });
      },
      error: (err) => {
        console.error(err);
        this.submitting = false;
        // set friendly message
        this.error = err?.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
