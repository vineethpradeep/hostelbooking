import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitting = false;
  errorMessage: string | null = null;
  returnUrl: string = '/';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // ✅ Read returnUrl from query params
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
    });
  }

  submit() {

    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    this.authService.login(this.loginForm.value).subscribe({

      next: (res) => {

        this.submitting = false;

        const token = res.Data.AccessToken;
        const user = res.Data.User;
        const role = user.Roles[0];
        const firstName = user.FirstName;
        const userId = user.UserId;

        // ✅ Save to localStorage
        localStorage.setItem('app_token', token);
        localStorage.setItem('app_role', role);
        localStorage.setItem('app_user_id', userId);
        localStorage.setItem('app_first_name', firstName);

        /* ================================
           🔥 RETURN URL LOGIC
        ================================= */

        debugger;

        

        // Otherwise normal role redirect
        if (role === 'Admin') {
          this.router.navigate(['/dashboard']);
        }
        else if (role === 'Tenant') {
          this.router.navigate(['/user-dashboard']);
        }
        else {
          this.router.navigate(['/']);
        }
      },

      error: (err) => {
        this.submitting = false;
        this.errorMessage =
          err?.error?.message || 'Invalid email or password. Try again.';
      }
    });
  }
}
