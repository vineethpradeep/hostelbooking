import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  submitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    this.error = null;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.submitting = false;

        // Save token if backend returns one
        debugger;
        this.authService.setTokenAfterLogin(res.Data.AccessToken,res.Data.User.Roles[0],res.Data.User.FirstName);

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.submitting = false;
        this.error =
          err?.error?.message || 'Invalid email or password. Try again.';
      }
    });
  }
}
