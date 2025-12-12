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
      const token = res.Data.AccessToken;
      const user = res.Data.User;
      const role = user.Roles[0];       // <-- role from backend
      const firstName = user.FirstName;

      // Save token, role, firstname (your existing method)
      //this.authService.setTokenAfterLogin(token, role, firstName);

      // ⭐ ROLE-BASED REDIRECTION
      if (role === 'Admin') {
        this.router.navigate(['/dashboard']);
      } else if(role=='Tenant')
      {
        this.router.navigate(['/user-dashboard']);
      }
      else{
        this.router.navigate(['/auth/login']);
      }
    },

    error: (err) => {
      this.submitting = false;
      this.error =
        err?.error?.message || 'Invalid email or password. Try again.';
    }
  });
}

}
