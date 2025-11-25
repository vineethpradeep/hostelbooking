import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitting = false;
  returnUrl: string = '/';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Read returnUrl from query params
    const encoded = this.route.snapshot.queryParams['returnUrl'];
    if (encoded) {
      this.returnUrl = decodeURIComponent(encoded);
    }
  }

  submit() {
    this.submitting = true;

    if (this.loginForm.invalid) {
      this.submitting = false;
      return;
    }

    const { userName, password } = this.loginForm.value;

    // DEMO LOGIN
    if (userName === 'admin@gmail.com' && password === '123456') {

      // ⭐ FIX: use the SAME key as AuthGuard
      localStorage.setItem('token', 'logged_in');

      console.log("Redirecting to:", this.returnUrl);
      this.router.navigateByUrl(this.returnUrl);
      return;
    }

    alert('Invalid email or password');
    this.submitting = false;
  }
}
